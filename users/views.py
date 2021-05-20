from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import NoteUserModelSerializer


class NoteUserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = NoteUserModelSerializer
