import { useState } from "react";

/**
 * Hero portrait that "grows up". Starts on the most recent photo; clicking the photo steps
 * through youngest → oldest, and the dots below jump to any photo.
 */
export default function PortraitCycle({ photos, name }) {
  const last = photos.length - 1;
  const [index, setIndex] = useState(last);
  const next = () => setIndex((i) => (i + 1) % photos.length);

  return (
    <div className="portrait-cycle">
      <div className="portrait-frame">
        <button
          type="button"
          className="photo portrait"
          onClick={next}
          aria-label={`${name} as ${photos[index].label.toLowerCase()}. Show next photo.`}
        >
          {photos.map((p, i) => (
            <img key={p.src} src={p.src} alt="" className={i === index ? "active" : ""} loading={i === last ? "eager" : "lazy"} />
          ))}
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
