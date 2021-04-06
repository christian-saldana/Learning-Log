from django.conf import settings
from django import forms
from .models import Topic, Entry


MAX_TITLE_LENGTH = settings.MAX_TITLE_LENGTH

class TopicForm(forms.ModelForm):
    class Meta:
        model = Topic
        fields = ['post_topic']
        lables = {'post_topic': ''}

    def clean_text(self):
        text = self.cleaned_data.get("post_topic")
        if len(text) > MAX_TITLE_LENGTH:
            raise forms.ValidationError("This title is too long")
        return text

class EntryForm(forms.ModelForm):
    class Meta:
        model = Entry
        fields = ['post_entry']
        labels = {'post_entry': 'Entry:'}
        widgets = {'post_entry': forms.Textarea(attrs={'cols': 80})}