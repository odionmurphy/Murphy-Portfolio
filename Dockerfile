# =========================
# Stage 1: Build frontend
# =========================
FROM node:18-alpine AS builder
WORKDIR /app

COPY web/package.json web/package-lock.json* ./web/
WORKDIR /app/web
RUN npm ci --silent || npm install --silent

COPY web/ .
RUN npm run build


# =========================
# Stage 2: Run server with Bun
# =========================
FROM oven/bun:latest

WORKDIR /app

# Copy backend
COPY server/ ./server/

# Copy built frontend
COPY --from=builder /app/web/dist ./web/dist

WORKDIR /app/server

EXPOSE 3000

CMD ["bun", "run", "index.ts"]


