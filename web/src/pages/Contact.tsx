


import React, { useState } from "react";
import "./Contact.css";

// Set this in your frontend's .env as VITE_API_URL=https://your-backend.onrender.com
// In dev it falls back to localhost:3000
const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("🎉 Message sent — thank you!");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else if (data?.error) {
        setStatus(`❌ ${data.error}`);
      } else {
        setStatus("❌ Failed to send message. Please try again later.");
      }
    } catch {
      setStatus("⚠ Network error — please try again.");
    } finally {
      setSending(false);
    }
  }

  const validEmail = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

  return (
    <section id="contact" className="contact-section relative overflow-hidden">
      {/* Background Effects */}
      <div className="tech-bg absolute inset-0 -z-10" />
      <div className="color-swirl" aria-hidden />

      <div className="contact-content relative z-10">
        <h2 className="contact-title">Get In Touch</h2>
        <p className="contact-subtitle">
          Open to frontend roles, freelance work, and collaborations.
        </p>

        <form onSubmit={submit} className="contact-card">
          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            required
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            placeholder="Phone number (optional)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <textarea
            required
            placeholder="Tell me about your project..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <button
            type="submit"
            disabled={
              sending ||
              !form.name ||
              !form.email ||
              !form.message ||
              !validEmail(form.email)
            }
          >
            {sending ? "Sending..." : "Send Message"}
          </button>

          {status && <div className="contact-status">{status}</div>}
        </form>

        <div className="contact-links">
          <a href="https://github.com/odionmurphy" target="_blank" rel="noreferrer">
            ♟ GitHub
          </a>
          <a href="https://linkedin.com/https://www.linkedin.com/in/murphy-usunobun-5a159a226/in/odionmurphy" target="_blank" rel="noreferrer">🔗 LinkedIn</a>
        
        </div>
      </div>
    </section>
  );
}