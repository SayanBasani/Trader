from django.urls import path
from .views import TestView,RegistationView
from . import views


urlpatterns = [
    path("test/", TestView.as_view()),
    path("register/", views.RegistationView),
    path("login/", views.login ),
    path("profile/", views.profile ),
]

# {
#     "username":"sayan",
#     "email":"sayan@gmail.com",
#     "password":"123456"
# }