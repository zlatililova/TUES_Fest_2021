from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import CreateView
from .models import Location
from .parking_search import nearest

# Create your views here.

def index(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def find(request):
    lat=float(request.GET.get("lat", 42.59))
    lng=float(request.GET.get("lng", 23.59))

    found, name, lat, lng = nearest(lat, lng)
    data = {}
    data['found'] = found
    data['name'] = name
    data['lat'] = lat
    data['lng'] = lng
    return JsonResponse(data)


class AddPlaceView(CreateView):
        model = Location
        template_name = "create.html"
        success_url = "/index/"
        fields = ("location",)