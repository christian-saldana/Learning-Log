from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


def index(request, *args, **kwargs):
    """The home page for Learning Log"""
    return render(request, 'pages/index.html')

def topics_list_view(request, *args, **kwargs):
    return render(request, 'topics/list.html')

def topics_detail_view(request, topic_id, *args, **kwargs):
    return render(request, 'topics/detail.html', context={"topic_id":topic_id})

def topics_profile_view(request, username, *args, **kwargs):
    return render(request, 'topics/profile.html', context={"profile_username":username})


