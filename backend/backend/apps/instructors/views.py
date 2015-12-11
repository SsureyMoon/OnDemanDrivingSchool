from django.shortcuts import render

# Create your views here.
from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .models import Instructors
from .serializer import CreateInstructorSerializer

class InstructorView(APIView):
    """
    Creates, Updates, and retrieves User accounts
    """
    authentication_classes = (JSONWebTokenAuthentication,)
    queryset = Instructors.objects.all()
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, *args, **kwargs):
        return Response(self.user)

    def post(self, request, *args, **kwargs):
        serializer = CreateInstructorSerializer(data=request.data)
        self.permission_classes = (IsAuthenticated,)

        is_valid = serializer.is_valid()
        if is_valid:
            instructor = serializer.save(user=request.user)
            print instructor
        else:
            for key in serializer.errors:
                print key
                for error in serializer.errors[key]:
                    print error

        return Response({})