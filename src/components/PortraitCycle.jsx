import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n.jsx";

const INTERVAL = 4000;

/**
 * Hero portrait that "grows up". Starts on the most recent photo and auto-advances
 * youngest → oldest (pauses on hover/focus, off for reduced-motion users, holds a little
 * longer on the current photo). The photos sit in a fanned stack; on each change the front one
 * flicks out and tucks in at the back. Clicking the photo steps forward; the dots jump to any photo.
 */
export default function PortraitCycle({ photos, name }) {
  const { t, td } = useI18n();
  const last = photos.length - 1;
  const [index, setIndex] = useState(last);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false); // only rotate while the portrait is on screen
  const wrap = useRef(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el || !("IntersectionObserver" in window)) { setInView(true); return; }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  // Photos that just moved from the front of the stack to the back (animated), plus a turn counter
  const [sentBack, setSentBack] = useState(() => new Set());
  const [turn, setTurn] = useState(0);
  const show = (target) => {
    if (target === index) return;
    const n = photos.length;
    const steps = (target - index + n) % n; // the stack only rotates forward: front cards go behind
    setSentBack(new Set(Array.from({ length: steps }, (_, k) => (index + k) % n)));
    setTurn((x) => x + 1);
    setIndex(target);
  };
  const next = () => show((index + 1) % photos.length);

  useEffect(() => {
    if (photos.length < 2 || paused || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(next, index === last ? INTERVAL * 1.5 : INTERVAL);
    return () => clearTimeout(id);
  }, [index, paused, inView, photos.length, last]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={wrap}
      className="portrait-cycle"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="portrait-frame">
        <button
          type="button"
          className="portrait-stack"
          onClick={next}
          aria-label={t("{name}, {label} ({caption}). Show next photo.", { name: t(name), label: t(photos[index].label), caption: td(photos[index].caption || "") })}
        >
          {photos.map((p, i) => {
            const depth = (i - index + photos.length) % photos.length; // 0 = front
            const sent = sentBack.has(i);
            return (
              <span
                key={p.src}
                className={`stack-card${depth === 0 ? " front" : ""}`}
                style={{
                  "--d": depth,
                  // two identical keyframes, alternated, so the "send to back" flick restarts every turn
                  animationName: sent ? (turn % 2 ? "stack-back-a" : "stack-back-b") : undefined,
                }}
              >
                <img src={p.src} alt="" loading={i === last ? "eager" : "lazy"} />
                {p.caption && <span className="portrait-caption">{td(p.caption)}</span>}
              </span>
            );
          })}
        </button>
      </div>

      {photos.length > 1 && (
        <div className="portrait-dots" role="group" aria-label={t("Choose photo")}>
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              className={i === index ? "active" : ""}
              aria-label={t(p.label)}
              aria-pressed={i === index}
              onClick={() => show(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
