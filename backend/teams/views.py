from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Team
from .serializers import TeamSerializer
from tasks.serializers import TaskSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

    @action(detail=True, methods=["get"], url_path="tasks")
    def team_tasks(self, request, pk=None):
        team = self.get_object()
        tasks = team.tasks.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
