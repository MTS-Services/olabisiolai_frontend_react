# Coolify / production: build Vite app, serve static files with nginx
# -----------------------------------------------------------------------------
# Coolify defaults to Nixpacks for Node apps (Node 18 unless overridden). Vite 8
# needs Node 22.12+; repo root nixpacks.toml sets NIXPACKS_NODE_VERSION=22 for that path.
# Prefer Dockerfile here: Settings → Build → Build Pack → Dockerfile (path: /Dockerfile).
#
# Network: nginx listens on port 80. Set the application port in Coolify to 80
# (Coolify’s default 3000 does not match this image).
#
# Vite bakes VITE_* at build time. In Coolify, add those keys as build arguments
# and uncomment matching ARG/ENV pairs below.
# Example:
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
