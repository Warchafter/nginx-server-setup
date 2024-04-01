from rest_framework import serializers

from core.models import JikanFavoriteAnime


class JikanFavoriteAnimeSerializer(serializers.ModelSerializer):

    class Meta:
        model = JikanFavoriteAnime
        fields = ('id', 'mal_id', 'fav_added')
        read_only_fields = ('id', 'fav_added')
