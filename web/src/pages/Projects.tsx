import React, { useState } from "react";
import "./Projects.css";

type Project = {
  id: number;
  title: string;
  description: string;
  link?: string;
  image?: string;
  tags: string[];
  year: number | string;
  status?: string;
};

const projects: Project[] = [
  {
    id: 0,
    title: "JOM — Mechanic Workshop App",
    description:
      "Co-built a full-stack automobile workshop management app with a three-person team: user authentication, booking system, mechanic profiles, car brand listings, admin dashboard, and contact form.",
    link: "https://jom-gamma.vercel.app/",
    image: "jom.png",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "REST API", "Team Project"],
    year: 2026,
    status: "Live",
  },
  {
    id: 1,
    title: "SoundSnap — Music Recognition",
    description:
      "A React Native mobile application that identifies music playing around the user in real time.",
    image: "soundsnap-home.png",
    tags: ["React Native", "Expo", "Node.js", "Railway", "REST API"],
    year: 2026,
    status: "Live",
  },
  {
    id: 2,
    title: "ShopHUD — E-Commerce Web Application",
    description:
      "A responsive e-commerce frontend with reusable UI components and product pages, integrating REST APIs to retrieve product data across desktop and mobile layouts.",
    link: "https://shophud-frontend.onrender.com/",
    image: "shop.png",
    tags: ["React", "TypeScript", "REST API", "Responsive Design"],
    year: 2025,
  },
  {
    id: 3,
    title: "Business Workflow Automation Tool",
    description:
      "Designed and deployed automated business workflows using n8n, with AI-powered pipelines to reduce manual data processing and third-party API integrations across multi-step business processes.",
    tags: ["n8n", "Workflow Automation", "AI Automation", "REST API"],
    year: 2025,
  },
  {
    id: 4,
    title: "Developer Portfolio Website",
    description:
      "A personal developer portfolio showcasing projects with responsive design and modern UI components, deployed on cloud hosting.",
    link: "https://murphy1.onrender.com/",
    image: "murphy.png",
    tags: ["React", "Vite", "TypeScript", "Responsive Design"],
    year: 2026,
  },
];

export default function Projects() {
  const [modal, setModal] = useState<string | null>(null);

  return (
    <div className="mx-auto py-6 relative">
      <div className="tech-bg absolute inset-0 -z-10" />
      <div className="color-swirl" aria-hidden />
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-100">
        My <span className="text-blue-300">Projects</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 project-grid">
        {projects.map((p) => (
          <article
            key={p.id}
            className="project-card overflow-hidden rounded-2xl shadow-2xl hover:shadow-[0_30px_80px_rgba(3,10,20,0.6)] transition-shadow duration-300 cursor-pointer"
            onClick={() => p.image && setModal(p.image)}
          >
            {p.image && (
              <div className="project-hero-frame relative">
                <div className="project-hero relative bg-gradient-to-br from-slate-800 to-slate-900">
                  <img src={p.image} alt={p.title} className="object-cover w-full h-64 md:h-80 rounded-t-xl" />
                  {p.status && (
                    <span className="absolute top-3 right-3 bg-black/40 text-sm text-gray-100 px-3 py-1 rounded-full backdrop-blur">
                      {p.status}
                    </span>
                  )}
                </div>
              </div>
            )}
            <div className="p-6 bg-[rgba(6,10,18,0.55)] text-gray-100">
              <h3 className="text-2xl font-semibold mb-2 project-title">{p.title}</h3>
              <div className="text-sm text-gray-300 mb-3">
                {p.year && <span>{p.year} • </span>}
                {p.description}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.2)] px-3 py-1 rounded-full text-blue-200">
                    {t}
                  </span>
                ))}
              </div>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-colors"
                >
                  View Project
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      {modal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-zoom-out" onClick={() => setModal(null)}>
          <img src={modal} alt="Project" className="max-h-[90%] max-w-[90%] rounded-xl shadow-2xl" />
        </div>
      )}
    </div>
  );
}
