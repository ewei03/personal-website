import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { profile, links } from "../content/site.js";
import { Moon, Sun } from "./Icons.jsx";

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  };
  return (
    <button className="theme-toggle" type="button" aria-label="Toggle dark mode" onClick={toggle}>
      <Moon /><Sun />
    </button>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onHome = location.pathname === "/";
  const section = (id) => ({ pathname: "/", hash: `#${id}` });
  const isSection = (id) => onHome && location.hash === `#${id}`;

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}${open ? " nav-open" : ""}`}>
      <nav className="container nav" aria-label="Main">
        <Link className="brand" to="/"><span className="brand-mark">E</span>{profile.name}</Link>
        <ul className="nav-links">
          <li><Link to={section("experience")} aria-current={isSection("experience") ? "page" : undefined}>Experience</Link></li>
          <li><Link to={section("projects")} aria-current={isSection("projects") ? "page" : undefined}>Projects</Link></li>
          <li><Link to={section("hobbies")} aria-current={isSection("hobbies") ? "page" : undefined}>Hobbies</Link></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
        <div className="nav-actions">
          <ThemeToggle />
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <figure className="container verse">
        <blockquote>“Cast all your anxiety on him because he cares for you.”</blockquote>
        <figcaption>1 Peter 5:7</figcaption>
      </figure>
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} {profile.name} · Last updated November 4, 2026</span>
        <div className="footer-links">
          <a href={links.github.url} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={links.linkedin.url} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

/** Scroll to top on navigation, or to #hash if present. */
function useScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth" }); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
}

/** Fade elements with .reveal / .job in as they enter the viewport
 *  (including ones rendered later, e.g. after filtering the blog). */
function useReveal() {
  useEffect(() => {
    const pending = () => document.querySelectorAll(".reveal:not(.in-view), .job:not(.in-view)");
    if (reduceMotion() || !("IntersectionObserver" in window)) {
      const showAll = () => pending().forEach((el) => el.classList.add("in-view"));
      showAll();
      const mo = new MutationObserver(showAll);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }
    const timers = [];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("in-view");
        io.unobserve(el);
        // drop the stagger delay once revealed so hover effects respond instantly
        const i = parseFloat(getComputedStyle(el).getPropertyValue("--i")) || 0;
        timers.push(setTimeout(() => { el.style.transitionDelay = "0s"; }, 1000 + i * 90));
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    const observeAll = () => pending().forEach((el) => io.observe(el));
    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { mo.disconnect(); io.disconnect(); timers.forEach(clearTimeout); };
  }, []);
}

/** Gentle pointer parallax on the hero blobs. */
function useBlobParallax() {
  useEffect(() => {
    if (reduceMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      document.querySelectorAll(".hero-bg").forEach((b) => { b.style.transform = `translate(${x}px, ${y}px)`; });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
}

export default function Layout() {
  useScrollManager();
  useReveal();
  useBlobParallax();
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
    </>
  );
}
