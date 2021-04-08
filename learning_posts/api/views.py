from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url
from rest_framework import generics
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.contrib.auth.decorators import login_required
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..forms import EntryForm
from ..models import Topic, Entry
from ..serializers import (
    TopicCreateSerializer, 
    TopicSerializer,
    EntrySerializer,
    EntryCreateSerializer,
)

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

def get_paginated_queryset_response(qs, request):
    paginator = PageNumberPagination()
    paginator.page_size = 5
    paginated_qs = paginator.paginate_queryset(qs, request)
    serializer = TopicSerializer(paginated_qs, many=True)
    return paginator.get_paginated_response(serializer.data)



@api_view(['GET'])
#@permission_classes([IsAuthenticated])
def topics(request,*args, **kwargs):
    #qs = Topic.objects.filter(user=request.user.id)
    qs = Topic.objects.all()
    username = request.GET.get('username')
    if username != None:
        qs = qs.filter(user__username__iexact=username)
    return get_paginated_queryset_response(qs, request)



@api_view(['GET'])
def topic(request, topic_id, *args, **kwargs):
    qs = Topic.objects.filter(id=topic_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = EntrySerializer(obj)
    return Response(serializer.data)


@api_view(['DELETE', 'POST', 'GET'])
@permission_classes([IsAuthenticated])
def delete_topic(request, topic_id, *args, **kwargs):
    qs = Topic.objects.filter(id=topic_id)
    if not qs.exists():
        return Response({}, status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({"message: You cannot delete this topic"}, status = 401)
    obj = qs.first()
    obj.delete()
    return Response({"message": "Topic removed"}, status=200)



@api_view(['POST', 'GET'])
#@authentication_classes([SessionAuthentication])
#@permission_classes([IsAuthenticated])
def new_topic(request, *args, **kwargs):
    """Adds new topic to learning log"""
    serializer = TopicCreateSerializer(data=request.data)
    if serializer.is_valid():
        print(request.user)
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)



@api_view(['POST', 'GET'])
#@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def new_entry(request, *args, **kwargs):
    """Adds new entry to learning log"""
    serializer = EntryCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

def django_new_entry(request, topic_id):
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



def django_topics(request):
    """Show all topics."""
    topics = Topic.objects.filter(user=request.user).order_by('date_added')
    context = {'topics': topics}
    return render(request, 'pages/topics.html', context)

def django_topic(request, topic_id):
    """Show all topics"""
    topic = Topic.objects.get(id=topic_id)
    entries = topic.entry_set.order_by('-date_added')
    context = {'topic': topic, 'entries': entries}
    return render(request, 'pages/topic.html', context)


@api_view(['GET', 'POST'])
def django_new_topic(request):
    if request.method != 'POST':
        #No data submitted; create a blank form.
        form = TopicForm()
    else:
        # POST data submitted; process data.
        form = TopicForm(request.POST)
        if form.is_valid():
            new_topic = form.save(commit=False)
            new_topic.user = request.user
            new_topic.save()
            return redirect('/topics')
    #Display a blank or invalid form.
    context = {'form': form}
    return render(request, 'pages/new_topic.html', context)


