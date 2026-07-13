import React, { useEffect, useState, useCallback } from "react";
import Nav from "./components/Nav";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Skills from "./pages/Skills";
import Typing from "./components/Typing";
import "./App.css";

const CVViewer = React.lazy(() => import("./components/CVViewer"));

export type Route = "home" | "projects" | "contact";

export function getRouteFromHash(hash: string): Route {
  const h = hash.replace("#", "");
  if (h === "projects" || h === "contact") return h as Route;
  return "home";
}

export function isPageRoute(route: Route): boolean {
  return route === "projects" || route === "contact";
}

const SOFT_SKILLS = [
  "Problem Solving",
  "Teamwork",
  "Time Management",
  "Communication",
  "Adaptability",
  "Attention to Detail",
  "Critical Thinking",
  "Emotional Awareness",
  "Self-motivation",
  "Willingness to Learn",
];

const WHAT_I_DO = [
  { title: "Frontend Development", desc: "Building responsive UIs with React, Next.js, and Vue.js." },
  { title: "Backend Development", desc: "Node.js, Express.js, and PHP REST APIs backed by PostgreSQL and MongoDB." },
  { title: "Workflow Automation", desc: "AI-powered business pipelines with n8n, Zapier, Make.com, and Airtable." },
  { title: "REST API Integration", desc: "Designing schemas and endpoints for full-stack CRUD applications." },
];

const EXPERIENCE = [
  {
    role: "Frontend Developer Intern",
    company: "Show Not Tell",
    location: "Bremen, Germany",
    period: "03/2026 – 05/2026",
    points: [
      "Contributed to a team effort rebuilding and optimizing client production websites using React and Next.js to improve performance and UI/UX",
      "Designed and deployed automated business pipelines utilizing n8n, Zapier, and Make.com to reduce manual administration",
      "Collaborated closely with the design and development teams to translate wireframes into high-quality, responsive code",
    ],
  },
  {
    role: "Warehouse Forklift Operator",
    company: "MPG Logistics",
    location: "Menden, Germany",
    period: "07/2021 – 12/2023",
    points: [
      "Managed warehouse logistics operations in a fast-paced environment",
      "Ensured efficient loading, unloading, and storage of goods",
    ],
  },
  {
    role: "Business Assistant",
    company: "Odia Factory",
    location: "Benin City, Nigeria",
    period: "07/2009 – 07/2015",
    points: ["Assisted in day-to-day business operations and administrative tasks"],
  },
];

const EDUCATION = [
  {
    title: "AI and Automation Training",
    org: "DCI Digital Career Institute GmbH",
    location: "Berlin, Germany",
    period: "10/2025 – 10/2026",
  },
  {
    title: "Full-Stack Developer Program",
    org: "DCI Digital Career Institute GmbH",
    location: "Berlin, Germany",
    period: "07/2024 – 05/2026",
  },
  {
    title: "Biology",
    org: "Edo Technical College",
    location: "Benin City, Nigeria",
    period: "2005 – 2009",
  },
];

