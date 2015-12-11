from os import path
from django.shortcuts import render
from django.conf import settings
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def home(request):
	template_path = "index.html"
	return render(request, template_path)