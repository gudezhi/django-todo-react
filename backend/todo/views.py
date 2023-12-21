from django.shortcuts import render
from rest_framework import viewsets

from .permissions import IsAuthenticatedForWrite

from .serializers import TodoSerializer
from .models import Todo

# Create your views here.

class TodoView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedForWrite]

    serializer_class = TodoSerializer
    queryset = Todo.objects.all()