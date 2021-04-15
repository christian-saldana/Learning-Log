from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from learning_posts.api import views

from .views import (
    topics,
    topic,
    new_topic,
    new_entry,
    delete_topic,
)

urlpatterns = [
    path('', topics),
    path('new_topic/', new_topic),
    path('<int:topic_id>/', topic, name='topic'),
    path('<int:topic_id>/delete/', delete_topic),
    path('new_entry/', views.EntryList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)