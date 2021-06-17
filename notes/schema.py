import graphene
from graphene_django import DjangoObjectType
from todo.models import Project, Todo
from users.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todos = graphene.List(TodoType)

    def resolve_all_todos(root, info):
        return Todo.objects.all()


schema = graphene.Schema(query=Query)
