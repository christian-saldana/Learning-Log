from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from .models import Topic, Entry
from .forms import EntryForm

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


def index(request, *args, **kwargs):
    """The home page for Learning Log"""
    return render(request, 'pages/index.html')

def topics_list_view(request, *args, **kwargs):
    return render(request, 'topics/list.html')

def topics_detail_view(request, topic_id, *args, **kwargs):
    return render(request, 'topics/detail.html', context={"topic_id":topic_id})


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


