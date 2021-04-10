from django.urls import path
from . import views
from django.conf.urls.static import static
from .views import AddPlaceView
from django.conf import settings

urlpatterns = [
    path('', views.index, name = "home" ),
    path("add_location/", views.add_location, name = "add-location-page"),
    path('about/', views.about, name = "about" ),
    path('settings/', views.settings, name = "settings"),
]