import { useEffect, useRef, useState } from "react";

const INTERVAL = 4000;

/**
 * Hero portrait that "grows up". Starts on the most recent photo and auto-advances
 * youngest → oldest (pauses on hover/focus, off for reduced-motion users, holds a little
 * longer on the current photo). Clicking the photo steps forward; the dots jump to any photo.
 */
export default function PortraitCycle({ photos, name }) {
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
  const next = () => setIndex((i) => (i + 1) % photos.length);

  useEffect(() => {
    if (photos.length < 2 || paused || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(next, index === last ? INTERVAL * 1.5 : INTERVAL);
    return () => clearTimeout(id);
  }, [index, paused, inView, photos.length, last]);

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
          className="photo portrait"
          onClick={next}
          aria-label={`${name} as ${photos[index].label.toLowerCase()}${photos[index].caption ? ` (${photos[index].caption})` : ""}. Show next photo.`}
        >
          {photos.map((p, i) => (
            <img key={p.src} src={p.src} alt="" className={i === index ? "active" : ""} loading={i === last ? "eager" : "lazy"} />
          ))}
          {photos[index].caption && (
            <span className="portrait-caption" key={index}>{photos[index].caption}</span>
          )}
        </button>
      </div>

      {photos.length > 1 && (
        <div className="portrait-dots" role="group" aria-label="Choose photo">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              className={i === index ? "active" : ""}
              aria-label={p.label}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
