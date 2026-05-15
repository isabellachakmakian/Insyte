from django.urls import path
from .views import SearchAppView, AppsListView, FetchReviewsView

urlpatterns = [
    path("search/", SearchAppView.as_view(), name="search-app"),
    path("apps/", AppsListView.as_view(), name="apps-list"),
    path("reviews/", FetchReviewsView.as_view(), name="fetch-reviews"),
]