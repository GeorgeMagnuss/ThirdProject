FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Ensure media directory exists
RUN mkdir -p /app/media

RUN python manage.py collectstatic --noinput

EXPOSE 8001

ENTRYPOINT ["sh", "-c", "python manage.py migrate --noinput && python manage.py shell -c \"from django.contrib.auth import get_user_model; from vacations.models import Role; Role.objects.get_or_create(role_name='admin'); Role.objects.get_or_create(role_name='user'); User = get_user_model(); admin_role = Role.objects.get(role_name='admin'); User.objects.filter(email='admin@test.com').exists() or User.objects.create_superuser(email='admin@test.com', password='admin123', first_name='Admin', last_name='User', role=admin_role)\" && gunicorn --bind 0.0.0.0:8001 vacation_project.wsgi:application"]