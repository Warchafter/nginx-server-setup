# Generated by Django 4.2.6 on 2024-02-06 15:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_alter_todo_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='ToDoStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
            ],
        ),
    ]