from django.urls import path
from .views import SearchAppView, FetchReviewsView, AnalyzeReviewsView

urlpatterns = [
    path("search/", SearchAppView.as_view(), name="search-app"),
    path("reviews/", FetchReviewsView.as_view(), name="fetch-reviews"),
    path("analyze/", AnalyzeReviewsView.as_view(), name="analyze-reviews"),
]