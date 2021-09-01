from django.conf import settings
from django import forms
from .models import Entry


MAX_TITLE_LENGTH = settings.MAX_TITLE_LENGTH

class EntryForm(forms.ModelForm):
    class Meta:
        model = Entry
        fields = ['post_entry']
        labels = {'post_entry': 'Entry:'}
        widgets = {'post_entry': forms.Textarea(attrs={'cols': 80})}