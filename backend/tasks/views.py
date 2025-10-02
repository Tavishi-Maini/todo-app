from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer, TaskAssignSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    @action(detail=True, methods=["patch"], url_path="assign")
    def assign_task(self, request, pk=None):
        task = self.get_object()
        serializer = TaskAssignSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(TaskSerializer(task).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
