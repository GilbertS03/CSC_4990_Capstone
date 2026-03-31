FROM node:20-alpine AS builder

WORKDIR /app

COPY app-frontend/package.json .
COPY app-frontend/package-lock.json .
RUN npm ci

COPY app-frontend/ .
RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html

COPY app-frontend/nginx.conf .
COPY /etc/nginx/conf.d/default.conf .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
