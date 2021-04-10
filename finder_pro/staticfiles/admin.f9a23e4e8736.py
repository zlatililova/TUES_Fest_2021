from django.contrib import admin
from mapbox_location_field.admin import MapAdmin
from .models import Location

admin.site.register(Location, MapAdmin)
