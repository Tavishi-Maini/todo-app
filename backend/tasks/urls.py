from django.urls import path
from .views import TaskViewSet

task_assign = TaskViewSet.as_view({
    'patch': 'assign_task',
})

urlpatterns = [
    path('<int:pk>/assign/', task_assign, name='task-assign'),
]
