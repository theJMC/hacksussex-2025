
FROM nginx:stable-alpine as production-stage
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY certs/ /etc/ssl/certs
COPY dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]