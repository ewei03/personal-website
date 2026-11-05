import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { profile, links } from "../content/site.js";
import PongEasterEgg from "./PongEasterEgg.jsx";

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const HUE_MIN = 150, HUE_MAX = 250, HUE_DEFAULT = 176;

/** Slider that tints the whole palette along a cool spectrum; remembered per visitor. */
function HueSlider() {
  const [hue, setHue] = useState(() => {
    try { return Number(localStorage.getItem("hue")) || HUE_DEFAULT; } catch (e) { return HUE_DEFAULT; }
  });
  const onChange = (e) => {
    const h = Number(e.target.value);
    setHue(h);
    document.documentElement.style.setProperty("--hue", h);
    try { localStorage.setItem("hue", String(h)); } catch (err) {}
  };
  return (
    <input
      type="range"
      className="hue-slider"
      min={HUE_MIN}
      max={HUE_MAX}
      value={hue}
      onChange={onChange}
      onDoubleClick={() => onChange({ target: { value: HUE_DEFAULT } })}
      aria-label="Colour scheme"
      title="Colour scheme (double-click to reset)"
    />
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
        <Link className="brand" to="/"><span className="brand-sig" aria-hidden="true" />{profile.name}</Link>
        <ul className="nav-links">
          <li><Link to={section("experience")} aria-current={isSection("experience") ? "page" : undefined}>Experience</Link></li>
          <li><Link to={section("projects")} aria-current={isSection("projects") ? "page" : undefined}>Projects</Link></li>
          <li><Link to={section("hobbies")} aria-current={isSection("hobbies") ? "page" : undefined}>Hobbies</Link></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
        <div className="nav-actions">
          <HueSlider />
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
      <div className="container footer-inner">
        <span className="footer-meta">© {new Date().getFullYear()} {profile.name}</span>
        <figure className="verse">
          <blockquote>“Cast all your anxiety on him because he cares for you.”</blockquote>
          <figcaption>1 Peter 5:7</figcaption>
        </figure>
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
    if (pathname === "/") return; // home page is a slide deck; it handles #hash itself
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

/**
 * Full-window background: drifting colour blobs (with a gentle pointer parallax) and a soft
 * warm glow centred on the cursor. Mouse/trackpad only; off for reduced-motion users.
 */
function Ambient() {
  const layer = useRef(null);
  const glow = useRef(null);

  useEffect(() => {
    if (reduceMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    let x = 0, y = 0, frame = 0, visible = false;

    const draw = () => {
      frame = 0;
      if (glow.current) glow.current.style.transform = `translate(${x}px, ${y}px)`;
      if (layer.current) {
        const px = (x / window.innerWidth - 0.5) * 24;
        const py = (y / window.innerHeight - 0.5) * 24;
        layer.current.style.transform = `translate(${px}px, ${py}px)`;
      }
    };
    const onMove = (e) => {
      x = e.clientX; y = e.clientY;
      if (!visible && glow.current) { visible = true; glow.current.classList.add("on"); }
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const onLeave = () => { visible = false; glow.current?.classList.remove("on"); };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div className="ambient" aria-hidden="true">
        <div className="ambient-blobs" ref={layer}>
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>
        <div className="cursor-glow" ref={glow} />
      </div>
    </>
  );
}

export default function Layout() {
  useScrollManager();
  useReveal();
  const { pathname } = useLocation();
  const deck = pathname === "/";

  return (
    <div className={`app${deck ? " deck-mode" : ""}`}>
      <Ambient />
      <PongEasterEgg />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
    </div>
  );
}
