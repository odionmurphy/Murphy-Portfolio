import React, { useEffect, useState, useCallback } from "react";
import Nav from "./components/Nav";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Skills from "./pages/Skills";
import AdminContacts from "./pages/AdminContacts";
import Typing from "./components/Typing";
import "./App.css";

export type Route = "home" | "projects" | "contact" | "admin";

export function getRouteFromHash(hash: string): Route {
  const h = hash.replace("#", "");
  if (h === "projects" || h === "contact" || h === "admin") return h as Route;
  return "home";
}

export function isPageRoute(route: Route): boolean {
  return route === "projects" || route === "contact" || route === "admin";
}

const SOFT_SKILLS = [
  "Problem Solving", "Teamwork", "Time Management", "Communication",
  "Adaptability", "Attention to Detail", "Critical Thinking",
  "Emotional Awareness", "Self-motivation", "Willingness to Learn",
];

const WHAT_I_DO = [
  { title: "Mobile Apps", desc: "Professional development of mobile-friendly interfaces." },
  { title: "Web Development", desc: "Building performant, accessible frontend experiences." },
  { title: "UI/UX Design", desc: "Designing clear, user-centered interfaces." },
  { title: "Backend Integration", desc: "Integrating APIs and lightweight persistence." },
];

export default function App() {
  const [route, setRoute] = useState<Route>("home");
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;
    function handleMove(e: MouseEvent) {
      for (let i = 0; i < 3; i++) {
        const el = document.createElement("div");
        el.className = "cursor-smoke-neon";
        const size = 4 + Math.random() * 8;
        el.style.cssText = `
          position: fixed; pointer-events: none; border-radius: 50%;
          width: ${size}px; height: ${size}px;
          left: ${e.clientX + Math.random() * 12 - 6}px;
          top: ${e.clientY + Math.random() * 12 - 6}px;
          background: radial-gradient(circle, hsl(${Math.random() * 360}, 100%, 70%), transparent);
          z-index: 9999;
        `;
        document.body.appendChild(el);
        el.animate(
          [{ transform: "translateY(0) scale(1)", opacity: 1 },
           { transform: "translateY(-60px) scale(0.2)", opacity: 0 }],
          { duration: 1200, easing: "ease-out" }
        );
        setTimeout(() => el.remove(), 1200);
      }
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

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
              
               <a key={r}
                href={"#" + r}
                className="capitalize text-gray-200 hover:text-yellow-400 transition-colors"
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

              <section id="home" data-testid="hero-section"
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4 sm:pt-0">
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 flex flex-wrap items-baseline gap-2 sm:gap-3">
                    <span className="hero-junior text-4xl sm:text-5xl md:text-6xl animate-bounce-neon">Junior</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 opacity-90">
                      Frontend Developer
                    </span>
                  </h1>
                  <p className="text-gray-300 mb-6 max-w-xl text-sm sm:text-base leading-relaxed">
                    <Typing text="Frontend-focused developer building modern UIs, with a growing interest and hands-on experience in backend technologies like Node.js and lightweight databases. Passionate about crafting seamless user experiences and learning full-stack development." />
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="#projects" className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-black rounded-md shadow-lg hover:scale-105 transition-transform duration-300 text-sm sm:text-base">
                      View Projects
                    </a>
                    <a href="#contact" className="inline-block px-4 py-2  hover:border-yellow-400 hover:text-yellow-400 transition-all text-sm sm:text-base       bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-black rounded-md shadow-lg hover:scale-105 transition-transform duration-300 ">
                      Contact
                    </a>
                    <a href="usu-Resume-.pdf" className="inline-block px-4 py-2 border border-yellow-400 rounded-md text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors duration-300 text-sm sm:text-base">
                      Download CV
                    </a>
                  </div>
                </div>
                <div className="flex justify-center md:justify-end mt-6 md:mt-0">
                  <div className="avatar-ring w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-pink-400 to-yellow-400 p-1">
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-white font-bold avatar-core text-xl sm:text-2xl">
                      MP
                    </div>
                  </div>
                </div>
              </section>

              <section id="about" data-testid="about-section" className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  <aside className="md:col-span-1">
                    <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-5 sm:p-6 shadow-lg glow-section">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full avatar-ring p-1 bg-gradient-to-br from-pink-400 to-yellow-400 mb-4">
                          <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center avatar-core overflow-hidden">
                            <img src="/murph.png" alt="Murphy avatar" className="w-full h-full object-cover rounded-full" />
                          </div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold">Murphy Portfolio</h3>
                        <div className="text-xs sm:text-sm text-yellow-300 mt-1">
                          <strong>JUNIOR</strong> Frontend Developer
                        </div>
                      </div>
                      <div className="mt-5 space-y-3">
                        {[
                          { label: "EMAIL", value: "smithcelestine430@gmail.com" },
                          { label: "INSTAGRAM", value: "@murphyportfolio" },
                          { label: "LOCATION", value: "Germany" },
                        ].map(({ label, value }) => (
                          <div key={label} className="p-3 bg-[rgba(255,255,255,0.02)] rounded-md">
                            <div className="text-xs text-gray-400">{label}</div>
                            <div className="text-xs sm:text-sm text-gray-200 break-all">{value}</div>
                          </div>
                        ))}
                        <div className="mt-4 flex items-center justify-center gap-4 text-gray-300 flex-wrap">
                          <a href="https://github.com/odionmurphy" className="hover:text-yellow-400 text-sm transition-colors">GitHub</a>
                          <a href="https://www.linkedin.com/in/murphy-usunobun-5a159a226/" className="hover:text-yellow-400 text-sm transition-colors">LinkedIn</a>
                          <a href="#contact" className="hover:text-yellow-400 text-sm transition-colors">Email</a>
                        </div>
                      </div>
                    </div>
                  </aside>

                  <div className="md:col-span-2">
                    <div className="p-5 sm:p-6 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] rounded-2xl glow-section">
                      <h2 className="text-xl sm:text-2xl font-semibold mb-3 bg-gradient-to-r from-yellow-400 to-pink-400 text-transparent bg-clip-text">
                        About Me
                      </h2>
                      <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">
                        I'm a junior frontend developer who loves building responsive and user-friendly web apps.
                        I have experience with React, JavaScript, TypeScript, Tailwind CSS, PHP, PostgreSQL and Docker,
                        and I'm looking for opportunities to grow and build real-world products with a great team.
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

              <section id="skills" className="glow-section">
                <Skills />
              </section>
            </div>
          )}

          {route === "projects" && <Projects />}
          {route === "contact" && <Contact />}
          {route === "admin" && <AdminContacts />}
        </main>

        <footer className="site-footer text-center p-4 sm:p-6 text-xs sm:text-sm">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div>© {new Date().getFullYear()} Murphy — Built with React & PostgressSql</div>
            <div className="flex gap-4">
              <a href="#projects" className="text-green-400 hover:underline">Projects</a>
              <a href="#contact" className="text-gray-300 hover:underline">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
} 