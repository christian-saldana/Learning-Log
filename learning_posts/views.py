from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url

from .forms import TopicForm
from .models import Topic
from .serializers import TopicSerializer

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


def index(request, *args, **kwargs):
    """The home page for Learning Log"""
    return render(request, 'pages/index.html')

def topics(request):
    """Show all topics"""
    topics = Topic.Objects.order_by('date_added')
    context = {'topics': topics}
    return render(request, 'learning')

# Create your views here.
