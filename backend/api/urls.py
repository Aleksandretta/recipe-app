from django.urls import path
from .views import RecipeDetailView, RecipeListCreateView, TagListView

urlpatterns = [
    path('recipes/', RecipeListCreateView.as_view(),
         name='recipe-list-create'),
    path('recipes/<int:pk>/', RecipeDetailView.as_view(),
         name='recipe-details'),
    path('tags/', TagListView.as_view(), name='tag-list'),
]