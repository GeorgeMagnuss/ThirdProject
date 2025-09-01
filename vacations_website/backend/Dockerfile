FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Ensure media directory exists
RUN mkdir -p /app/media

RUN python manage.py collectstatic --noinput

COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 8001

CMD ["/app/start.sh"]