from django.urls import path
from . import views
from django.conf.urls.static import static
from .views import AddPlaceView
from django.conf import settings

urlpatterns = [
    path('', views.index, name = "home" ),
    path("create/", AddPlaceView.as_view(), name = "create-page"),
    path('about/', views.about, name = "about" ),
    path("find/", views.find, name = "find-page")
]