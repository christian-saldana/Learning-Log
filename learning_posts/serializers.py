from django.conf import settings
from rest_framework import serializers
from profiles.serializers import PublicProfileSerializer
from .models import Topic, Entry


MAX_TITLE_LENGTH = settings.MAX_TITLE_LENGTH

class EntryCreateSerializer(serializers.ModelSerializer):
    date_added = serializers.DateTimeField(read_only=True, format="%b %d, %Y %H:%M")
    class Meta:
        model = Entry
        fields = [
            'id',
            'topic',
            'post_entry',
            'date_added'
        ]

class EntrySerializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source='user.profile', read_only=True)
    post_entry = EntryCreateSerializer(many=True, read_only=True)
    class Meta:
        model = Topic
        fields = [ 
            'id', 
            'post_topic',
            'post_entry',
            'user'
            ]
    def get_post_topic(self, obj):
        return obj.post_topic

class TopicCreateSerializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source='user.profile', read_only=True)#serializers.SerializerMethodField(read_only=True)
    post_entry = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='post_entry'
     )
    class Meta:
        model = Topic
        fields = ['user', 'id', 'post_topic', 'post_entry']

        def validate_post_topic(self, value):
            if len(value) > MAX_TITLE_LENGTH:
                raise serializers.ValidationError("This title is too long")
            return value
        
    # def get_user(self, obj):
    #     return obj.user.id

class TopicSerializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source= 'user.profile', read_only=True)
    post_topic = serializers.SerializerMethodField(read_only=True)
    post_entry = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='post_entry'
     )
    class Meta:
        model = Topic
        fields = [
            'user', 
            'id', 
            'post_topic',
            'post_entry'
            ]

    def get_post_topic(self, obj):
        return obj.post_topic
    
    

