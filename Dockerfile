# Coolify / production: build Vite app, serve static files with nginx
# -----------------------------------------------------------------------------
# Vite bakes VITE_* variables in at build time. In Coolify, add the same keys
# under Build Arguments (or ensure they are available during `docker build`).
# Example — duplicate for every variable your app reads:
#   ARG VITE_AUTH_ME_PATH
#   ENV VITE_AUTH_ME_PATH=$VITE_AUTH_ME_PATH
# -----------------------------------------------------------------------------

FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Uncomment and extend for each VITE_* your deployment needs:
# ARG VITE_API_BASE_URL
# ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

# --- runtime ---

FROM nginx:1.27-alpine AS runner

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
