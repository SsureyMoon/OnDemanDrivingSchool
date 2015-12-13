import os
from uuid import uuid4

from django.utils.deconstruct import deconstructible


def get_extension(file_name):
    name, extension = os.path.splitext(file_name)
    return extension


# http://stackoverflow.com/questions/15140942/django-imagefield-change-file-name-on-upload
@deconstructible
def generate_random_filename(path, is_64encoded=None):
    def wrapper(instance, filename):
        filename = '{}.{}'.format(uuid4().hex, get_extension(filename))
        return os.path.join(path, filename)

    def base64_wrapper(header):
        filename = '{}.{}'.format(uuid4().hex, header.split('/')[1])
        return os.path.join(path, filename)

    if is_64encoded:
        return base64_wrapper
    else:
        return wrapper


@deconstructible
class GenerateRandomFilename(object):

    def __init__(self, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
        # return the whole path to the file
        return os.path.join(self.path, filename)