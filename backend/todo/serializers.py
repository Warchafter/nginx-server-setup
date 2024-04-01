from rest_framework import serializers

from core.models import ToDo, ToDoStatus



class ToDoStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = ToDoStatus
        fields = ('id', 'name')
        read_only_fields = ('id',)


class ToDoSerializer(serializers.ModelSerializer):
    # Change status field to use ToDoStatusSerializer for serialization
    status = ToDoStatusSerializer(required=False)

    class Meta:
        model = ToDo
        fields = ('id', 'todo_desc', 'status')
        read_only_fields = ('id',)

    def create(self, validated_data):
        # Retrieve the ToDoStatus object with the name 'active'
        active_status = ToDoStatus.objects.get(name='active')
        # Assign the retrieved ToDoStatus object to the 'status' field
        validated_data['status'] = active_status
        return super().create(validated_data)