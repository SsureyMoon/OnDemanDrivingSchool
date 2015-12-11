from django.shortcuts import render

# Create your views here.
from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.settings import api_settings

from .serializer import UserSerializer, CreateUserSerializer
from .models import User
from .permissions import IsOwnerOrReadOnly


class ProfileView(APIView):

    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = request.user
        print user

        data = dict()
        data["username"] = user.username
        data["email"] = user.username
        data["profile_img"] = user.profile_img and user.profile_img.url or None
        data["is_instructor"] = False
        data["date_joined"] = user.date_joined
        data["id"] = user.id

        return Response(data)


class UserViewSet(mixins.CreateModelMixin,
                  mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    """
    Creates, Updates, and retrieves User accounts
    """
    authentication_classes = (JSONWebTokenAuthentication,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsOwnerOrReadOnly,)

    def get(self, request, *args, **kwargs):
        return Response(self.user)

    def create(self, request, *args, **kwargs):
        data = dict(request.data)

        data['password'] = request.data.get('password1')
        del data['password1']
        del data['password2']
        serializer = CreateUserSerializer(data=data)

        self.permission_classes = (AllowAny,)
        serializer.is_valid()
        for key in serializer.errors:
            print key
            for error in serializer.errors[key]:
                print error

        user = serializer.save()
        data = dict(serializer.data)
        data["token"] = create_jwt_token(user)
        data["expire"] = api_settings.JWT_EXPIRATION_DELTA.total_seconds()
        del data['password']
        return Response(data)


def create_jwt_token(user):
    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

    if user:
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return token
    return None