export default function App() {
  const [route, setRoute] = useState<Route>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);

  const handleHash = useCallback(() => {
    const h = location.hash.replace("#", "");
    const newRoute = getRouteFromHash(location.hash);
    setRoute(newRoute);
    if (newRoute !== "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      requestAnimationFrame(() => {
        const el = document.getElementById(h || "home");
        el?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, []);

  useEffect(() => {
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [handleHash]);

  return (
    <section>
      <div className="min-h-screen flex flex-col relative overflow-hidden bg-gray-900 text-white">
        <Nav />

        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="md:hidden absolute top-3 right-4 z-50 p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
          onClick={() => setMenuOpen((o) => !o)}
          data-testid="mobile-menu-toggle"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {menuOpen && (
          <nav
            data-testid="mobile-nav"
            className="md:hidden fixed inset-0 z-40 bg-gray-900/95 backdrop-blur flex flex-col items-center justify-center gap-8 text-xl"
          >
            {(["home", "projects", "contact"] as const).map((r) => (
              <a
                key={r}
                href={"#" + r}
                className="capitalize text-gray-200 hover:text-blue-400 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {r}
              </a>
            ))}
          </nav>
        )}

        <main className="container mx-auto px-4 sm:px-6 p-6 flex-1 relative z-10">
          {route === "home" && (
            <div className="space-y-10 sm:space-y-12">
              <section
                id="home"
                data-testid="hero-section"
                className="hero-section relative pt-8 sm:pt-4 pb-2"
              >
                <div className="hero-glow" aria-hidden="true" />
                <div className="max-w-3xl mx-auto text-center relative z-10">
                  <span className="inline-block px-3 py-1 mb-5 text-[11px] sm:text-xs font-semibold tracking-wide uppercase text-blue-300 bg-blue-500/10 border border-blue-400/30 rounded-full">
                    Open to new developer roles
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
                    Murphy Odion Usunobun
                  </h1>
                  <p className="text-lg sm:text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    Frontend-Focused Full-Stack Developer
                  </p>
                  <p className="text-gray-300 mb-7 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                    <Typing text="Results-driven Full-Stack Developer with hands-on experience rebuilding production websites and engineering business automation pipelines. I recently completed a Frontend Developer internship at Show Not Tell, leveraging React, Next.js, and low-code tools like n8n, Zapier, and Make.com to streamline operations." />
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <a href="#projects" className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-400 hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                      View Projects
                    </a>
                    <a href="#contact" className="inline-block px-4 py-2 border border-blue-400/50 text-blue-300 rounded-md hover:bg-blue-500/10 hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                      Contact
                    </a>
                    <button onClick={() => setCvOpen(true)} className="inline-block px-4 py-2 border border-blue-400/50 text-blue-300 rounded-md hover:bg-blue-500/10 hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                      Checkout CV
                    </button>
                  </div>
                </div>
              </section>

              <section id="about" data-testid="about-section" className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  <aside className="md:col-span-1">
                    <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5 sm:p-6 shadow-lg glow-section">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full avatar-ring p-1 bg-gradient-to-br from-blue-500 to-cyan-400 mb-4">
                          <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center avatar-core overflow-hidden">
                            <img src="/murph.png" alt="Murphy avatar" className="w-full h-full object-cover rounded-full" />
                          </div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold">Murphy Odion Usunobun</h3>
                        <div className="text-xs sm:text-sm text-blue-300 mt-1">
                          <strong>Web Developer</strong>
                        </div>
                      </div>
                      <div className="mt-5 space-y-3">
                        {[
                          { label: "EMAIL", value: "djmurphy041@gmail.com" },
                          { label: "PHONE", value: "+49 15217744404" },
                          { label: "LOCATION", value: "Menden (Sauerland), Germany" },
                        ].map(({ label, value }) => (
                          <div key={label} className="p-3 bg-[rgba(255,255,255,0.02)] rounded-md">
                            <div className="text-xs text-gray-400">{label}</div>
                            <div className="text-xs sm:text-sm text-gray-200 break-all">{value}</div>
                          </div>
                        ))}
                        <div className="mt-4 flex items-center justify-center gap-4 text-gray-300 flex-wrap">
                          <a href="https://github.com/odionmurphy" target="_blank" rel="noreferrer" className="hover:text-blue-400 text-sm transition-colors">GitHub</a>
                          <a href="https://linkedin.com/in/odionmurphy" target="_blank" rel="noreferrer" className="hover:text-blue-400 text-sm transition-colors">LinkedIn</a>
                          <a href="#contact" className="hover:text-blue-400 text-sm transition-colors">Email</a>
                        </div>
                      </div>
                    </div>
                  </aside>

                  <div className="md:col-span-2">
                    <div className="p-5 sm:p-6 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] rounded-2xl glow-section">
                      <h2 className="text-xl sm:text-2xl font-semibold mb-3 bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
                        About Me
                      </h2>
                      <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">
                        Equipped with a rigorous, two-year Full-Stack training foundation from the
                        Digital Career Institute and specialized expertise in AI-driven process
                        automation, I focus on writing clean, efficient code, building robust APIs,
                        and creating seamless user experiences. From production websites to backend
                        systems and automation pipelines, I care about how things work under the
                        hood, not just how they look, and I'm ready to bring that mindset to a
                        collaborative team.
                      </p>
                      <h3 className="text-lg sm:text-xl font-semibold mb-4">What I'm Doing</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                        {WHAT_I_DO.map(({ title, desc }) => (
                          <div key={title} className="p-3 sm:p-4 bg-[rgba(255,255,255,0.01)] rounded-lg">
                            <div className="font-semibold text-gray-100 text-sm sm:text-base">{title}</div>
                            <div className="text-xs sm:text-sm text-gray-300 mt-1">{desc}</div>
                          </div>
                        ))}
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-4">Soft Skills</h3>
                      <div className="skill-marquee relative overflow-hidden w-full" aria-label="Soft skills carousel">
                        <div className="skill-track flex gap-4 sm:gap-6">
                          {[...SOFT_SKILLS, ...SOFT_SKILLS].map((s, i) => (
                            <div key={i} className="flex flex-col items-center justify-center gap-1 sm:gap-2 w-20 sm:w-24 h-20 sm:h-24 skill-card flex-shrink-0">
                              <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white text-sm">
                                {s[0]}
                              </div>
                              <div className="text-[10px] sm:text-xs text-gray-300 text-center leading-tight">{s}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="experience" data-testid="experience-section" className="max-w-6xl mx-auto">
                <div className="p-5 sm:p-6 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] rounded-2xl glow-section">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-5 bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
                    Work Experience
                  </h2>
                  <div className="space-y-5">
                    {EXPERIENCE.map((e) => (
                      <div key={e.role} className="p-3 sm:p-4 bg-[rgba(255,255,255,0.01)] rounded-lg">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <div className="font-semibold text-gray-100 text-sm sm:text-base">
                            {e.role} <span className="text-gray-400 font-normal">— {e.company}</span>
                          </div>
                          <div className="text-xs text-blue-300 whitespace-nowrap">{e.period}</div>
                        </div>
                        <div className="text-xs text-gray-400 mb-2">{e.location}</div>
                        <ul className="text-xs sm:text-sm text-gray-300 space-y-1 list-disc list-inside">
                          {e.points.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="education" data-testid="education-section" className="max-w-6xl mx-auto">
                <div className="p-5 sm:p-6 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] rounded-2xl glow-section">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-5 bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
                    Education
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {EDUCATION.map((ed) => (
                      <div key={ed.title} className="p-3 sm:p-4 bg-[rgba(255,255,255,0.01)] rounded-lg">
                        <div className="font-semibold text-gray-100 text-sm sm:text-base">{ed.title}</div>
                        <div className="text-xs sm:text-sm text-gray-300 mt-1">{ed.org}</div>
                        <div className="text-xs text-gray-400 mt-1">{ed.location}</div>
                        <div className="text-xs text-blue-300 mt-1">{ed.period}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="skills" className="glow-section">
                <Skills />
              </section>
            </div>
          )}

          {route === "projects" && <Projects />}
          {route === "contact" && <Contact />}
        </main>

        <footer className="site-footer text-center p-4 sm:p-6 text-xs sm:text-sm">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div>© {new Date().getFullYear()} Murphy Odion Usunobun — Built with React & TypeScript</div>
            <div className="flex gap-4">
              <a href="#projects" className="text-green-400 hover:underline">Projects</a>
              <a href="#contact" className="text-gray-300 hover:underline">Contact</a>
            </div>
          </div>
        </footer>

        {cvOpen && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setCvOpen(false)}
          >
            <div
              className="relative w-full max-w-4xl h-[90vh] mx-4 rounded-xl overflow-hidden shadow-2xl border border-gray-700 bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
                <span className="text-sm text-gray-300 font-medium">Murphy CV</span>
                <button onClick={() => setCvOpen(false)} className="text-gray-400 hover:text-white text-xl">
                  ✕
                </button>
              </div>
              <React.Suspense fallback={<div className="p-6 text-sm text-gray-600">Loading CV…</div>}>
                <CVViewer src="/Murphy_Odion_Usunobun_FlowCV_Resume_2026-07-13.pdf" />
              </React.Suspense>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}