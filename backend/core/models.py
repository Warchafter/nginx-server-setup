from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.db.models.signals import post_migrate
from django.dispatch import receiver

class JikanFavoriteAnime(models.Model):
    mal_id = models.IntegerField(unique=True)
    fav_added = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    REQUIRED_FIELDS = ['mal_id', ]

    def __str__(self):
        return f"{self.user.username}'s Favorite Anime: {self.mal_id}"

class JikanUserInfo(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='jikan_info')
    favorite_anime_count = models.PositiveIntegerField(default=0)
    # Add other fields related to Jikan app user info

    class Meta:
        verbose_name = 'Jikan User Info'
        verbose_name_plural = 'Jikan User Infos'


class ToDoStatus(models.Model):
    name = models.TextField(null=False, blank=False)

class ToDo(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    todo_desc = models.TextField(null=False, blank=False)
    status = models.ForeignKey(
        ToDoStatus,
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = 'To Do'
        verbose_name_plural = 'To Do`s'

@receiver(post_migrate)
def create_default_statuses(sender, **kwargs):
    if sender.name == 'core':
        # Check if the default statuses exist
        active_status, _ = ToDoStatus.objects.get_or_create(name='active')
        pending_status, _ = ToDoStatus.objects.get_or_create(name='pending')
        done_status, _ = ToDoStatus.objects.get_or_create(name='done')

        # Set the default status ID to Active if it's not set already
        if ToDo.objects.filter(status__isnull=True).exists():
            ToDo.objects.update(status=active_status)