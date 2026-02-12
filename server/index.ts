import { serve, file } from "bun";
import { Database } from "bun:sqlite";
import path from "path";
import nodemailer from "nodemailer";

const PORT = Number(process.env.PORT || 3000);
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_FROM = process.env.CONTACT_FROM || "Murphy Portfolio <djmurphyluv@gmail.com>";
const CONTACT_TO = process.env.CONTACT_TO || "djmurphyluv@gmail.com";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "admin123";
const PUBLIC_DIR = path.join(import.meta.dir, "public");

console.log("🚀 Running on PORT:", PORT);
console.log("SMTP configured:", Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS));
console.log("PUBLIC_DIR:", PUBLIC_DIR);

const db = new Database(path.join(import.meta.dir, "data.sqlite"));
db.run(`CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT, email TEXT, message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

let transporter: nodemailer.Transporter | null = null;
if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST, port: SMTP_PORT, secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

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

serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);

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

    if (url.pathname === "/api/contact" && req.method === "POST") {
      try {
        const { name, email, message } = await req.json();
        if (!name || !email || !message)
          return jsonResponse({ error: "Missing required fields" }, 400);

        const result = db.prepare(
          "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)"
        ).run(name, email, message);

        let mailResult: { sent: boolean; error?: string } = { sent: false };
        if (transporter) {
          try {
            await transporter.sendMail({
              from: CONTACT_FROM, to: CONTACT_TO, replyTo: email,
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
      } catch {
        return jsonResponse({ error: "Invalid request" }, 400);
      }
    }

    if (url.pathname === "/api/contact" && req.method === "GET") {
      if (!isAdmin(req)) return jsonResponse({ error: "Unauthorized" }, 401);
      const rows = [...db.query("SELECT * FROM contacts ORDER BY id DESC")];
      return jsonResponse(rows);
    }

    // Serve static files using Bun's native file serving
    let filePath = path.join(PUBLIC_DIR, url.pathname);

    // Default to index.html for root or unknown routes
    if (url.pathname === "/" || url.pathname === "") {
      filePath = path.join(PUBLIC_DIR, "index.html");
    }

    const bunFile = file(filePath);
    if (await bunFile.exists()) {
      return new Response(bunFile);
    }

    // SPA fallback — serve index.html for all non-asset routes
    const indexFile = file(path.join(PUBLIC_DIR, "index.html"));
    if (await indexFile.exists()) {
      return new Response(indexFile, {
        headers: { "Content-Type": "text/html" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log(`✅ Server running at http://localhost:${PORT}`);
