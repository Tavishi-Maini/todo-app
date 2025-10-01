from django.db import models
from django.contrib.auth.models import User

PRIORITY_CHOICES = [
    ('LOW', 'Low'),
    ('MEDIUM', 'Medium'),
    ('HIGH', 'High'),
]

STATUS_CHOICES = [
    ('TODO', 'To Do'),
    ('IN_PROGRESS', 'In Progress'),
    ('DONE', 'Done'),
]

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='MEDIUM')
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='TODO')
    due_date = models.DateField(null=True, blank=True)
    owner = models.ForeignKey(User, related_name='tasks', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
