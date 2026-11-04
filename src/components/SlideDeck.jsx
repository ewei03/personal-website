import { useCallback, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Chevron = ({ dir }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

/**
 * Horizontal, full-height slides with side arrows, keyboard (← →) and swipe.
 * The active slide is kept in the URL hash (#experience etc.), so the nav links work.
 * `end` (optional) is a { label, to } link shown as the "next" arrow on the last slide.
 */
export default function SlideDeck({ slides, end }) {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const found = slides.findIndex((s) => `#${s.id}` === hash);
  const index = found === -1 ? 0 : found;
  const last = slides.length - 1;
  const slideRefs = useRef([]);

  const go = useCallback(
    (i) => {
      const next = Math.max(0, Math.min(last, i));
      navigate({ pathname: "/", hash: next === 0 ? "" : `#${slides[next].id}` }, { replace: true });
    },
    [last, navigate, slides]
  );

  // Keyboard arrows (ignored while typing or when a popup is open)
  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (document.querySelector("dialog[open]")) return;
      if (e.target.closest?.("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  // Swipe on touch screens
  const touch = useRef(null);
  const onTouchStart = (e) => { const t = e.touches[0]; touch.current = { x: t.clientX, y: t.clientY }; };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(index + (dx < 0 ? 1 : -1));
  };

  // Start each newly shown slide at its top
  useEffect(() => {
    const el = slideRefs.current[index];
    if (el) el.scrollTop = 0;
  }, [index]);

  return (
    <div className="deck" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="deck-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((s, i) => (
          <div
            key={s.id}
            ref={(el) => (slideRefs.current[i] = el)}
            className={`slide${i === index ? " active" : ""}`}
            aria-hidden={i !== index}
            inert={i !== index ? "" : undefined}
          >
            <div className="slide-inner">{s.content}</div>
          </div>
        ))}
      </div>

      {index > 0 && (
        <button type="button" className="deck-arrow prev" onClick={() => go(index - 1)} aria-label={`Previous: ${slides[index - 1].label}`}>
          <Chevron dir="left" />
        </button>
      )}
      {index < last ? (
        <button type="button" className="deck-arrow next" onClick={() => go(index + 1)} aria-label={`Next: ${slides[index + 1].label}`}>
          <Chevron dir="right" />
        </button>
      ) : (
        end && (
          <Link className="deck-arrow next" to={end.to} aria-label={end.label}>
            <Chevron dir="right" />
          </Link>
        )
      )}

    </div>
  );
}
