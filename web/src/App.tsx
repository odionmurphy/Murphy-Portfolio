




import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Skills from "./pages/Skills";
import AdminContacts from "./pages/AdminContacts";
import Typing from "./components/Typing";
import "./App.css";

type Route = "home" | "projects" | "contact" | "admin";

export default function App() {
  const [route, setRoute] = useState<Route>("home");

  useEffect(() => {
    function onHash() {
      const h = location.hash.replace("#", "");
      if (h === "projects" || h === "contact" || h === "admin") {
        setRoute(h as Route);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setRoute("home");
        requestAnimationFrame(() => {
          const id = h || "home";
          const el = document.getElementById(id);
          el?.scrollIntoView({ behavior: "smooth" });
        });
      }
    }
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    // Neon trailing smoke cursor
    function handleMove(e: MouseEvent) {
      for (let i = 0; i < 3; i++) {
        const el = document.createElement("div");
        el.className = "cursor-smoke-neon";
        const size = 4 + Math.random() * 8;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.left = `${e.clientX + Math.random() * 12 - 6}px`;
        el.style.top = `${e.clientY + Math.random() * 12 - 6}px`;
        el.style.background = `radial-gradient(circle, hsl(${Math.random() * 360}, 100%, 70%), transparent)`;
        document.body.appendChild(el);

        el.animate(
          [
            { transform: "translateY(0) scale(1)", opacity: 1 },
            { transform: "translateY(-60px) scale(0.2)", opacity: 0 },
          ],
          { duration: 1200, easing: "ease-out" },
        );

        setTimeout(() => el.remove(), 1200);
      }
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section >
    <div  className="min-h-screen flex flex-col relative overflow-hidden bg-gray-900 text-white">
      <Nav />
      <main  className="container mx-auto p-6 flex-1 relative z-10">
        {route === "home" && (
          <div className="space-y-12">
            {/* Hero Section */}
            <section
              id="home"
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-3 flex items-baseline gap-3">
                  <span className="hero-junior text-5xl md:text-6xl animate-bounce-neon">
                    Junior
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 opacity-90">
                    Frontend Developer
                  </span>
                </h1>
                <p className="text-gray-300 mb-6 max-w-xl">
                  <Typing
                    text={
                      "Frontend-focused developer building modern UIs, with a growing interest and hands-on experience in backend technologies like Node.js and lightweight databases. Passionate about crafting seamless user experiences and learning full-stack development."
                    }
                  />
                </p>
                <div className="space-x-3">
                  <a
                    href="#projects"
                    className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-black rounded-md shadow-lg hover:scale-105 hover:shadow-yellow-400 transition-transform duration-300"
                  >
                    View Projects
                  </a>
                  <a
                    href="#contact"
                    className="inline-block px-4 py-2 border border-gray-600 rounded-md text-gray-200 hover:border-yellow-400 hover:text-yellow-400 transition-all"
                  >
                    Contact
                  </a>
                  <a
                    href="usu-Resume-.pdf"
                    className="inline-block px-4 py-2   border border-yellow-400 rounded-md text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors duration-300"
                  >
                    Download CV
                  </a>
                </div>
              </div>

              <div className="flex justify-center md:justify-end">
                <div className="avatar-ring w-40 h-40 rounded-full bg-gradient-to-br from-pink-400 to-yellow-400 p-1">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-white font-bold avatar-core">
                    MP
                  </div>
                </div>
              </div>
            </section>

            {/* About Me Section */}
            <section
              id="about"
              className="   max-w-6xl mx-auto mt-12 "
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Info & Avatar */}
                <aside className="md:col-span-1">
                  <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.02)] rounded-2xl p-6 shadow-lg glow-section">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-36 h-36 rounded-full avatar-ring p-1 bg-gradient-to-br from-pink-400 to-yellow-400 mb-4">
                        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center avatar-core overflow-hidden">
                          <img
                            src="/murph.png"
                            alt="Murphy avatar"
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold">
                        Murphy Portfolio
                      </h3>
                      <div className="text-sm text-yellow-300 mt-1">
                        <strong>JUNIOR</strong> Frontend Developer
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="p-3 bg-[rgba(255,255,255,0.02)] rounded-md">
                        <div className="text-xs text-gray-300">EMAIL</div>
                        <div className="text-sm text-gray-200">
                          smithcelestine430@gmail.com
                        </div>
                      </div>
                      <div className="p-3 bg-[rgba(255,255,255,0.02)] rounded-md">
                        <div className="text-xs text-gray-300">INSTAGRAM</div>
                        <div className="text-sm text-gray-200">
                          @murphyportfolio
                        </div>
                      </div>
                      <div className="p-3 bg-[rgba(255,255,255,0.02)] rounded-md">
                        <div className="text-xs text-gray-300">LOCATION</div>
                        <div className="text-sm text-gray-200">Germany</div>
                      </div>
                      <div className="mt-4 flex items-center justify-center gap-4 text-gray-300">
                        <a
                          href="https://github.com/odionmurphy"
                          className="hover:text-yellow-400"
                        >
                          GitHub
                        </a>
                        <a
                          href="https://www.linkedin.com/in/murphy-usunobun-5a159a226/"
                          className="hover:text-yellow-400"
                        >
                          LinkedIn
                        </a>
                        <a href="#" className="hover:text-yellow-400">
                          Email
                        </a>
                      </div>
                    </div>
                  </div>
                </aside>

                {/* About / Skills Marquee */}
                <div className="md:col-span-2">
                  <div className="p-6 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] rounded-2xl glow-section">
                    <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-yellow-400 to-pink-400 text-transparent bg-clip-text">
                      About Me
                    </h2>
                    <p className="text-gray-300 mb-6">
                      I'm a junior frontend developer who loves building
                      responsive and user-friendly web apps. I have experience
                      with React,JavaScript, TypeScript, Tailwind CSS,PHP,
                      PostgresSQL and Docker, and I'm looking for opportunities
                      to grow and build real-world products with a great
                      team."{" "}
                    </p>

                    <h3 className="text-xl font-semibold mb-4">
                      What I'm Doing
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-[rgba(255,255,255,0.01)] rounded-lg">
                        <div className="font-semibold text-gray-100">
                          Mobile Apps
                        </div>
                        <div className="text-sm text-gray-300">
                          Professional development of mobile-friendly
                          interfaces.
                        </div>
                      </div>
                      <div className="p-4 bg-[rgba(255,255,255,0.01)] rounded-lg">
                        <div className="font-semibold text-gray-100">
                          Web Development
                        </div>
                        <div className="text-sm text-gray-300">
                          Building performant, accessible frontend experiences.
                        </div>
                      </div>
                      <div className="p-4 bg-[rgba(255,255,255,0.01)] rounded-lg">
                        <div className="font-semibold text-gray-100">
                          UI/UX Design
                        </div>
                        <div className="text-sm text-gray-300">
                          Designing clear, user-centered interfaces.
                        </div>
                      </div>
                      <div className="p-4 bg-[rgba(255,255,255,0.01)] rounded-lg">
                        <div className="font-semibold text-gray-100">
                          Backend Integration
                        </div>
                        <div className="text-sm text-gray-300">
                          Integrating APIs and lightweight persistence.
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Soft Skill</h3>
                    <div className="skill-marquee relative overflow-hidden w-full">
                      <div className="skill-track flex gap-6">
                        {[
                          "Problem Solving",
                          "Teamwork",
                          "Time Management",
                          "Communication",
                          "Adaptability",
                          "Attention to Detail",
                          "Critical thinking",
                          "Emotional awareness",
                          "Self-motivation",
                          "Willingness to learn",
                        ].map((s, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-center justify-center gap-2 w-24 h-24 skill-card"
                          >
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white text-sm">
                              {s[0]}
                            </div>
                            <div className="text-xs text-gray-300">{s}</div>
                          </div>
                        ))}
                        {/* repeat for smooth looping */}
                        {[
                          "Time management",
                          "Good communication",
                          "Problem-solving",
                          "Teamwork",
                          "Adaptability",
                          "Critical thinking",
                          "Emotional awareness",
                          "Willingness to learn",
                          "Attention to detail",
                          "Self-motivation",
                          "Figma",
                        ].map((s, i) => (
                          <div
                            key={`copy-${i}`}
                            className="flex flex-col items-center justify-center gap-2 w-24 h-24 skill-card"
                          >
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white text-sm">
                              {s[0]}
                            </div>
                            <div className="text-xs text-gray-300">{s}</div>
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

      <footer className="site-footer text-center p-6 text-sm">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Murphy — Built with React & Tailwind
          </div>
          <div className="space-x-3">
            <a href="#projects" className="text-green-400 hover:underline">
              Projects
            </a>
            <a href="#contact" className="text-gray-300 hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
    </section>
  );
}
