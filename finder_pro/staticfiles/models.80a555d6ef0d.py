from django.db import models
from mapbox_location_field.models import LocationField, AddressAutoHiddenField

class Post(models.Model):
    address = models.CharField(max_length=50, null=True, blank=True)
    rating = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=True)

class Location(models.Model):
    location = LocationField(
        map_attrs={"style": "mapbox://styles/mapbox/outdoors-v11", "marker_color": "blue", "center": (17.031645, 51.106715)})
    create= models.DateTimeField(auto_now_add=True)
    address = AddressAutoHiddenField()
    