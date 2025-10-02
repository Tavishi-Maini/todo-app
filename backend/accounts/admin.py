from django.contrib import admin
from tasks.models import Task
from teams.models import Team, TeamMember

admin.site.register(Task)
admin.site.register(Team)
admin.site.register(TeamMember)
