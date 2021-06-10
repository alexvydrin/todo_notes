# from rest_framework.viewsets import ModelViewSet
from rest_framework.viewsets import GenericViewSet
# from rest_framework import generics
from rest_framework import permissions,  mixins
from .models import User
from .serializers import UserModelSerializer


# class UserModelViewSet(ModelViewSet):
class UserCustomViewSet(mixins.UpdateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, GenericViewSet):

    # К сожалению не сумел реализовать версии API для пользователей, так как здесь нужны миксины для настройки прав
    # поэтому реализовал версии API в проектах (при версии 2.0 - вид без поля репозитария)

    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all().order_by("username")
    serializer_class = UserModelSerializer
