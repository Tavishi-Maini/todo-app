from rest_framework import generics, permissions
from .models import Task
from .serializers import TaskSerializer
from rest_framework.response import Response

class TaskAssign(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        task = self.get_object()
        assigned_user_id = request.data.get("assigned_to")
        task.assigned_to_id = assigned_user_id
        task.save()
        return Response(TaskSerializer(task).data)
