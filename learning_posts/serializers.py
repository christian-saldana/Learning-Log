from django.conf import settings
from rest_framework import serializers
from profiles.serializers import PublicProfileSerializer
from .models import Topic


MAX_TITLE_LENGTH = settings.MAX_TITLE_LENGTH

class TopicCreateSerializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source='user.profile', read_only=True)#serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Topic
        fields = ['user', 'id', 'text']

        def validate_text(self, value):
            if len(value) > MAX_TITLE_LENGTH:
                raise serializers.ValidationError("This title is too long")
            return value
        
    # def get_user(self, obj):
    #     return obj.user.id

class TopicSerializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source= 'user.profile', read_only=True)
    text = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Topic
        fields = [
            'user', 
            'id', 
            'text']

    def get_text(self, obj):
        return obj.text