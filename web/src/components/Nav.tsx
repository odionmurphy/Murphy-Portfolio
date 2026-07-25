import React, { useEffect, useState } from "react";
import "./Nav.css";

export default function Nav() {
  const [currentHash, setCurrentHash] = useState(
    () => window.location.hash || "#",
  );

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash || "#");
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const links = [
    { href: "#", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
  ];

  function isActive(href: string) {
    return href === "#" ? currentHash === "#" : currentHash === href;
  }

  return (
    <header className="nav-header">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-left">
          <a href="#" className="nav-logo" aria-label="Home">
            <span>MP</span>
          </a>

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
