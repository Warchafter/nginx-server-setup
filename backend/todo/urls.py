from django.urls import path, include
from rest_framework.routers import DefaultRouter
from todo.views import ToDoViewSet, ToDoStatusViewSet

router = DefaultRouter()
router.register('todo1', ToDoViewSet)
router.register('todo-status', ToDoStatusViewSet)

app_name = 'todo'

urlpatterns = [
    path('', include(router.urls)),
]