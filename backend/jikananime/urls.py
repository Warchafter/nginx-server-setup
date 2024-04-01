from django.urls import path, include
from rest_framework.routers import DefaultRouter
from jikananime.views import JikanFavoriteAnimeViewSet

router = DefaultRouter()
router.register('jikan-favorite-animes', JikanFavoriteAnimeViewSet)

app_name = 'jikananime'

urlpatterns = [
    path('', include(router.urls)),
]