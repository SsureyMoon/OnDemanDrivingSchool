from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import User


class UserSerializer(serializers.ModelSerializer):

    profile_img = serializers.SerializerMethodField('get_image_url', allow_null=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'profile_img',)
        read_only_fields = ('username', )

    def get_image_url(self, obj):
        if not obj.profile_img:
            return None
        return obj.profile_img.url
#
#
# def validate_email_unique(value):
#     exists = User.objects.filter(email=value)
#     if exists:
#         raise serializers.ValidationError("Email address %s already exists, must be unique" % value)


class CreateUserSerializer(serializers.ModelSerializer):

    email = serializers.CharField(max_length=75, required=True,
                                  validators=[UniqueValidator(queryset=User.objects.all())])

    def create(self, validated_data):
        # call create_user on user object. Without this
        # the password will be stored in plain text.
        user = User.objects.create_user(**validated_data)
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'profile_img',)
        write_only_fields = ('password1',)

