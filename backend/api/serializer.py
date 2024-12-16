from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Recipe, Tag

class RecipeSerializer(ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True)

    class Meta:
        model = Recipe
        fields = '__all__'

class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'