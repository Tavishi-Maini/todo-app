from rest_framework import viewsets, permissions
from .models import Team
from .serializers import TeamSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Optional: override create to add the creator as manager
    def perform_create(self, serializer):
        serializer.save(manager=self.request.user)
