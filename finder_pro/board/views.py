from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import CreateView
from .models import Location
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from users.forms import UserRegisterForm, UserUpdateForm

# Create your views here.

def index(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def add_location(request):

    user = request.user

    context = {
        'user': user
    }

    return render(request, 'addLocation.html', context)

@login_required
def settings(request):
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance=request.user)
                                                                                     
        if u_form.is_valid():  
            u_form.save()
            return redirect('settings')
        

    else:
        u_form = UserUpdateForm(instance=request.user)
    

    context = {
        'u_form': u_form
    }

    return render(request, 'settings.html', context)

class AddPlaceView(CreateView):
        model = Location
        template_name = "create.html"
        success_url = "/index/"
        fields = ("location",)