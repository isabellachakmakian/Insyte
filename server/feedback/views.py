import json
import requests
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core.cache import cache
from .models import App, Review
import os
import json
from datetime import datetime, timezone
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
                "averageRatingCurrentVersion": item.get("averageUserRatingForCurrentVersion"),
                "ratingCountCurrentVersion": item.get("userRatingCountForCurrentVersion"),
                "releaseDate": item.get("releaseDate"),
                "currentVersionReleaseDate": item.get("currentVersionReleaseDate"),
                "contentAdvisoryRating": item.get("contentAdvisoryRating"),
                "version": item.get("version"),
                "description": item.get("description"),
            }
            for item in data.get("results", [])
        ]
        
        for item_data, item in zip(results, data.get("results", [])):
            current_version_release_raw = item.get("currentVersionReleaseDate")
            if current_version_release_raw:
                try:
                    release_dt = datetime.fromisoformat(current_version_release_raw.replace("Z", "+00:00"))
                    item_data["updateVelocityDays"] = (datetime.now(timezone.utc) - release_dt).days
                except ValueError:
                    item_data["updateVelocityDays"] = None
            else:
                item_data["updateVelocityDays"] = None
            
            rating_count_current = item.get("userRatingCountForCurrentVersion") or 0
            item_data["estimatedMonthlyInstalls"] = round(rating_count_current / 0.03) if rating_count_current else None
    
            
            all_time = item_data.get("averageRating")
            current = item_data.get("averageRatingCurrentVersion")
            print(f"DEBUG: all_time={all_time}, current={current}")
            if all_time and current:
                drop = round(all_time-current, 2)
                item_data["ratingDropAmount"] = drop
                item_data["ratingDropped"] = drop > 0.5
            else:
                item_data["ratingDropAmount"] = None
                item_data["ratingDropped"] = False
            
        # Storing and returning
        payload = {"apps": results, "count": len(results)}
 
        # Store in cache
        cache.set(cache_key, payload, self.CACHE_TIMEOUT)
 
        return JsonResponse({**payload, "cached": False})

@method_decorator(csrf_exempt, name='dispatch')
class AppsListView(View):
    """
    GET /api/apps/  returns saved tracked apps.
    POST /api/apps/ saves an app to the tracked list.
    """

    def get(self, request):
        saved_apps = App.objects.filter(tracked=True).order_by('app_name')
        apps = [
            {
                "appName": item.app_name,
                "trackId": item.track_id,
                "developerName": item.developer_name,
                "iconUrl": item.icon_url,
                "genre": item.genre,
                "averageRating": item.average_rating,
                "ratingCount": item.rating_count,
            }
            for item in saved_apps
        ]
        return JsonResponse({"apps": apps, "count": len(apps)})

    def post(self, request):
        try:
            payload = json.loads(request.body.decode('utf-8') or '{}')
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON payload"}, status=400)

        track_id = payload.get("trackId")
        app_name = payload.get("appName")
        if not track_id or not app_name:
            return JsonResponse({"error": "trackId and appName are required"}, status=400)

        app, created = App.objects.update_or_create(
            track_id=str(track_id),
            defaults={
                "app_name": app_name,
                "developer_name": payload.get("developerName"),
                "icon_url": payload.get("iconUrl"),
                "genre": payload.get("genre"),
                "average_rating": payload.get("averageRating"),
                "rating_count": payload.get("ratingCount"),
                "tracked": True,
            },
        )

        return JsonResponse({
            "saved": True,
            "created": created,
            "app": {
                "appName": app.app_name,
                "trackId": app.track_id,
                "developerName": app.developer_name,
                "iconUrl": app.icon_url,
                "genre": app.genre,
                "averageRating": app.average_rating,
                "ratingCount": app.rating_count,
            },
        })

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
    
