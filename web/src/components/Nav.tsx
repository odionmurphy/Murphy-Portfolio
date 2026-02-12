/*
import React from "react";

export default function Nav() {
  const links = [
    { href: "#", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  function isActive(href: string) {
    const current = location.hash || "#";
    if (href === "#about" || href === "#skills") {
      return current === href || current === "#" || current === "";
    }
    return (
      (href === "#" && (current === "#" || current === "")) || current === href
    );
  }

  return (
    <header className="bg-white">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold card">
            MP
          </div>
          <div>
            <div className="text-lg font-semibold">Murphy Portfolio</div>
            <div className="text-xs text-gray-500">Fullstack Engineer</div>
          </div>
        </div>

        <nav aria-label="Main navigation" className="space-x-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={
                "px-3 py-2 rounded text-sm " +
                (isActive(l.href)
                  ? "text-teal-700 font-medium"
                  : "text-gray-600 hover:text-gray-900")
              }
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

*/





import React from "react";
import "./Nav.css";

export default function Nav() {
  const links = [
    { href: "#", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
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
