# Murphy Portfolio (Fullstack)

This repo contains a small fullstack portfolio app:

- Backend: Bun + SQLite (server in `server/index.ts`)
- Frontend: React + TypeScript (TSX) built with Vite (in `web/`)
- Styling: Tailwind via CDN in `index.html`
- Docker: multi-stage Dockerfile builds the frontend then runs the Bun server

Quick start (development)

1. Install Bun: https://bun.sh (for running the server)
2. From `web/` install deps and run dev:

```bash
cd web
npm install
npm run dev
```

3. Run the Bun server (serves production build in `web/dist`):

```bash
cd server
bun install || true
bun index.ts
```

Build & run with Docker

```bash
docker build -t murphy-portfolio .
docker run -p 3000:3000 murphy-portfolio
```

Notes

- The backend stores projects, contacts and CV in `data.sqlite` next to the server.
- Contact form sends POST /api/contact — messages are saved in the database.
- Projects page allows adding projects via POST /api/projects and lists them.
- CV page lets you edit and save your CV content.
- Skills page contains a scrollable box (scrollbar visible).
