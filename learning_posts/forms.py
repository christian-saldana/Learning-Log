from django.conf import settings
from django import forms
from .models import Topic, Entry


MAX_TITLE_LENGTH = settings.MAX_TITLE_LENGTH

class TopicForm(forms.ModelForm):
    class Meta:
        model = Topic
        fields = ['text']
        lables = {'text': ''}

    def clean_text(self):
        text = self.cleaned_data.get("text")
        if len(text) > MAX_TITLE_LENGTH:
            raise forms.ValidationError("This title is too long")
        return text

class EntryForm(forms.ModelForm):
    class Meta:
        model = Entry
        fields = ['text']
        labels = {'text': 'Entry:'}
        widgets = {'text': forms.Textarea(attrs={'cols': 80})}