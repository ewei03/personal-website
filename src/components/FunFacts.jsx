import { useEffect, useRef, useState } from "react";
import { emphasize } from "./ui.jsx";
import { useI18n } from "../i18n.jsx";

const INTERVAL = 7000;
const NEXT_LABELS = ["Next!", "More?", "Wow!", "Cool!", "No way!", "Nice!"];
// Shuffle-bag: go through every label once in random order, then reshuffle. A new round never
// starts with the label that ended the previous one, so there are no back-to-back repeats.
const shuffled = (list) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const nextFromBag = (bag, prev) => {
  if (bag.length === 0) {
    bag.push(...shuffled(NEXT_LABELS));
    if (bag[0] === prev && bag.length > 1) [bag[0], bag[1]] = [bag[1], bag[0]];
  }
  return bag.shift();
};

/**
 * Rotating "Fun fact" card. Starts on a random fact, auto-advances only while on screen (paused on hover/focus,
 * off for reduced-motion users), and "Next fact" steps through manually.
 */
export default function FunFacts({ facts }) {
  const { t } = useI18n();
  const [index, setIndex] = useState(() => Math.floor(Math.random() * Math.max(facts.length, 1)));
  // Button label: cycles through all reactions in random order with each new fact
  const bag = useRef([]);
  const [label, setLabel] = useState(() => nextFromBag(bag.current));
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    setLabel((prev) => nextFromBag(bag.current, prev));
  }, [index]);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false); // only rotate while the card is actually on screen
  const card = useRef(null);

  useEffect(() => {
    const el = card.current;
    if (!el || !("IntersectionObserver" in window)) { setInView(true); return; }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [facts.length]);
  const next = () => setIndex((i) => (i + 1) % facts.length);

  useEffect(() => {
    if (facts.length < 2 || paused || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(next, INTERVAL);
    return () => clearTimeout(id);
  }, [index, paused, inView, facts.length]);

  if (!facts.length) return null;

  const raw = facts[index];
  const fact = typeof raw === "string" ? { text: raw } : raw;

  return (
    <aside
      ref={card}
      className="card fun-fact reveal"
      aria-label={t("Fun facts")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span className="fun-fact-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4z" />
          <path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
        </svg>
      </span>
      <div className="fun-fact-body">
        <span className="fun-fact-label">
          {t("Fun fact!")}
        </span>
        <p key={index} aria-live="polite">
          {emphasize(t(fact.text))}
          {fact.link && (
            <>
              {" "}
              <a className="fun-fact-link" href={fact.link.url} target="_blank" rel="noopener noreferrer">
                {t(fact.link.label)}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
              </a>
            </>
          )}
        </p>
      </div>
      {facts.length > 1 && (
        <button type="button" className="fun-fact-next" onClick={next}>
          <span key={label} className="fun-fact-next-label">{t(label)}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      )}
    </aside>
  );
}
