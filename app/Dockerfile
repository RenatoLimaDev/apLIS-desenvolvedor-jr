FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
ARG VITE_API_PHP_URL=http://localhost:8000/api/v1
ARG VITE_API_NODE_URL=http://localhost:3000/api/v1
ENV VITE_API_PHP_URL=$VITE_API_PHP_URL
ENV VITE_API_NODE_URL=$VITE_API_NODE_URL
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
