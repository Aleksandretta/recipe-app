# Generated by Django 5.1.4 on 2024-12-13 21:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('country', models.CharField(max_length=100)),
                ('prep_time', models.CharField(max_length=20)),
                ('description', models.CharField(max_length=500)),
                ('recipe', models.CharField(max_length=1000)),
                ('tags', models.ManyToManyField(related_name='recipes', to='api.tag')),
            ],
        ),
    ]