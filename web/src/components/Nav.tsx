import React from "react";
import "./Nav.css";

export default function Nav() {
  const links = [
    { href: "#", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
  ];

  function isActive(href: string) {
    const current = location.hash || "#";
    return href === "#" ? current === "#" : current === href;
  }

  return (
    <header className="nav-header">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-left">
            
            <div className="w-[42px] h-[42px] rounded-xl bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center font-black text-sm tracking-wide shadow-[0_0_12px_rgba(20,184,166,0.6),0_0_24px_rgba(6,182,212,0.4)]">
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
    MP
  </span>
</div>
       
          <div className="nav-title">
            <div className="nav-name">Murphy Portfolio</div>
            <div className="nav-role"> Frontend Developer</div>
          </div>
        </div>

        {/* Links */}
        <nav className="nav-links" aria-label="Main navigation">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link ${isActive(l.href) ? "active" : ""}`}
              aria-current={isActive(l.href) ? "page" : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
