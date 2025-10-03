from django.urls import path
from .views import register, api_root, get_me
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("", api_root, name='api-root'),
    path("register/", register, name='register'),
    path("login/", TokenObtainPairView.as_view(), name='login'),
    path("refresh/", TokenRefreshView.as_view(), name='token_refresh'),
    path("me/", get_me, name="me"),
]

