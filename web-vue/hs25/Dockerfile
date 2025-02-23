
FROM nginx:stable-alpine as production-stage
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./domain.crt /etc/ssl/certs/domain.crt
COPY ./privkey.key /etc/ssl/certs/privkey.key
COPY dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]