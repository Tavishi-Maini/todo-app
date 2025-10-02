from rest_framework import serializers
from .models import Team, TeamMember
from tasks.models import Task

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'creator']

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'team', 'user', 'role']

class TaskAssignSerializer(serializers.Serializer):
    task_id = serializers.IntegerField()
    assignee_id = serializers.IntegerField()
