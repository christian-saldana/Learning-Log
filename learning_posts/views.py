from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url




def index(request, *args, **kwargs):
    """The home page for Learning Log"""
    return render(request, 'pages/index.html')

# Create your views here.
