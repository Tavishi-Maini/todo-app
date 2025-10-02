# backend/tasks/views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from teams.models import Team

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    @action(detail=False, methods=['post'], url_path='team/(?P<team_id>[^/.]+)/create')
    def create_for_team(self, request, team_id=None):
        team = Team.objects.get(id=team_id)
        serializer = TaskSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(team=team)
        return Response(serializer.data)
