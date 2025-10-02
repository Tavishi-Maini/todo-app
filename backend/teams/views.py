from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Team, TeamMember
from .serializers import TeamSerializer, TeamMemberSerializer, TaskAssignSerializer
from tasks.models import Task
from django.contrib.auth.models import User

class TeamCreateView(generics.CreateAPIView):
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        team = serializer.save(creator=self.request.user)
        # Creator becomes manager
        TeamMember.objects.create(team=team, user=self.request.user, role='MANAGER')

class TeamJoinView(generics.CreateAPIView):
    serializer_class = TeamMemberSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        team = Team.objects.get(pk=pk)
        if TeamMember.objects.filter(team=team, user=request.user).exists():
            return Response({"detail": "Already a member"}, status=400)
        member = TeamMember.objects.create(team=team, user=request.user)
        return Response({"detail": "Joined team"}, status=201)

class TaskAssignView(generics.GenericAPIView):
    serializer_class = TaskAssignSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        # pk = team id
        team = Team.objects.get(pk=pk)
        member = TeamMember.objects.filter(team=team, user=request.user, role='MANAGER').first()
        if not member:
            return Response({"detail": "Only managers can assign tasks"}, status=403)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        task = Task.objects.get(id=serializer.validated_data['task_id'])
        assignee = User.objects.get(id=serializer.validated_data['assignee_id'])

        # Ensure assignee is in the team
        if not TeamMember.objects.filter(team=team, user=assignee).exists():
            return Response({"detail": "Assignee not in team"}, status=400)

        task.owner = assignee
        task.save()
        return Response({"detail": "Task assigned"})
