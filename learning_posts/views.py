from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .forms import TopicForm, EntryForm
from .models import Topic, Entry
from .serializers import TopicSerializer

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


def index(request, *args, **kwargs):
    """The home page for Learning Log"""
    return render(request, 'pages/index.html')

def topics(request):
    """Show all topics."""
    topics = Topic.objects.order_by('date_added')
    context = {'topics': topics}
    return render(request, 'pages/topics.html', context)

def topic(request, topic_id):
    """Show all topics"""
    topic = Topic.objects.get(id=topic_id)
    entries = topic.entry_set.order_by('-date_added')
    context = {'topic': topic, 'entries': entries}
    return render(request, 'pages/topic.html', context)

#"""@api_view(['POST'])"""
#def new_topic(request):
#    if request.method != 'POST':
#       # No data submitted; create a blank form.
 #       form = TopicForm()
  #  else:
#        # POST data submitted; process data.
#        form = TopicForm(data=request.POST)
#        if form.is_valid():
#            form.save()
#            return redirect('topics')
#    # Display a blank or invalid form.
#    context = {'form': form}
 #   return render(request, 'pages/new_topic.html', context)

@api_view(['POST', 'GET'])
def new_topic(request, *args, **kwargs):
    """Need to create frontend to call this api view"""
    serializer = TopicSerializer(data=request.POST)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)


def new_entry(request, topic_id):
    """Add a new entry for a particular topic."""
    topic = Topic.objects.get(id=topic_id)
 
    if request.method != 'POST':
        # No data submitted; create a blank form.
        form = EntryForm()
    else:
        # POST data submitted; process data.
        form = EntryForm(data=request.POST)
        if form.is_valid():
            new_entry = form.save(commit=False)
            new_entry.topic = topic
            new_entry.save()
            return redirect('topic', topic_id=topic_id)
    # Display a blank or invalid form.
    context = {'topic': topic, 'form': form}
    return render(request, 'pages/new_entry.html', context)

def edit_entry(request, entry_id):
    """Edit an existing entry."""
    entry = Entry.objects.get(id=entry_id)
    topic = entry.topic
 
    if request.method != 'POST':
        # Initial request; pre-fill form with the current entry.
        form = EntryForm(instance=entry)
    else:
        # POST data submitted; process data.
        form = EntryForm(instance=entry, data=request.POST)
        if form.is_valid():
            form.save()
            return redirect('topic', topic_id=topic.id)
    context = {'entry': entry, 'topic': topic, 'form': form}
    return render(request, 'pages/edit_entry.html', context)

# Create your views here.
