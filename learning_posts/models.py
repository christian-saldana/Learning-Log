from django.conf import settings
from django.db.models import Q
from django.db import models

User = settings.AUTH_USER_MODEL


class Topic(models.Model):
    """A topic the user is learning about."""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=200)

    class Meta:
        ordering = ['-id']
    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
        }

class Entry(models.Model):
    """Something specific learned about a topic."""
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    text = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'entries'
    def __str__(self):
        """Return a string representation of the model."""
        return f"{self.text[:50]}..."
