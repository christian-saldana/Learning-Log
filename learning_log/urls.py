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
from django.urls import path, re_path, include

from accounts.views import (
    login_view,
    logout_view,
    register_view
)

from learning_posts.views import (
    index,
    topics_list_view,
    topics_detail_view,
    edit_entry,
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index),
    path('topics/', topics_list_view),
    path('login/', login_view),
    path('logout/', logout_view),
    path('register/', register_view),
    path('<int:topic_id>', topics_detail_view, name='topic'),
    re_path(r'profiles?/', include('profiles.urls')),
    path('edit_entry/<int:entry_id>/', edit_entry, name='edit_entry'),
    path('api/topics/', include('learning_posts.api.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                    document_root=settings.STATIC_ROOT)
