FROM composer:2 AS deps
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --optimize-autoloader

FROM php:8.3-cli
WORKDIR /app
COPY --from=deps /app/vendor ./vendor
COPY public/ ./public/
COPY src/ ./src/
EXPOSE 8000
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
