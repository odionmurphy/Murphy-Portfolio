import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";

vi.mock("./components/Nav", () => ({
  default: () => <nav data-testid="nav">Nav</nav>,
}));
vi.mock("./components/Typing", () => ({
  default: ({ text }: { text: string }) => <span>{text}</span>,
}));
vi.mock("./pages/Projects", () => ({
  default: () => <div data-testid="projects-page">Projects</div>,
}));
vi.mock("./pages/Contact", () => ({
  default: () => <div data-testid="contact-page">Contact</div>,
}));
vi.mock("./pages/Skills", () => ({
  default: () => <div data-testid="skills-section">Skills</div>,
}));
vi.mock("./components/CVViewer", () => ({
  default: () => <div data-testid="cv-viewer">CV</div>,
}));
vi.mock("./App.css", () => ({}));

import App, { getRouteFromHash, isPageRoute } from "./App";

describe("getRouteFromHash", () => {
  it("returns 'projects' for #projects", () =>
    expect(getRouteFromHash("#projects")).toBe("projects"));
  it("returns 'contact' for #contact", () =>
    expect(getRouteFromHash("#contact")).toBe("contact"));
  it("returns 'home' for unknown hash", () =>
    expect(getRouteFromHash("#about")).toBe("home"));
  it("returns 'home' for empty string", () =>
    expect(getRouteFromHash("")).toBe("home"));
});

describe("isPageRoute", () => {
  it("true for projects", () => expect(isPageRoute("projects")).toBe(true));
  it("true for contact", () => expect(isPageRoute("contact")).toBe(true));
  it("false for home", () => expect(isPageRoute("home")).toBe(false));
});

beforeEach(() => {
  window.location.hash = "";
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe("App — home render", () => {
  it("renders Nav", () => {
    render(<App />);
    expect(screen.getByTestId("nav")).toBeInTheDocument();
  });
  it("renders hero section", () => {
    render(<App />);
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
  });
  it("renders about section", () => {
    render(<App />);
    expect(screen.getByTestId("about-section")).toBeInTheDocument();
  });
  it("renders experience section", () => {
    render(<App />);
    expect(screen.getByTestId("experience-section")).toBeInTheDocument();
  });
  it("renders education section", () => {
    render(<App />);
    expect(screen.getByTestId("education-section")).toBeInTheDocument();
  });
  it("renders Skills", () => {
    render(<App />);
    expect(screen.getByTestId("skills-section")).toBeInTheDocument();
  });
  it("does NOT render Projects page", () => {
    render(<App />);
    expect(screen.queryByTestId("projects-page")).not.toBeInTheDocument();
  });
  it("renders footer with current year", () => {
    render(<App />);
    const footer = document.querySelector("footer");
    expect(footer?.textContent).toContain(new Date().getFullYear().toString());
  });

  it("renders a standard footer with availability text", () => {
    render(<App />);
    const footer = document.querySelector("footer");
    expect(footer?.textContent).toContain(
      "Available for freelance and full-time opportunities.",
    );
  });
});

describe("App — hash routing", () => {
  it("renders Projects page on #projects", async () => {
    window.location.hash = "#projects";
    render(<App />);
    await act(async () => {
      fireEvent(window, new HashChangeEvent("hashchange"));
    });
    expect(screen.getByTestId("projects-page")).toBeInTheDocument();
  });
  it("renders Contact page on #contact", async () => {
    window.location.hash = "#contact";
    render(<App />);
    await act(async () => {
      fireEvent(window, new HashChangeEvent("hashchange"));
    });
    expect(screen.getByTestId("contact-page")).toBeInTheDocument();
  });
});

describe("App — mobile menu", () => {
  it("toggle button is in the DOM", () => {
    render(<App />);
    expect(screen.getByTestId("mobile-menu-toggle")).toBeInTheDocument();
  });
  it("drawer is hidden by default", () => {
    render(<App />);
    expect(screen.queryByTestId("mobile-nav")).not.toBeInTheDocument();
  });
  it("clicking toggle opens drawer", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("mobile-menu-toggle"));
    expect(screen.getByTestId("mobile-nav")).toBeInTheDocument();
  });
  it("clicking toggle twice closes drawer", () => {
    render(<App />);
    const btn = screen.getByTestId("mobile-menu-toggle");
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(screen.queryByTestId("mobile-nav")).not.toBeInTheDocument();
  });
  it("aria-expanded is false when closed", () => {
    render(<App />);
    expect(screen.getByTestId("mobile-menu-toggle")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
  it("aria-expanded is true when open", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("mobile-menu-toggle"));
    expect(screen.getByTestId("mobile-menu-toggle")).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });
  it("clicking a nav link closes the drawer", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("mobile-menu-toggle"));
    const link = screen
      .getByTestId("mobile-nav")
      .querySelector('a[href="#home"]');
    fireEvent.click(link!);
    expect(screen.queryByTestId("mobile-nav")).not.toBeInTheDocument();
  });
});

describe("App — CV modal", () => {
  it("does not render the CV modal by default", () => {
    render(<App />);
    expect(screen.queryByTestId("cv-viewer")).not.toBeInTheDocument();
  });
  it("opens the CV modal when 'Checkout CV' is clicked", async () => {
    render(<App />);
    fireEvent.click(screen.getByText("Checkout CV"));
    expect(await screen.findByTestId("cv-viewer")).toBeInTheDocument();
  });
});

describe("App — accessibility", () => {
  it("toggle has aria-label", () => {
    render(<App />);
    expect(screen.getByTestId("mobile-menu-toggle")).toHaveAttribute(
      "aria-label",
    );
  });
  it("has an h1", () => {
    render(<App />);
    expect(document.querySelector("h1")).toBeInTheDocument();
  });
  it("has a footer", () => {
    render(<App />);
    expect(document.querySelector("footer")).toBeInTheDocument();
  });
  it("avatar image has alt text", () => {
    render(<App />);
    expect(screen.getByAltText(/Murphy avatar/i)).toBeInTheDocument();
  });
});
