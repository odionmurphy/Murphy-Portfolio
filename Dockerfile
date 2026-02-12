# =========================
# Stage 1: Build frontend
# =========================
FROM node:18-alpine AS builder

WORKDIR /app/web
COPY web/package.json web/package-lock.json* ./
RUN npm ci --silent || npm install --silent
COPY web/ .

# Bake the production API URL into the frontend at build time
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# =========================
# Stage 2: Run server with Bun
# =========================
FROM oven/bun:latest

WORKDIR /app

# Copy backend and install dependencies
COPY server/package.json ./server/
WORKDIR /app/server
RUN bun install --frozen-lockfile

COPY server/ .

# Copy built frontend into server/public so Bun can serve it
COPY --from=builder /app/web/dist ./public

EXPOSE 3000

CMD ["bun", "run", "index.ts"]
