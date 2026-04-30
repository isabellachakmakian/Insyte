import requests
from django.http import JsonResponse
from django.views import View
from django.core.cache import cache
from .models import App, Review
# Fetch app names
class SearchAppView(View):
    """
    GET /api/search/?name=<app name>
    Calls iTunes Search API and returns a list of matching apps.
    Cached for 10 minutes per search term (this was done because Apple bans Ip's if too many requests sent?).
    """
    # used to tell cache how long to store it
    CACHE_TIMEOUT = 60 * 10
    
    # method called when it receives an HTTP GET request
    def get(self, request):
        app_name = request.GET.get("name", "").strip() # strips URL query string to look like {"name": "Spotify"}
        if not app_name:
            return JsonResponse({"error": "Missing 'name' query parameter"}, status=400)
        
        # Check cache first, checks if already searched item recently
        cache_key = f"search_{app_name.lower().replace(' ', '_')}"
        cached = cache.get(cache_key)
        if cached:
            return JsonResponse({**cached, "cached": True})
        #iTunes API params
        params = {
            "term": app_name,
            "entity": "software",
            "media": "software",
            "limit": 10,
            "country": "us",
        }
        # API call
        try:
            response = requests.get(
                "https://itunes.apple.com/search", params=params, timeout=10
            )
            response.raise_for_status()
            data = response.json()
        except requests.RequestException as e:
            return JsonResponse({"error": f"iTunes API error: {str(e)}"}, status=502)
        # List comprehension, loops and builds a list at same time
        results = [
            {
                "appName": item.get("trackName"),
                "trackId": item.get("trackId"),
                "developerName": item.get("artistName"),
                "iconUrl": item.get("artworkUrl60"),
                "genre": item.get("primaryGenreName"),
                "averageRating": item.get("averageUserRating"),
                "ratingCount": item.get("userRatingCount"),
            }
            for item in data.get("results", [])
        ]
        # Storing and returning
        payload = {"apps": results, "count": len(results)}
 
        # Store in cache
        cache.set(cache_key, payload, self.CACHE_TIMEOUT)
        
        # Save app to database
        for item in results:
            App.objects.update_or_create(
                track_id=item["trackId"],
                defaults={
                    "app_name": item["appName"],
                    "developer_name": item["developerName"],
                    "icon_url": item["iconUrl"],
                    "genre": item["genre"],
                    "average_rating": item["averageRating"],
                    "rating_count": item["ratingCount"],
                }
            )
 
        return JsonResponse({**payload, "cached": False})
# Fetch app reviews    
class FetchReviewsView(View):
    """
    GET /api/reviews/?trackId=<id>&page=<1-10>&country=<us>
    Fetches customer reviews for a given app from the iTunes RSS feed.
    Cached for 1 hour per trackId+page+country to avoid Apple IP ban. s.
    """
    # Review search need longer time to protect from IP ban
    CACHE_TIMEOUT = 60 * 60
    # Makes request look like it's coming from a real browser - without it Apple will return empty result
    HEADERS = {
        "User-Agent": (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0.0.0 Safari/537.36"
        )
    }
    
    def get(self, request):
        track_id = request.GET.get("trackId", "").strip()
        page = request.GET.get("page", "1").strip()
        country = request.GET.get("country", "us").strip()

        if not track_id:
            return JsonResponse({"error": "Missing 'trackId' query parameter"}, status=400)

        # Check cache first
        cache_key = f"reviews_{track_id}_{page}_{country}"
        cached = cache.get(cache_key)
        if cached:
            return JsonResponse({**cached, "cached": True})

        # Try multiple sort orders and pages
        sort_orders = ["mostrecent", "mosthelpful"]
        reviews = []
        # Two nested loops, outer tries different sort orders, inner tries pages 1, 2, and 3
        for sort in sort_orders:
            for pg in range(1, 4):  # try pages 1, 2, 3
                url = (
                    f"https://itunes.apple.com/rss/customerreviews/"
                    f"page={pg}/id={track_id}/sortby={sort}/json"
                )
                try:
                    response = requests.get(url, headers=self.HEADERS, timeout=10)
                    response.raise_for_status()
                    data = response.json()
                    entries = data.get("feed", {}).get("entry", [])
                    review_entries = entries[1:] if len(entries) > 1 else []
                    if review_entries:
                        # Parse each review and drills down to actual value, iTunes wraps every value
                        reviews = [
                            {
                                "id": entry.get("id", {}).get("label"),
                                "title": entry.get("title", {}).get("label"),
                                "content": entry.get("content", {}).get("label"),
                                "rating": entry.get("im:rating", {}).get("label"),
                                "author": entry.get("author", {}).get("name", {}).get("label"),
                                "date": entry.get("updated", {}).get("label"),
                                "version": entry.get("im:version", {}).get("label"),
                            }
                            for entry in review_entries
                        ]
                        break
                except requests.RequestException:
                    continue
            if reviews:
                break
        # Computes average rating
        ratings = [int(r["rating"]) for r in reviews if r.get("rating", "").isdigit()]
        avg_rating = round(sum(ratings) / len(ratings), 2) if ratings else None

        payload = {
            "trackId": track_id,
            "page": int(page),
            "reviewCount": len(reviews),
            "averageRating": avg_rating,
            "reviews": reviews,
        }

        # Store in cache
        cache.set(cache_key, payload, self.CACHE_TIMEOUT)
        
        # Save reviews to database
        try: 
            app = App.objects.get(track_id=track_id)
            for r in reviews:
                Review.objects.get_or_create(
                    review_id=r["id"],
                    defaults={
                        "app": app,
                        "title": r["title"],
                        "content": r["content"],
                        "rating": r["rating"],
                        "version": r["version"],
                    }
                )
        except App.DoesNotExist:
            pass

        return JsonResponse({**payload, "cached": False})