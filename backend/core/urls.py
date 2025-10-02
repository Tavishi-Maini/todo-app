from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from rest_framework.routers import DefaultRouter
from teams.views import TeamViewSet

router = DefaultRouter()
router.register("teams", TeamViewSet, basename="team")

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/auth/", include('accounts.urls')),
    path('', RedirectView.as_view(url='/api/auth/')),  # redirect to auth
    path('api/tasks/', include('tasks.urls')),
    path('api/teams/', include('teams.urls')),
    path("", include(router.urls)),
]
