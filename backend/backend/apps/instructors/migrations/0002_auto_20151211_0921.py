# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import core.utils
import django.contrib.gis.db.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('instructors', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='location',
            name='instructor',
        ),
        migrations.AddField(
            model_name='instructors',
            name='address',
            field=models.CharField(max_length=50, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='instructors',
            name='lat_long_points',
            field=django.contrib.gis.db.models.fields.PointField(srid=4326, geography=True, null=True, verbose_name='longitude and latitude.', blank=True),
        ),
        migrations.AddField(
            model_name='instructors',
            name='license_img',
            field=models.ImageField(null=True, upload_to=core.utils.GenerateRandomFilename('license_img'), blank=True),
        ),
        migrations.AddField(
            model_name='instructors',
            name='zipcode',
            field=models.CharField(default=94109, max_length=5),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='instructors',
            name='car_img',
            field=models.ImageField(null=True, upload_to=core.utils.GenerateRandomFilename('car_img'), blank=True),
        ),
        migrations.DeleteModel(
            name='Location',
        ),
    ]
