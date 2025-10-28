# syntax=docker/dockerfile:1
FROM nginx:1.27-alpine

# Copy static site into Nginx html directory
COPY ./ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
