from django.db import models

# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    prep_time = models.CharField(max_length=20)
    description = models.CharField(max_length=500)
    recipe = models.CharField(max_length=1000)
    tags = models.ManyToManyField(Tag, related_name='recipes')

    def __str__(self):
        return self.name
    

