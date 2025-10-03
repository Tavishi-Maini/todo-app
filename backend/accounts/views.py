
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(["POST"])
def register(request):
    data = request.data
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return Response({"message": "Email and password required"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=email).exists():
        return Response({"message": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create(
        username=email,  # Using email as username
        email=email,
        password=make_password(password)
    )

    # Optional: return a token after registration
    refresh = RefreshToken.for_user(user)
    return Response({
        "message": "User registered successfully",
        "username": user.username,
        "token": str(refresh.access_token)
    }, status=status.HTTP_201_CREATED)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_me(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email
    })

def api_root(request):
    return JsonResponse({
        "message": "Welcome to Auth API",
        "endpoints": ["/register/", "/login/", "/refresh/"]
    })