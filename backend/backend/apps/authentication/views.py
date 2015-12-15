from django.contrib.auth import authenticate
from django.shortcuts import render

# Create your views here.
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework_jwt.compat import get_request_data
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.views import JSONWebTokenAPIView, RefreshJSONWebToken, jwt_response_payload_handler

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class CustomJSONWebTokenSerializer(JSONWebTokenSerializer):

    def validate(self, attrs):
        credentials = {
            self.username_field: attrs.get(self.username_field),
            'password': attrs.get('password')
        }

        if all(credentials.values()):
            user = authenticate(**credentials)

            if user:
                if not user.is_active:
                    msg = _('User account is disabled.')
                    raise serializers.ValidationError(msg)

                payload = jwt_payload_handler(user)

                return {
                    'token': jwt_encode_handler(payload),
                    'user': user,
                    'expire': api_settings.JWT_EXPIRATION_DELTA.total_seconds()
                }
            else:
                msg = _('Unable to login with provided credentials.')
                raise serializers.ValidationError(msg)
        else:
            msg = _('Must include "{username_field}" and "password".')
            msg = msg.format(username_field=self.username_field)
            raise serializers.ValidationError(msg)


class CustomObtainJSONWebToken(JSONWebTokenAPIView):
    # just added another field 'expire'
    serializer_class = CustomJSONWebTokenSerializer

    permission_classes = ()
    authentication_classes = ()

    def post(self, request):
        serializer = self.serializer_class(
            data=get_request_data(request)
        )

        if serializer.is_valid():
            user = serializer.object.get('user') or request.user

            token = serializer.object.get('token')
            data = dict()
            data["token"] = token
            data["expire"] = api_settings.JWT_EXPIRATION_DELTA.total_seconds()

            return Response(data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomRefreshJSONWebToken(RefreshJSONWebToken):

    def post(self, request):
        serializer = self.get_serializer(
            data=get_request_data(request)
        )

        if serializer.is_valid():
            user = serializer.object.get('user') or request.user

            token = serializer.object.get('token')
            data = dict()
            data["token"] = token
            data["expire"] = api_settings.JWT_EXPIRATION_DELTA.total_seconds()

            return Response(data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)