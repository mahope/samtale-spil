FROM node:24-alpine AS builder
# bun only installs the dependencies from bun.lock (and runs the scripts); node still runs next
COPY --from=oven/bun:1.4.5-alpine /usr/local/bin/bun /usr/local/bin/bun
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
# "da" builds snakkespil.dk; "en" builds Goodtalk (goodtalkcards.com), see next.config.ts
ARG SITE_LOCALE=da
ENV SITE_LOCALE=$SITE_LOCALE
RUN bun run build

FROM nginx:1.31-alpine
COPY --from=builder /app/out /usr/share/nginx/html
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/security-headers.conf /etc/nginx/snippets/security-headers.conf
EXPOSE 3000
