from django.urls import path
from .views import TeamListCreate, JoinTeam

urlpatterns = [
    path('', TeamListCreate.as_view()),
    path('<int:pk>/join/', JoinTeam.as_view()),
]
