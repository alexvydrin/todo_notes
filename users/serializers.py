from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        # fields = '__all__'
        fields = ('id', 'url', 'username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff')


class UserModelSerializerV2(HyperlinkedModelSerializer):
    class Meta:
        model = User
        # fields = '__all__'
        fields = ('id', 'url', 'username', 'first_name', 'last_name', 'email')