class AnalyzeReviewsView(View):
    """
        GET /api/analyze/?trackId=<id>
        1. Fetches reviews from iTunes RSS feed
        2. Filters to 50 most recent with content > 100 characters
        3. Takes 20 of those and sends to Groq for AI analysis
        4. Returns structured insights (label, verbatim_quote, source_id, sentiment)
        """
    CACHE_TIMEOUT = 60 * 60  # 1 hour
    HEADERS = {
        "User-Agent": (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0.0.0 Safari/537.36"
        )
    }
 
    def get(self, request):
        track_id = request.GET.get("trackId", "").strip()
        if not track_id:
            return JsonResponse({"error": "Missing 'trackId' query parameter"}, status=400)
 
        # Check cache first
        cache_key = f"analyze_{track_id}"
        cached = cache.get(cache_key)
        if cached:
            return JsonResponse({**cached, "cached": True})
 
        # Fetch reviews from iTunes 
        sort_orders = ["mostrecent", "mosthelpful"]
        all_reviews = []
 
        for sort in sort_orders:
            for pg in range(1, 4):
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
                        all_reviews = [
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
            if all_reviews:
                break
 
        if not all_reviews:
            return JsonResponse({"error": "No reviews found for this app"}, status=404)
 
        # Filter to 50 most recent with content > 100 characters 
        filtered_reviews = [
            r for r in all_reviews
            if r.get("content") and len(r["content"]) > 100
        ][:50]
 
        if not filtered_reviews:
            return JsonResponse({"error": "No reviews with sufficient content found"}, status=404)
 
        # Take 20 reviews and format for Groq prompt 
        reviews_for_prompt = filtered_reviews[:20]
 
        prompt_input = [
            {
                "id": r["id"],
                "review": r["content"]
            }
            for r in reviews_for_prompt
        ]
 
        # Send to Groq 
        groq_api_key = os.environ.get("GROQ_API_KEY")
        if not groq_api_key:
            return JsonResponse({"error": "GROQ_API_KEY not set"}, status=500)
 
        system_prompt = """You are an expert Technical VC Analyst evaluating mobile applications. 
Your task is to analyze user reviews from the iTunes API and extract specific technical insights (strengths and weaknesses) regarding the app's performance, UX, and architecture.
 
### INSTRUCTIONS:
1. Each user message will be a JSON array of app reviews. 
2. You must extract key technical insights from these reviews. Do not force an arbitrary number of insights; extract as many or as few as are genuinely useful for a technical due-diligence report.
3. Order the extracted insights from MOST critical/useful to LEAST useful.
4. CRITICAL RULE: The `verbatim_quote` field MUST be an exact, word-for-word extraction from the original review text. Do not summarize, paraphrase, or fix grammar. If you cannot extract a direct quote, do not create the insight.
5. Return ONLY valid JSON. No explanation, no markdown, no code blocks.
 
### EXAMPLE OUTPUT FORMAT:
{
  "insights": [
    {
      "label": "LATENCY",
      "verbatim_quote": "the face ID login takes literally 10 seconds to load every single time.",
      "source_id": "r101",
      "sentiment": "negative"
    },
    {
      "label": "CRASH",
      "verbatim_quote": "the transaction history page crashes when I scroll too fast.",
      "source_id": "r102",
      "sentiment": "negative"
    },
    {
      "label": "AESTHETIC",
      "verbatim_quote": "love the new dark mode aesthetic, it feels very premium.",
      "source_id": "r102",
      "sentiment": "positive"
    }
  ]
}"""
 
        try:
            groq_response = requests.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {groq_api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "llama-3.1-8b-instant",
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": json.dumps(prompt_input)}
                    ],
                    "temperature": 0.3,
                },
                timeout=30,
            )
            groq_response.raise_for_status()
            groq_data = groq_response.json()
            raw_content = groq_data["choices"][0]["message"]["content"]
 
            # Parse the JSON response from Groq
            insights = json.loads(raw_content)
 
        except requests.RequestException as e:
            try:
                error_detail = e.response.json()
            except Exception:
                error_detail = str(e)
            return JsonResponse({"error": f"Groq API error", "detail": error_detail}, status=502)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Groq returned invalid JSON", "raw": raw_content}, status=500)
 
        payload = {
            "trackId": track_id,
            "reviewsAnalyzed": len(reviews_for_prompt),
            "insights": insights.get("insights", []),
        }
 
        cache.set(cache_key, payload, self.CACHE_TIMEOUT)
 
        return JsonResponse({**payload, "cached": False})