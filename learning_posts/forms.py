from django.conf import settings
from django import forms
from .models import Topic


MAX_TITLE_LENGTH = settings.MAX_TITLE_LENGTH

class TopicForm(forms.ModelForm):
    class Meta:
        model = Topic
        fields = ['text']

    def clean_text(self):
        text = self.cleaned_data.get("text")
        if len(text) > MAX_TITLE_LENGTH:
            raise forms.ValidationError("This title is too long")
        return text