# syntax=docker/dockerfile:1

# ---------- Build ----------
FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Runtime ----------
FROM node:24-alpine AS runtime
WORKDIR /app

# NG_ALLOWED_HOSTS: comma-separated hosts accepted by Angular SSR (SSRF protection).
# Override at runtime with the host/IP you use to reach the server.
ENV NODE_ENV=production \
    PORT=4300 \
    NG_ALLOWED_HOSTS=localhost,127.0.0.1

# The Angular SSR build bundles its server dependencies, so only dist is needed
COPY --from=build --chown=node:node /app/dist/DashboardServer ./dist/DashboardServer

USER node
EXPOSE 4300

CMD ["node", "dist/DashboardServer/server/server.mjs"]
