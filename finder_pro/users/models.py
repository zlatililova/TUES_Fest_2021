from django.db import models
from django.contrib.auth.models import User
from PIL import Image

class Profile(models.Model):
    user=models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="media", default="images/default.jpg")
    bio = models.TextField()
    

    def __str__(self):
        return f'{self.user} Profile'

    '''def save(self):
        super().save()

        img = Image.open(self.image.path)

        if img.height >300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.image.path)'''

class UserProfile(models.Model):
        email=models.EmailField()
        first_name = models.CharField(max_length=250)
        last_name = models.CharField(max_length=250)

        