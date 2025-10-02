from django.urls import path
from .views import TeamCreateView, TeamJoinView, TaskAssignView

urlpatterns = [
    path('create/', TeamCreateView.as_view(), name='team-create'),
    path('<int:pk>/join/', TeamJoinView.as_view(), name='team-join'),
    path('<int:pk>/assign/', TaskAssignView.as_view(), name='task-assign'),
]
