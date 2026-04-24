from django.urls import path, include
# when request comes in, goes to feedback app's urls.py for the rest of the rules and handles search part
urlpatterns = [
    path("api/", include("feedback.urls")),
]