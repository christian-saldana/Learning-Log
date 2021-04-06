from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL


class Topic(models.Model):
    """A topic the user is learning about."""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post_topic = models.CharField(max_length=200)
    date_added = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.post_topic

    class Meta:
        ordering = ['-id']


class Entry(models.Model):
    """Something specific learned about a topic."""
    topic = models.ForeignKey(Topic, related_name='entries', on_delete=models.CASCADE)
    post_entry = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)
 
    class Meta:
        verbose_name_plural = 'entries'
    
    # def __str__(self):
    #     return '%s' % (self.post_entry)

    def __str__(self):
       """Return a string representation of the model."""
       return f"{self.post_entry[:50]}..."

