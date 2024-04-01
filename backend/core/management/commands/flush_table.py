from django.core.management.base import BaseCommand
from core.models import ToDoStatus

class Command(BaseCommand):
    help = 'Flushes all data from the ToDoStatus table'

    def handle(self, *args, **options):
        ToDoStatus.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Successfully flushed the ToDoStatus table'))