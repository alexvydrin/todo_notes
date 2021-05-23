from django.db import models
from django.conf import settings


class Project(models.Model):
    name = models.CharField(max_length=64, unique=True)
    repository = models.CharField(max_length=64)
    users = models.ManyToManyField(settings.AUTH_USER_MODEL)

    def __str__(self):
        return self.name


class Todo(models.Model):
    project = models.ForeignKey(Project, models.PROTECT)
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, models.PROTECT)
    is_active = models.BooleanField(db_index=True, default=True)
