# Stage 1: Build
FROM node:22-alpine AS build
WORKDIR /app

COPY ayo-landing/package*.json ./
RUN npm ci

COPY ayo-landing/ .
RUN npm run build -- --configuration production

# Stage 2: Serve com nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist/ayo-landing/browser /usr/share/nginx/html
COPY ayo-landing/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
