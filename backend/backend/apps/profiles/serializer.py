from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from core.mixins import ProfileFieldMixin
from .models import User


class UserSerializer(ProfileFieldMixin, serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        super(UserSerializer, self).__init__(*args, **kwargs)
        self.get_profile_img = self.get_image_url('profile_img')

    profile_img = serializers.SerializerMethodField(allow_null=True)
    is_instructor = serializers.SerializerMethodField(default=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'profile_img', 'date_joined', 'is_instructor')
        read_only_fields = ('username', )

    def get_is_instructor(self, obj):
        try:
            instructor = obj.instructors
        except:
            return False
        else:
            return bool(instructor)


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

