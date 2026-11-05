import { useCallback, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useI18n } from "../i18n.jsx";

const Chevron = ({ dir }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

/**
 * ← / → keys (ignored while typing or when a popup is open) and horizontal swipes.
 * Returns touch handlers to spread on the swipe area.
 */
function useArrowNav(onPrev, onNext) {
  const handlers = useRef({ onPrev, onNext });
  handlers.current = { onPrev, onNext };

  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (document.querySelector("dialog[open]")) return;
      if (e.target.closest?.("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowRight") { e.preventDefault(); handlers.current.onNext?.(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); handlers.current.onPrev?.(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const touch = useRef(null);
  const onTouchStart = (e) => { const p = e.touches[0]; touch.current = { x: p.clientX, y: p.clientY }; };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const p = e.changedTouches[0];
    const dx = p.clientX - touch.current.x;
    const dy = p.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? handlers.current.onNext : handlers.current.onPrev)?.();
  };
  return { onTouchStart, onTouchEnd };
}

/**
 * Side arrows for a standalone page that continues the home deck (e.g. Contact).
 * prev / next are { label, to } links; arrow keys and swipes follow them too.
 */
export function PageArrows({ prev, next }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { onTouchStart, onTouchEnd } = useArrowNav(
    prev && (() => navigate(prev.to)),
    next && (() => navigate(next.to))
  );
  useEffect(() => {
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd);
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
    };
  });
  return (
    <>
      {prev && (
        <Link className="deck-arrow page-arrow prev" to={prev.to} aria-label={t("Previous: {label}", { label: prev.label })}>
          <Chevron dir="left" />
        </Link>
      )}
      {next && (
        <Link className="deck-arrow page-arrow next" to={next.to} aria-label={next.label}>
          <Chevron dir="right" />
        </Link>
      )}
    </>
  );
}

/**
 * Horizontal, full-height slides with side arrows, keyboard (← →) and swipe.
 * The active slide is kept in the URL hash (#experience etc.), so the nav links work.
 * `end` (optional) is a { label, to } link shown as the "next" arrow on the last slide.
 */
export default function SlideDeck({ slides, end }) {
  const { t } = useI18n();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const found = slides.findIndex((s) => `#${s.id}` === hash);
  const index = found === -1 ? 0 : found;
  const last = slides.length - 1;
  const slideRefs = useRef([]);

  const go = useCallback(
    (i) => {
      if (i > last && end) { navigate(end.to); return; }
      const next = Math.max(0, Math.min(last, i));
      navigate({ pathname: "/", hash: next === 0 ? "" : `#${slides[next].id}` }, { replace: true });
    },
    [last, navigate, slides, end]
  );

  const { onTouchStart, onTouchEnd } = useArrowNav(() => go(index - 1), () => go(index + 1));

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
        <button type="button" className="deck-arrow prev" onClick={() => go(index - 1)} aria-label={t("Previous: {label}", { label: slides[index - 1].label })}>
          <Chevron dir="left" />
        </button>
      )}
      {index < last ? (
        <button type="button" className="deck-arrow next" onClick={() => go(index + 1)} aria-label={t("Next: {label}", { label: slides[index + 1].label })}>
          <Chevron dir="right" />
        </button>
      ) : (
        end && (
          <Link className="deck-arrow next" to={end.to} aria-label={t("Next: {label}", { label: end.label })}>
            <Chevron dir="right" />
          </Link>
        )
      )}

    </div>
  );
}
