from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from rest_framework.routers import DefaultRouter
from teams.views import TeamViewSet

router = DefaultRouter()
router.register("teams", TeamViewSet, basename="team")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("accounts.urls")),  # auth routes
    path("api/tasks/", include("tasks.urls")),    # tasks routes
    path("", include(router.urls)),               # router routes (teams)
    path("", RedirectView.as_view(url='/api/auth/')),  # optional root redirect
]
