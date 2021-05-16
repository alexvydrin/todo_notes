from rest_framework.viewsets import ModelViewSet
from .models import NoteUser
from .serializers import NoteUserModelSerializer


class NoteUserModelViewSet(ModelViewSet):
    queryset = NoteUser.objects.all()
    serializer_class = NoteUserModelSerializer
