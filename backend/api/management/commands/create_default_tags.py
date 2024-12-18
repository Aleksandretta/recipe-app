from django.core.management.base import BaseCommand
from api.models import Tag  # Zaimportuj model Tag z odpowiedniej aplikacji

class Command(BaseCommand):
    help = 'Tworzy domyślne tagi w bazie danych, jeśli jeszcze nie istnieją.'

    def handle(self, *args, **kwargs):
        default_tags = ['meat', 'dessert', 'dinner', 'breakfast', 'supper']
        for tag_name in default_tags:
            tag, _ = Tag.objects.get_or_create(name=tag_name)
