from rest_framework import viewsets
from rest_framework.permissions import BasePermission, SAFE_METHODS

from .models import Blog, Category, Comment
from .serializers import (
    BlogSerializer,
    CategorySerializer,
    CommentSerializer
)


class IsOwnerOrReadOnly(BasePermission):
    """
    Anyone can view.
    Only logged-in users can create.
    Only the owner can update/delete.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-created_at')
    serializer_class = BlogSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('-created_at')
    serializer_class = CommentSerializer

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return []
        return [IsAuthenticatedForComment()]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class IsAuthenticatedForComment(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.author == request.user


from django.shortcuts import render

# Create your views here.
