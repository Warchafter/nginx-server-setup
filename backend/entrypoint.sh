#!/bin/sh

python manage.py makemigrations
python manage.py migrate --no-input
python manage.py collectstatic --no-input

guinicorn backend.wsgi:application --bind 0.0.0.0:8000