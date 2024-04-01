from .serializers import UserCreateSerializer, UserSerializer, UserAccountSerializer, AuthTokenSerializer, CurrentUserSerializer
from users import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import permissions, status, viewsets, filters, generics, authentication, mixins
from users.models import UserAccount
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken



class IsAdminOrReadOnly(permissions.BasePermission):
    """Object-level permission to only allow admin users to edit an object"""

    def has_permission(self, request, view):
        # Read permissions are allowed to any request, therefore GET, HEAD and
        # OPTIONS requests are always allowed.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Instance must belong to an admin user
        return request.user.is_staff


class JWTAuthenticationSafe(JWTAuthentication):
    def authenticate(self, request):
        try:
            return super().authenticate(request=request)
        except InvalidToken:
            return None


class BaseUserAttrViewSet(viewsets.GenericViewSet,
                          mixins.ListModelMixin,
                          mixins.CreateModelMixin):
    """Base viewset for user attributes"""
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAdminOrReadOnly,)

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        queryset = self.queryset

        return queryset.order_by('-id').distinct()

    def perform_create(self, serializer):
        """Create a new object"""
        serializer.save(user=self.request.user)



# class RetrieveUserView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request):
#         user = request.user
#         user = UserSerializer(user)

#         return Response(user.data, status=status.HTTP_200_OK)
    

class CreateUserView(generics.CreateAPIView):
    """Create a new auth token for user"""
    serializer_class = UserCreateSerializer


class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for user"""
    serializer_class = AuthTokenSerializer


class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = UserCreateSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retrieve and return the authenticated user"""
        return self.request.user


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = serializers.UserSerializer
    search_fields = ['email', ]
    filter_backends = (filters.SearchFilter, )
    queryset = UserAccount.objects.all()
    authentication_classes = (JWTAuthentication,)

    """
    A viewset that provides the standard actions
    """
    queryset = UserAccount.objects.all()
    serializer_class = UserSerializer

    def _params_to_ints(self, qs):
        """Convert a list of string IDs to a list of integers

        Args:
            qs (list): Query String
        """
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        email = self.request.query_params.get('email')
        first_name = self.request.query_params.get('first_name')
        last_name = self.request.query_params.get('last_name')
        queryset = self.queryset
        is_staff = self.request.user.is_staff

        if email:
            queryset = queryset.filter(email__iexact=email)
        if first_name:
            queryset = queryset.filter(first_name__iexact=first_name)
        if last_name:
            queryset = queryset.filter(last_name__iexact=last_name)
        if is_staff:
            return queryset.all().order_by('email')
        else:
            return queryset.all().order_by('last_name')

    def get_serializer_class(self):
        """Return appropiate serializer class"""
        if self.action == 'retrieve':
            return serializers.CurrentUserSerializer
        elif self.action == 'set_password':
            return serializers.PasswordSerializer
        elif self.action == 'set_theme':
            return serializers.ThemePatchSerializer


    @action(methods=['GET'], detail=False, url_path='current')
    def get_current_user(self, request, pk=None):
        serializer = CurrentUserSerializer(request.user)
        return Response(serializer.data)


    @action(detail=True, methods=['patch'], permission_classes=[permissions.IsAuthenticated], url_path='set_password')
    def set_password(self, request, pk=None):
        user = self.get_object()
        serializer = self.get_serializer(
            user,
            data=request.data
        )

        if serializer.is_valid():
            user.set_password(serializer.validated_data['password'])
            user.save()
            return Response({'status': 'password set'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['patch'], permission_classes=[permissions.IsAuthenticated], url_path='set_theme')
    def set_theme(self, request, pk=None):
        user = self.get_object()
        serializer = self.get_serializer(
            user,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)


    @action(detail=False)
    def recent_users(self, request):
        recent_users = UserAccount.objects.all().order_by('-last_login')

        page = self.paginate_queryset(recent_users)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(recent_users, many=True)
        return Response(serializer.data)


# class RegisterView(APIView):
#     def post(self, request):
#         data = request.data

#         serializer = UserCreateSerializer(data=data)
#         if not serializer.is_valid():
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         user = serializer.create(serializer.validated_data)
#         user = UserSerializer(user)

#         return Response(user.data, status=status.HTTP_201_CREATED)

