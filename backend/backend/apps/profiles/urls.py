from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from .views import ProfileView


urlpatterns = [
    url(r'^$', ProfileView.as_view()),
]