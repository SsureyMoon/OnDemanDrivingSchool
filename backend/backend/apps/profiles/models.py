from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.gis.db import models as gis_models

from core.utils import GenerateRandomFilename


generate_random_filename = GenerateRandomFilename('profiles')


class User(AbstractUser):
    image_dir = "profiles"
    profile_img = gis_models.ImageField(upload_to=generate_random_filename, blank=True, null=True)

    def __unicode__(self):
        return self.username
