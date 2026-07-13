import React from "react";
import "./Nav.css";

export default function Nav() {
  const links = [
    { href: "#", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
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
            
            <div className="w-[42px] h-[42px] rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-black text-sm tracking-wide shadow-[0_0_12px_rgba(59,130,246,0.6),0_0_24px_rgba(34,211,238,0.4)]">
  <span className="text-white">
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
