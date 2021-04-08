from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import CreateView
from .models import Location

# Create your views here.

def index(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def create(request):
    return render(request, 'create.html')

def settings(request):
    return render(request, 'settings.html')

class AddPlaceView(CreateView):
        model = Location
        template_name = "create.html"
        success_url = "/index/"
        fields = ("location",)