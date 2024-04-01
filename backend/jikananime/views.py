from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters


from core.models import JikanFavoriteAnime
from jikananime import serializers
# Create your views here.

class BaseJikanAnimeAttrView(viewsets.GenericViewSet,
                             mixins.ListModelMixin,
                             mixins.CreateModelMixin):
    """Base viewset for user owned product attributes"""
    authentication_classes = (JWTAuthentication,)

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        # assigned_only = bool(
        #     int(self.request.query_params.get('assigned_only', 0))
        # )
        queryset = self.queryset
        # if assigned_only:
        #     queryset = queryset.filter(product__isnull=False)

        return queryset.order_by('-id').distinct()

    def perform_create(self, serializer):
        """Create a new object"""
        serializer.save(user=self.request.user)


class StandardResultsSetPagination(PageNumberPagination):
    """Custom standard pagination class"""
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'results': data
        })


class JikanFavAnimeViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    queryset = JikanFavoriteAnime.objects.all()

    def list(self, request):
        serializer_class = serializers.JikanFavoriteAnimeSerializer(self.queryset, many=True)
        return Response(serializer_class.data)

    def retrieve(self, requeist, pk=None):
        fav_anime = get_object_or_404(self.queryset, pk=pk)
        serializer_class = serializers.JikanFavoriteAnimeSerializer(fav_anime)
        return Response(serializer_class.data)


class JikanFavoriteAnimeViewSet(viewsets.ModelViewSet):
    """Manage list of favorite animes of users"""
    serializer_class = serializers.JikanFavoriteAnimeSerializer
    search_fields = ['mal_id', ]
    filter_backends = (filters.SearchFilter,)
    queryset = JikanFavoriteAnime.objects.all()
    authentication_classes = (JWTAuthentication,)
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsAuthenticated]

    def _params_to_ints(self, qs):
        """Convert a list of string IDs to a list of integers

        Args:
            qs (list): Query String
        """
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        """Retrieve the favorite anime list based on user and optional filters"""
        mal_id = self.request.query_params.get('mal_id')
        order_by = self.request.query_params.get('order_by')
        queryset = self.queryset
        is_staff = self.request.user.is_staff

        if not is_staff:
            # For regular users, filter based on the authenticated user
            queryset = queryset.filter(user=self.request.user)

        # Apply order_by if provided
        if order_by:
            queryset = queryset.order_by(order_by)

        return queryset

    def perform_create(self, serializer):
        """Add a new anime to favorite"""
        serializer.save(user=self.request.user)

    def destroy(self, request, pk=None):
        # The endpoint for the destroy action for a single anime entry would
        # look like /jikan-favorite-animes/<pk>/
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['GET'], url_path='get-favourites/(?P<user_id>\d+)')
    def get_favourites(self, request, user_id):
        if int(user_id) != request.user.id:
            return Response(
                {"error": "Access denied. User ID does not match authenticated user."},
                status=status.HTTP_403_FORBIDDEN
            )

        queryset = self.queryset.filter(user=request.user)
        serializer = serializers.JikanFavoriteAnimeSerializer(queryset, many=True)
        return Response(serializer.data)


    @action(detail=False, methods=['DELETE'], url_path='delete-multiple')
    def delete_multiple(self, request):
        anime_ids_to_delete = request.data.get('anime_ids', [])

        # Ensure only the authenticated user's favorite anime IDs are deleted
        queryset = self.queryset.filter(user=request.user, id__in=anime_ids_to_delete)

        deleted_count, _ = queryset.delete()

        if deleted_count > 0:
            return Response(f"{deleted_count} favorite anime(s) deleted successfully", status=status.HTTP_200_OK)
        else:
            return Response("No favorite anime deleted", status=status.HTTP_400_BAD_REQUEST)
