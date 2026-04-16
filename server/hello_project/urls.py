from django.http import HttpResponse
from django.urls import path


def hello(request):
    return HttpResponse("Hello World")

# http://127.0.0.1:8000/api/hello this shows the "hello world" on browser
urlpatterns = [
    path("api/hello", hello),
]
