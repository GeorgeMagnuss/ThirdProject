FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput

EXPOSE 8000

# Create startup script with user creation
RUN echo '#!/bin/bash\n\
python manage.py migrate --noinput\n\
python manage.py shell -c "from django.contrib.auth.models import User; User.objects.filter(username=\"admin\").exists() or User.objects.create_superuser(\"admin\", \"admin@test.com\", \"admin123\")"\n\
gunicorn --bind 0.0.0.0:8000 stats_backend.wsgi:application' > /app/start.sh

RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]