from rest_framework import serializers
from .models import Task
from django.contrib.auth.models import User

class TaskSerializer(serializers.ModelSerializer):
    assigned_to = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), allow_null=True)

    class Meta:
        model = Task
        fields = "__all__"

class TaskAssignSerializer(serializers.ModelSerializer):
    assigned_to = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), 
        allow_null=True
    )
    class Meta:
        model = Task
        fields = ["assigned_to", "status"]
