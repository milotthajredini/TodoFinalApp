from tkinter import CASCADE
from django.db import models

# Create your models here.


class User(models.Model):
    name = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=300)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.name


class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    status = models.CharField(max_length=200, null=True)
    assigned = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.title
