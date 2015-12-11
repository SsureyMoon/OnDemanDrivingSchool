# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import core.utils
from django.conf import settings
import django.contrib.gis.db.models.fields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Instructors',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('car_img', models.ImageField(null=True, upload_to=core.utils.GenerateRandomFilename('instructors'), blank=True)),
                ('ratings', models.IntegerField(default=0, blank=True)),
                ('date_started', models.DateField(auto_now_add=True, verbose_name='the date when this user became an instructor.')),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('instructor', models.OneToOneField(primary_key=True, serialize=False, to='instructors.Instructors')),
                ('code', models.CharField(max_length=5)),
                ('poly', django.contrib.gis.db.models.fields.PolygonField(srid=4326)),
            ],
        ),
        migrations.AddField(
            model_name='instructors',
            name='user',
            field=models.OneToOneField(to=settings.AUTH_USER_MODEL),
        ),
    ]
