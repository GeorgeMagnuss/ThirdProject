FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Ensure media directory exists
RUN mkdir -p /app/media

RUN python manage.py collectstatic --noinput

EXPOSE 8001

ENTRYPOINT ["sh", "-c", "python manage.py migrate --noinput && python manage.py shell -c \"from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(email='admin@test.com').exists() or User.objects.create_superuser(email='admin@test.com', password='admin123', first_name='Admin', last_name='User')\" && python manage.py runserver 0.0.0.0:8001"]