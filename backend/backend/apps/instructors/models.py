from __future__ import unicode_literals
from django.conf import settings
from django.contrib.gis.db import models as gis_models
from django.contrib.gis.geos import Point
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models

from core.utils import GenerateRandomFilename
from geopy import GoogleV3

generate_random_filename_for_car_img = GenerateRandomFilename('car_img')
generate_random_filename_for_license_img = GenerateRandomFilename('license_img')


class Instructors(gis_models.Model):

    user = gis_models.OneToOneField(settings.AUTH_USER_MODEL)
    image_dir = "instructors"
    license_img = gis_models.ImageField(
        upload_to=generate_random_filename_for_license_img, blank=True, null=True)
    car_img = gis_models.ImageField(
        upload_to=generate_random_filename_for_car_img, blank=True, null=True)
    ratings = gis_models.IntegerField(
        default=0, blank=True)
    date_started = gis_models.DateField(
        auto_now_add=True, blank=True, verbose_name="the date when this user became an instructor.")
    lat_long_points = gis_models.PointField(
        geography=True, blank=True, null=True, verbose_name="longitude and latitude.")
    address = gis_models.CharField(max_length=50, blank=True, null=True)
    zipcode = gis_models.CharField(max_length=5)

    # we use Geo django!
    def __unicode__(self):
        return self.user.username

    objects = gis_models.GeoManager()

    def save(self, *args, **kwargs):
        if not self.lat_long_points:
            geolocator = GoogleV3()
            location = geolocator.geocode(self.zipcode.encode('utf-8'))
            if location:
                print Point((location.latitude, location.longitude,))
                self.lat_long_points = Point((location.latitude, location.latitude,))
        return super(Instructors, self).save(*args, **kwargs)
