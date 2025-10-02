from django.db import models
from django.contrib.auth.models import User
from tasks.models import Task

ROLE_CHOICES = [
    ('MANAGER', 'Manager'),
    ('MEMBER', 'Member'),
]

class Team(models.Model):
    name = models.CharField(max_length=255)
    creator = models.ForeignKey(User, related_name='created_teams', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class TeamMember(models.Model):
    team = models.ForeignKey(Team, related_name='members', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='teams', on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='MEMBER')
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('team', 'user')
