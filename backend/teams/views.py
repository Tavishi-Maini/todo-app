from rest_framework import generics, permissions
from .models import Team, TeamMember
from .serializers import TeamSerializer
from rest_framework.response import Response

class TeamListCreate(generics.ListCreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class JoinTeam(generics.UpdateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        team = self.get_object()
        TeamMember.objects.get_or_create(team=team, user=request.user)
        return Response({"status": "joined team"})
