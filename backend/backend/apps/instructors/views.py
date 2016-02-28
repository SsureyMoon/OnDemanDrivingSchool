from django.shortcuts import render

# Create your views here.
from geopy import GoogleV3
from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from profiles.serializer import UserSerializer

from .models import Instructors
from .serializer import CreateInstructorSerializer, InstructorSerializer


class InstructorView(APIView):
    """
    Creates, Updates, and retrieves User accounts
    """
    authentication_classes = (JSONWebTokenAuthentication,)
    queryset = Instructors.objects.all()
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, *args, **kwargs):
        query_dict = request.GET
        address = query_dict.get('location')
        distance = query_dict.get('distance')
        geolocator = GoogleV3()
        location = geolocator.geocode(address.encode('utf-8'), timeout=10)
        instructors = Instructors.objects.get_near_instructors(
            location.latitude, location.longitude, distance=distance)

        data = dict()
        data['instructors'] = [self.prepare_response_data(instructor) for instructor in instructors]
        data['origin'] = {'lat': location.latitude, 'lon': location.longitude}

        return Response(data)

    def post(self, request, *args, **kwargs):
        serializer = CreateInstructorSerializer(data=request.data)
        self.permission_classes = (IsAuthenticated,)

        is_valid = serializer.is_valid()
        if is_valid:
            instructor = serializer.save(user=request.user)
        else:
            for key in serializer.errors:
                print key
                for error in serializer.errors[key]:
                    print error

        return Response({})

    def prepare_response_data(self, instructor):
        result = InstructorSerializer(instructor).data
        user = UserSerializer(instructor.user).data
        result['username'] = user.get('username')
        result['profile_img'] = user.get('profile_img')

        return result

class InstructorModelView(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    queryset = Instructors.objects.all()
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, id, *args, **kwargs):

        return Response(id)
