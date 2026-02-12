import { serve } from "bun";
import { Database } from "bun:sqlite";
import path from "path";
import nodemailer from "nodemailer";
import { readFileSync, existsSync } from "fs";

/* ---------------- ENV ---------------- */
const PORT = Number(process.env.PORT || 3000);

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

const CONTACT_FROM =
  process.env.CONTACT_FROM || "Murphy Portfolio <djmurphyluv@gmail.com>";
const CONTACT_TO = process.env.CONTACT_TO || "djmurphyluv@gmail.com";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "admin123";

// Frontend static files (built by Vite, copied into ./public by Docker)
const PUBLIC_DIR = path.resolve(process.cwd(), "public");

const INDEX_HTML = path.join(PUBLIC_DIR, "index.html");

console.log("🚀 Running on PORT:", PORT);
console.log("SMTP configured:", Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS));
console.log("Serving frontend from:", PUBLIC_DIR);
console.log("CWD:", process.cwd());
console.log("import.meta.dir:", import.meta.dir);

/* ---------------- DATABASE ---------------- */
const dbPath = path.resolve(process.cwd(), "data.sqlite");
const db = new Database(dbPath);

db.run(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

/* ---------------- MAIL TRANSPORT ---------------- */
let transporter: nodemailer.Transporter | null = null;

if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false, // STARTTLS
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
} else {
  console.warn("⚠ SMTP credentials missing — email disabled");
}

/* ---------------- HELPERS ---------------- */
function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    },
  });
}

function isAdmin(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7) === ADMIN_TOKEN;
  return req.headers.get("x-admin-token") === ADMIN_TOKEN;
}

// Serve a static file from the public directory
function serveStatic(filePath: string): Response | null {
  if (!existsSync(filePath)) return null;

  const ext = path.extname(filePath);
  const mimeTypes: Record<string, string> = {
    ".html":  "text/html",
    ".js":    "application/javascript",
    ".css":   "text/css",
    ".png":   "image/png",
    ".jpg":   "image/jpeg",
    ".jpeg":  "image/jpeg",
    ".svg":   "image/svg+xml",
    ".ico":   "image/x-icon",
    ".json":  "application/json",
    ".woff":  "font/woff",
    ".woff2": "font/woff2",
  };

  const contentType = mimeTypes[ext] || "application/octet-stream";
  return new Response(readFileSync(filePath), {
    headers: { "Content-Type": contentType },
  });
}

/* ---------------- SERVER ---------------- */
serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);

    /* ---- CORS PREFLIGHT ---- */
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    /* ---- POST CONTACT ---- */
    if (url.pathname === "/api/contact" && req.method === "POST") {
      try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
          return jsonResponse({ error: "Missing required fields" }, 400);
        }

        const result = db
          .prepare(
            "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)"
          )
          .run(name, email, message);

        let mailResult: { sent: boolean; error?: string } = { sent: false };

        if (transporter) {
          try {
            await transporter.sendMail({
              from: CONTACT_FROM,
              to: CONTACT_TO,
              replyTo: email,
              subject: `New contact from ${name}`,
              text: `${name} <${email}>\n\n${message}`,
            });
            mailResult = { sent: true };
          } catch (err) {
            console.error("❌ Mail send error:", err);
            mailResult = { sent: false, error: String(err) };
          }
        }

        return jsonResponse({ id: result.lastInsertRowid, mail: mailResult }, 201);
      } catch (err) {
        return jsonResponse({ error: "Invalid request" }, 400);
      }
    }

    /* ---- GET CONTACTS (ADMIN) ---- */
    if (url.pathname === "/api/contact" && req.method === "GET") {
      if (!isAdmin(req)) return jsonResponse({ error: "Unauthorized" }, 401);
      const rows = [...db.query("SELECT * FROM contacts ORDER BY id DESC")];
      return jsonResponse(rows);
    }

   
    return new Response("Not found", { status: 404 });
  },
});

console.log(`✅ Server running at http://localhost:${PORT}`);
