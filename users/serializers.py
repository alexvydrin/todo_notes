from rest_framework.serializers import HyperlinkedModelSerializer
from .models import NoteUser


class NoteUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = NoteUser
        fields = ('username', 'firstname', 'lastname', 'email')
