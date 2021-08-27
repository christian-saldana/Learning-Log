from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from rest_framework import generics
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
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
    paginator.page_size = 10
    paginated_qs = paginator.paginate_queryset(qs, request)
    serializer = TopicSerializer(paginated_qs, many=True)
    return paginator.get_paginated_response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def topics(request, *args, **kwargs):
    qs = Topic.objects.filter(user=request.user.id)
    username = request.GET.get('username')
    if username != None:
        qs = qs.filter(user__username__iexact=username)
    return get_paginated_queryset_response(qs, request)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def topic(request, topic_id, *args, **kwargs):
    topic = Topic.objects.get(id=topic_id)
    if topic.user.id != request.user.id:
        raise Http404
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
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def new_topic(request, *args, **kwargs):
    """Adds new topic to learning log"""
    print(request.data)
    serializer = TopicCreateSerializer(data=request.data)
    if serializer.is_valid():
        print(serializer)
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)



@api_view(['POST', 'GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def new_entry(request, *args, **kwargs):
    """Adds new entry to learning log"""
    serializer = EntryCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)

class EntryCreate(generics.ListCreateAPIView):
    queryset = Entry.objects.filter()
    serializer_class = EntryCreateSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class EntryList(generics.RetrieveAPIView):
    lookup_field = 'int:topic_id'
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer


