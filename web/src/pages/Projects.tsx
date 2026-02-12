

import React, { useEffect, useState } from "react";
import "./Projects.css";


type Project = {
  id?: number;
  title: string;
  description: string;
  link?: string;
  image?: string;
  tags?: string[];
  year?: number | string;
  status?: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [modal, setModal] = useState<string | null>(null);
  const [form, setForm] = useState<Project>({
    title: "",
    description: "",
    link: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sampleProjects: Project[] = [
      {
        id: 1,
        title: "My Portfolio  ",
        description:
          "A modern, responsive portfolio website built with React and Vite, designed to showcase projects with clarity, performance, and scalability.",
        link: "#",
        image:
          "murphy.png",
        tags: ["React", "Vite", "Responsive"],
        year: 2026,
      },
      {
        id: 2,
        title: "Documents Gallery",
        description: "Personal portfolio with case studies and smooth animations     .",
        link: "#",
        image:
          "odi.png",
        tags: ["HTML", "CSS", "Animations"],
        year: 2025,
      },
      {
        id: 3,
        title: "DW-25 UI",
        description:
          "A minimalist, responsive A built with React and Vite, focused on presenting projects in a clear and engaging way. The design prioritizes speed, adaptability, and a polished user interface across all screen sizes..",
        link: "#",
        image:
          "bird.png",
        tags: ["React", "TypeScript", "Accessibility"],
        year: 2025,
      },
      {
        id: 4,
        title: "Booking Dashboard",
        description:
          "Admin dashboard for bookings, analytics and user management.",
        link: "#",
        image:
          "cars.png",
        tags: ["Dashboard", "Charts", "Node"],
        year: 2024,
      },
      {
        id: 5,
        title: " E‑commerce Demo",
        description: "Marketing site with animations and download CTAs.",
        link: "#",
        image:
          "shop.png",
        tags: ["Marketing", "SEO", "Performance"],
        year: 2022,
      },
      {
        id: 6,
        title: "Weather App Landing",
        description: "Sample shop with product filters and cart flow.",
        link: "#",
        image:
          "weader.png",
        tags: ["Shop", "Payments", "UX"],
        year: 2025,
      },
    ];

    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        if (!data || (Array.isArray(data) && data.length === 0)) {
          setProjects(sampleProjects);
        } else {
          setProjects(data || sampleProjects);
        }
      })
      .catch(() => setProjects(sampleProjects));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const saved = await res.json();
      setProjects((p) => [saved, ...p]);
      setForm({ title: "", description: "", link: "" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div  className="mx-auto py-6 relative">
      <div className="tech-bg absolute inset-0 -z-10" />
      <div className="color-swirl" aria-hidden />

      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-100">
        My <span className="text-teal-300">Projects</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 project-grid">
        {projects.length === 0 && (
          <div className="text-gray-400">No projects yet.</div>
        )}

        {projects.map((p) => (
          <article
            key={p.id || p.title}
            className="project-card overflow-hidden rounded-2xl shadow-2xl hover:shadow-[0_30px_80px_rgba(3,10,20,0.6)] transition-shadow duration-300 cursor-pointer"
            onClick={() => setModal(p.image)}
          >
            {p.image && (
              <div className="project-hero-frame relative">
                <div className="project-hero relative bg-gradient-to-br from-slate-800 to-slate-900">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="object-cover w-full h-64 md:h-80 rounded-t-xl"
                  />
                  {p.status && (
                    <span className="absolute top-3 right-3 bg-black/40 text-sm text-gray-100 px-3 py-1 rounded-full backdrop-blur">
                      {p.status}
                    </span>
                  )}
                </div>
              </div>
            )}
            <div className="p-6 bg-[rgba(6,10,18,0.55)] text-gray-100">
              <h3 className="text-2xl font-semibold mb-2 project-title">
                {p.title}
              </h3>
              <div className="text-sm text-gray-300 mb-3">
                {p.year && <span>{p.year} • </span>}
                {p.description}
              </div>
              {p.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-[rgba(5,150,150,0.08)] border border-[rgba(5,150,150,0.12)] px-3 py-1 rounded-full text-teal-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Add Project Form */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold mb-2">Add Project</h4>
        <form
          onSubmit={submit}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          <input
            className="p-2 bg-gray-700 text-gray-200 rounded col-span-1 md:col-span-1"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className="p-2 bg-gray-700 text-gray-200 rounded col-span-1 md:col-span-1"
            placeholder="Image URL (optional)"
            value={form.image || ""}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <input
            className="p-2 bg-gray-700 text-gray-200 rounded col-span-1 md:col-span-1"
            placeholder="Link (optional)"
            value={form.link || ""}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
          />
          <textarea
            className="p-2 bg-gray-700 text-gray-200 rounded md:col-span-3"
            placeholder="Short description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <div className="md:col-span-3 text-right">
            <button
              disabled={loading}
              className="px-4 py-2 bg-yellow-400 text-black rounded"
            >
              {loading ? "Adding..." : "Add Project"}
            </button>
          </div>
        </form>
      </div>

      {/* Image Modal */}
      {modal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-zoom-out"
          onClick={() => setModal(null)}
        >
          <img
            src={modal}
            alt="Project"
            className="max-h-[90%] max-w-[90%] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
