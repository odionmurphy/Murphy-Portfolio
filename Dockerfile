# =========================
# Stage 1: Build frontend
# =========================
FROM node:18-alpine AS builder
WORKDIR /app/web
COPY web/package.json web/package-lock.json* ./
RUN npm install --silent
COPY web/ .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# =========================
# Stage 2: Run server with Bun
# =========================
FROM oven/bun:latest
WORKDIR /app/server
COPY server/package.json ./
RUN bun install
COPY server/ .
COPY --from=builder /app/web/dist ./public
EXPOSE 3000
CMD ["bun", "run", "index.ts"]
