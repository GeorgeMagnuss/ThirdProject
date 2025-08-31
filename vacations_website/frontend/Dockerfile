FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

# Create directories for static and media files
RUN mkdir -p /usr/share/nginx/html/static /usr/share/nginx/html/media

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]