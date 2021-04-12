from django.conf import settings
from rest_framework import serializers
from profiles.serializers import PublicProfileSerializer
from .models import Topic, Entry


MAX_TITLE_LENGTH = settings.MAX_TITLE_LENGTH

class TopicCreateSerializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source='user.profile', read_only=True)#serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Topic
        fields = ['user', 'id', 'post_topic']

        def validate_post_topic(self, value):
            if len(value) > MAX_TITLE_LENGTH:
                raise serializers.ValidationError("This title is too long")
            return value
        
    # def get_user(self, obj):
    #     return obj.user.id

class TopicSerializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source= 'user.profile', read_only=True)
    entries = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Topic
        fields = [
            'user', 
            'id', 
            'post_topic',
            'entries'
            ]

    def get_post_topic(self, obj):
        return obj.post_topic

class EntrySerializer(serializers.ModelSerializer):
    date_added = serializers.DateTimeField(format="%b %d, %Y %H:%M")
    class Meta:
        model = Entry
        fields = [ 
            'id', 
            'topic',
            'post_entry',
            'date_added'
            ]
    def get_post_entry(self, obj):
        return obj.post_entry

class EntryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = [
            'id', 
            'topic', 
            'post_entry',
            'date_added'
        ]