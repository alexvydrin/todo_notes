from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    # username = models.CharField(max_length=64, unique=True)
    # firstname = models.CharField(max_length=64) - есть поле first_name
    # lastname = models.CharField(max_length=64) - есть поле last_name
    email = models.EmailField(max_length=64, unique=True)
