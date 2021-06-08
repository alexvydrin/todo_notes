from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase  # , force_authenticate, APISimpleTestCase
from mixer.backend.django import mixer
from .models import Project  # , Todo
from users.models import User
from .views import ProjectModelViewSet


class ProjectViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        # print("request:", request)
        # print("response.data:", response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        """Проверка страницы с детальной информацией о проекте"""
        project = Project.objects.create(name='Project 1')
        client = APIClient()
        response = client.get(f'/api/projects/{project.id}/')
        # print("response.data:", response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        """Редактирование проекта неавторизованным пользователем"""
        project = Project.objects.create(name='Project 2')
        # print('project.name = ', project.name)
        client = APIClient()
        response = client.put(f'/api/projects/{project.id}/', {'name': 'Project 2 edited'})
        # print('project.name = ', project.name)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        """Редактирование проекта авторизованным пользователем"""
        project = Project.objects.create(name='Project 2')
        print('project.name = ', project.name)
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        print("admin.username=", admin.username)
        client.login(username='admin', password='admin123456')
        response = client.get(f'/api/projects/{project.id}/')
        print("response.data:", response.data)
        response = client.put(f'/api/projects/{project.id}/', {'name': 'Project 2 edited'})
        print('project.name = ', project.name)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, 'Project 2 edited')
        client.logout()


class ProjectViewSetAPITestCase(APITestCase):

    def test_edit_admin(self):
        """Редактирование проекта авторизованным пользователем"""
        # project = Project.objects.create(name='Project 3')
        # project = mixer.blend(Project)
        project = mixer.blend(Project, name='Project 3')
        # print('project.name = ', project.name)
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        # print("admin.username=", admin.username)
        self.client.login(username='admin', password='admin123456')
        response = self.client.get(f'/api/projects/{project.id}/')
        # print("response.data:", response.data)
        response = self.client.put(f'/api/projects/{project.id}/', {'name': 'Project 3 edited'})
        # print('project.name = ', project.name)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, 'Project 2 edited')
        client.logout()


class TestTodoViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
