





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
          <div className="nav-logo">MP</div>
          <div className="nav-title">
            <div className="nav-name">Murphy Portfolio</div>
            <div className="nav-role">Junior Frontend Developer</div>
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
