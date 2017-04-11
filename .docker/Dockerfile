FROM nginx:alpine

MAINTAINER Luis Emilio Velasco

COPY .docker/nginx.conf /etc/nginx/nginx.conf
COPY dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
