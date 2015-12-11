from .base import *
import os
import dj_database_url


DATABASES['default'] = dj_database_url.config()

DEBUG = False
TEMPLATE_DEBUG = DEBUG

SECRET_KEY = os.environ["SECRET_KEY"]

ALLOWED_HOSTS = ["*", ]
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')



