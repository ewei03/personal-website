import { useState } from "react";

/** Image with a gradient placeholder that shows until the file exists. */
export function Photo({ src, alt = "", label, className = "", style }) {
  const [failed, setFailed] = useState(!src);
  return (
    <figure className={`photo ${className}`} data-label={label} style={style}>
      {!failed && <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
    </figure>
  );
}

/** Headline whose words rise in one after another. The accent phrase gets the gradient. */
export function SplitText({ as: Tag = "h1", text, accent, style }) {
  let i = 0;
  const delay = () => ({ animationDelay: `${120 + i++ * 70}ms` });
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <Tag className="split" style={style}>
      {words.map((w, idx) => (
        <span key={idx}>
          <span className="word" style={delay()}>{w}</span>{" "}
        </span>
      ))}
      {accent && (
        <span className="accent word" style={{ animationDelay: `${120 + i++ * 70}ms, 1s` }}>
          {accent}
        </span>
      )}
    </Tag>
  );
}

/** Animated background blobs used behind hero sections. */
export function Blobs({ which = [1, 2, 3] }) {
  return (
    <div className="hero-bg" aria-hidden="true">
      {which.map((n) => <div key={n} className={`blob blob-${n}`} />)}
    </div>
  );
}

export function Chips({ items, label }) {
  if (!items?.length) return null;
  return (
    <ul className="chips" aria-label={label}>
      {items.map((t) => <li className="chip" key={t}>{t}</li>)}
    </ul>
  );
}

/** Turns **word** into <strong>word</strong>. */
export function emphasize(text) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
}
