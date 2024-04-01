from django.db.models.signals import post_save
from django.dispatch import receiver
from core.models import JikanUserInfo
from .models import UserAccount

@receiver(post_save, sender=UserAccount)
def create_jikan_user_info(sender, instance, created, **kwargs):
    if created:
        JikanUserInfo.objects.create(user=instance)