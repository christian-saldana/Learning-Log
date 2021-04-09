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
    post_topic = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Topic
        fields = [
            'user', 
            'id', 
            'post_topic']

    def get_post_topic(self, obj):
        return obj.post_topic

class EntrySerializer(serializers.ModelSerializer):
    entries = serializers.StringRelatedField(many=True)
    class Meta:
        model = Topic
        fields = [ 
            'id', 
            'post_topic',
            'entries',
            ]

class EntryCreateSerializer(serializers.ModelSerializer):
    entries = serializers.StringRelatedField(many=True)
    post_topic = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Topic
        fields = [
            'id', 
            'post_topic', 
            'entries',
        ]