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

export function Chips({ items, label }) {
  if (!items?.length) return null;
  return (
    <ul className="chips" aria-label={label}>
      {items.map((t) => <li className="chip" key={t}>{t}</li>)}
    </ul>
  );
}

/** Light markup: **bold**, *italic*, ***bold italic***. */
export function emphasize(text) {
  const out = [];
  const re = /\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0, m, k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<strong key={k++}><em>{m[1]}</em></strong>);
    else if (m[2] !== undefined) out.push(<strong key={k++}>{m[2]}</strong>);
    else out.push(<em key={k++}>{m[3]}</em>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
