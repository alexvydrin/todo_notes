from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework import status
from .models import Project, Todo
from .serializers import ProjectModelSerializer, TodoModelSerializer
from django_filters import rest_framework as filters
from django.http import HttpResponse
import requests


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    pagination_class = TodoLimitOffsetPagination
    filterset_fields = ['project']

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.is_active = False
        todo.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


def test_token(request):
    response = requests.post('http://127.0.0.1:8000/api-token-auth/',
                             data={'username': 'test_token',
                                   'password': 'token123'})
    html = "<html><body>token= %s.</body></html>" % response.json()
    return HttpResponse(html)
