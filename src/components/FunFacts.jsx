import { useEffect, useState } from "react";
import { emphasize } from "./ui.jsx";

const INTERVAL = 7000;

/**
 * Rotating "Fun fact" card. Starts on a random fact, auto-advances (paused on hover/focus,
 * off for reduced-motion users), and "Next fact" steps through manually.
 */
export default function FunFacts({ facts }) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * Math.max(facts.length, 1)));
  const [paused, setPaused] = useState(false);
  const next = () => setIndex((i) => (i + 1) % facts.length);

  useEffect(() => {
    if (facts.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(next, INTERVAL);
    return () => clearTimeout(id);
  }, [index, paused, facts.length]);

  if (!facts.length) return null;

  const raw = facts[index];
  const fact = typeof raw === "string" ? { text: raw } : raw;

  return (
    <aside
      className="card fun-fact reveal"
      aria-label="Fun facts"
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
          Fun fact {facts.length > 1 && <span className="fun-fact-count">{index + 1} / {facts.length}</span>}
        </span>
        <p key={index} aria-live="polite">
          {emphasize(fact.text)}
          {fact.link && (
            <>
              {" "}
              <a className="fun-fact-link" href={fact.link.url} target="_blank" rel="noopener noreferrer">
                {fact.link.label}
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
          Next fact
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      )}
    </aside>
  );
}
