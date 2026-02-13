




import { serve, file } from "bun";
import { Database } from "bun:sqlite";
import path from "path";
import { Resend } from "resend";

/* ---------------- ENV ---------------- */
const PORT = Number(process.env.PORT || 3000);
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO = process.env.CONTACT_TO || "murphy.usunobun@dci-student.org";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "admin123";
const PUBLIC_DIR = path.join(import.meta.dir, "public");

console.log("🚀 Running on PORT:", PORT);
console.log("Resend configured:", Boolean(RESEND_API_KEY));
console.log("PUBLIC_DIR:", PUBLIC_DIR);

/* ---------------- DATABASE ---------------- */
const db = new Database(path.join(import.meta.dir, "data.sqlite"));
db.run(`CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT, email TEXT, message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

/* ---------------- RESEND ---------------- */
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;
if (!resend) console.warn("⚠ RESEND_API_KEY missing — email disabled");

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
        if (!name || !email || !message)
          return jsonResponse({ error: "Missing required fields" }, 400);

        // Save to database
        const result = db.prepare(
          "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)"
        ).run(name, email, message);

        // Send email via Resend
        let mailResult: { sent: boolean; error?: string } = { sent: false };
        if (resend) {
          try {
            await resend.emails.send({
              from: "Murphy Portfolio <onboarding@resend.dev>",
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
      } catch {
        return jsonResponse({ error: "Invalid request" }, 400);
      }
    }

    /* ---- GET CONTACTS (ADMIN) ---- */
    if (url.pathname === "/api/contact" && req.method === "GET") {
      if (!isAdmin(req)) return jsonResponse({ error: "Unauthorized" }, 401);
      const rows = [...db.query("SELECT * FROM contacts ORDER BY id DESC")];
      return jsonResponse(rows);
    }

    /* ---- SERVE STATIC FILES ---- */
    let filePath = path.join(PUBLIC_DIR, url.pathname);
    if (url.pathname === "/" || url.pathname === "") {
      filePath = path.join(PUBLIC_DIR, "index.html");
    }

    const bunFile = file(filePath);
    if (await bunFile.exists()) {
      return new Response(bunFile);
    }

    // SPA fallback
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