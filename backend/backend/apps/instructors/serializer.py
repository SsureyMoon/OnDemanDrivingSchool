from rest_framework import serializers

from core.utils import generate_random_filename
from .models import Instructors


# solution from Stackoverflow: http://stackoverflow.com/questions/28036404/django-rest-framework-upload-image-the-submitted-data-was-not-a-file
class Base64ImageField(serializers.ImageField):

    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        if isinstance(data, six.string_types):
            if 'data:' in data and ';base64,' in data:
                header, data = data.split(';base64,')

            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            generate_random_filename_base64 = generate_random_filename('instructors', is_64encoded=True)

            data = ContentFile(decoded_file, name=generate_random_filename_base64(header))

        return super(Base64ImageField, self).to_internal_value(data)


class CreateInstructorSerializer(serializers.ModelSerializer):

    zipcode = serializers.CharField(max_length=75, required=True)
    car_img = Base64ImageField(
        max_length=None, use_url=True,
    )
    license_img = Base64ImageField(
        max_length=None, use_url=True,
    )

    class Meta:
        model = Instructors
        fields = ('zipcode', 'car_img', 'license_img',)