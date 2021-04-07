from django.urls import path


from .views import (
    topics,
    topic,
    new_topic,
    new_entry,
    edit_entry,
    delete_topic,
)

urlpatterns = [
    path('', topics),
    path('new_topic/', new_topic),
    path('<int:topic_id>/', topic, name='topic'),
    path('<int:topic_id>/delete/', delete_topic),
    path('new_entry/<int:topic_id>/', new_entry),
    path('edit_entry/<int:entry_id>/', edit_entry, name='edit_entry'),
]