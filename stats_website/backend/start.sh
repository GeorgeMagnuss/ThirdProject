#!/bin/bash
python manage.py migrate --noinput
python manage.py shell -c "from django.contrib.auth.models import User; User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@test.com', 'admin123')"
gunicorn --bind 0.0.0.0:8000 stats_backend.wsgi:application