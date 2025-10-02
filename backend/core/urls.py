from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/auth/", include('accounts.urls')),
    path('', RedirectView.as_view(url='/api/auth/')),  # redirect to auth
    path('api/tasks/', include('tasks.urls')),
    path('api/teams/', include('teams.urls')),
]
