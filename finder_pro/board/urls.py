from django.urls import path
from . import views
from django.conf.urls.static import static
from .views import AddPlaceView
from django.conf import settings

urlpatterns = [
    path('', views.index, name = "home" ),
    path("create/", views.create, name = "create-page"),
    path('about/', views.about, name = "about" ),
    path('settings/', views.settings, name = "settings")
]