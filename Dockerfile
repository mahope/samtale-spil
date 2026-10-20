FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# "da" builds snakkespil.dk; "en" builds Goodtalk (goodtalkcards.com), see next.config.ts
ARG SITE_LOCALE=da
ENV SITE_LOCALE=$SITE_LOCALE
RUN npm run build

FROM nginx:1.31-alpine
COPY --from=builder /app/out /usr/share/nginx/html
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/security-headers.conf /etc/nginx/snippets/security-headers.conf
EXPOSE 3000
