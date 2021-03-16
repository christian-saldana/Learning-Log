"""learning_log URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

from learning_posts.views import (
    index,
    topics,
    topic,
    new_topic,
    new_entry,
    edit_entry,
    delete_topic,
)

urlpatterns = [
    path('', index),
    path('admin/', admin.site.urls),
    path('topics/', topics),
    path('topics/<int:topic_id>/', topic, name='topic'),
    path('new_topic/', new_topic),
    path('new_entry/<int:topic_id>/', new_entry, name='new_entry'),
    path('edit_entry/<int:entry_id>/', edit_entry, name='edit_entry'),
    path('api/topics/', include('learning_posts.urls'))

]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                    document_root=settings.STATIC_ROOT)
