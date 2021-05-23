from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Project, Todo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ('name', 'repository', 'users')


class TodoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = ('project', 'text', 'created', 'updated', 'user', 'is_active')
