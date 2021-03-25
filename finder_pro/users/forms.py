from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Profile, UserProfile


class UserRegisterForm(UserCreationForm):
    email= forms.EmailField()
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

class UserUpdateForm(forms.ModelForm):
    email=forms.EmailField()
    first_name = forms.CharField(max_length=250, required=False)
    last_name = forms.CharField(max_length=250, required=False)
    class Meta:
        model = UserProfile
        fields = [ 'email', 'first_name', 'last_name']
    