from rest_framework import serializers
from .models import Blog, Category, Comment


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(
        source='author.username',
        read_only=True
    )

    class Meta:
        model = Comment
        fields = [
            'id',
            'blog',
            'author',
            'author_name',
            'content',
            'created_at'
        ]

        read_only_fields = [
            'author',
            'created_at'
        ]

    def validate_content(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Comment cannot be empty."
            )
        return value


class BlogSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(
        source='author.username',
        read_only=True
    )

    category_name = serializers.CharField(
        source='category.name',
        read_only=True
    )

    class Meta:
        model = Blog
        fields = [
            'id',
            'title',
            'content',
            'author',
            'author_name',
            'category',
            'category_name',
            'image',
            'created_at',
            'updated_at'
        ]

        read_only_fields = [
            'author',
            'created_at',
            'updated_at'
        ]

    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Title cannot be empty."
            )

        if len(value.strip()) < 3:
            raise serializers.ValidationError(
                "Title must contain at least 3 characters."
            )

        return value

    def validate_content(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Content cannot be empty."
            )

        if len(value.strip()) < 10:
            raise serializers.ValidationError(
                "Content must contain at least 10 characters."
            )

        return value