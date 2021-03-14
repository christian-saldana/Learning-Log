from django.contrib.auth import get_user_model
from django.test import TestCase

from rest_framework.test import APIClient

from .models import Topic

# Create your tests here.
User = get_user_model()

class TopicTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='abc', password='somepassword')
        self.userb = User.objects.create_user(username='def', password='somepassword2')
        Topic.objects.create(text="my first topic", 
            user=self.user)
        Topic.objects.create(text="my first topic", 
            user=self.user)
        Topic.objects.create(text="my first topic", 
            user=self.userb)
        self.currentCount = Topic.objects.all().count()

    def test_new_topic(self):
        self.assertEqual(self.user.username, 'abc')

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='somepassword')
        return client

    def test_topic_list(self):
        client = self.get_client()
        response = client.get("/api/topics/")
        self.assertEqual(response.status_code, 200)
        print(response.json())

    def test_new_topic_api_view(self):
        request_data = {"text": "This is my test topic"}
        client = self.get_client()
        response = client.post("/api/topics/new_topic/", request_data)
        self.assertEqual(response.status_code, 201)
        response_data = response.json()
        new_topic_id = response_data.get("id")
        self.assertEqual(self.currentCount + 1, new_topic_id)
    
    """ First need to serialize django view
    def test_topic_detail_api_view(self):
        client = self.get_client()
        response = client.get("/api/topics/3/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        _id = data.get("id")
        self.assertEqual(_id, 1)"""

    def test_topic_delete_api_view(self):
        client = self.get_client()
        response = client.delete("/api/topics/1/delete/")
        self.assertEqual(response.status_code, 200)
        client = self.get_client()
        response = client.delete("/api/topics/1/delete/")
        self.assertEqual(response.status_code, 404)
        response_incorrect_owner = client.delete("/api/topics/3/delete/")
        self.assertEqual(response_incorrect_owner.status_code, 401)