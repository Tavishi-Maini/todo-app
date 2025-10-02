from django.db import models
from django.contrib.auth.models import User

class Team(models.Model):
    name = models.CharField(max_length=100)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="created_teams")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class TeamMember(models.Model):
    ROLE_CHOICES = [
        ('MANAGER', 'Manager'),
        ('MEMBER', 'Member')
    ]
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="members")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='MEMBER')
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('team', 'user')
