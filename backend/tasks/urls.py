from django.urls import path
from .views import TaskAssign

urlpatterns = [
    path('<int:pk>/assign/', TaskAssign.as_view()),
]
