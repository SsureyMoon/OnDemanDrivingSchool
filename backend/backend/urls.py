"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.conf.urls.static import static
from django.views.generic import RedirectView
from django.conf import settings
from rest_framework.reverse import reverse_lazy
from rest_framework.routers import DefaultRouter

from profiles.views import UserViewSet
from instructors.views import InstructorView, InstructorModelView
from core.views import home


router = DefaultRouter()
router.register(r'users', UserViewSet) # users: url prefix, UserViewSet: viewset

admin.autodiscover()

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/v1/users/me/', include('profiles.urls', namespace="profiles")),
    url(r'^api/v1/', include('authentication.urls')),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/instructors/(?P<id>\w+)/', InstructorModelView.as_view()),
    url(r'^api/v1/instructors/', InstructorView.as_view()),

    url(r'^$', home),

    # the 'api-root' from django rest-frameworks default router
    # http://www.django-rest-framework.org/api-guide/routers/#defaultrouter
    # url(r'^$', RedirectView.as_view(url=reverse_lazy('api-root'), permanent=True)),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
