from django.conf import settings
from rest_framework import serializers
from .models import Topic


MAX_TITLE_LENGTH = settings.MAX_TITLE_LENGTH

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['text']

        def validate_text(self, value):
            if len(value) > MAX_TITLE_LENGTH:
                raise serializers.ValidationError("This title is too long")
            return value