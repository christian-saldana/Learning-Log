from django.contrib.auth import get_user_model
from rest_framework import authentication

User = get_user_model()

class DevAuthentication(authentication.BasicAuthentication):
    def authenticate(self, request):
        print('here')
        qs = User.objects.all()
        user = qs.order_by("?").first()
        return (user, None)
