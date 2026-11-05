import { useEffect, useRef } from "react";
import { ArrowUpRight, Close } from "./Icons.jsx";

/** Popup with a hobby's accomplishments, links and (for art) a larger gallery. */
export default function HobbyModal({ hobby, onClose, artist }) {
  const dialog = useRef(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (hobby && !d.open) d.showModal();
    if (!hobby && d.open) d.close();
    document.documentElement.style.overflow = hobby ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [hobby]);

  return (
    <dialog
      ref={dialog}
      className="hobby-dialog"
      aria-label={hobby ? hobby.title : "Hobby details"}
      onClose={onClose}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {hobby && (
        <div className="hobby-dialog-inner">
          <header className="hobby-dialog-head">
            <h2>{hobby.title}</h2>
            <button type="button" className="resume-icon-btn" onClick={onClose} aria-label="Close" autoFocus>
              <Close />
            </button>
          </header>

          <div className="hobby-dialog-body">
            {hobby.text && <p className="hobby-dialog-intro">{hobby.text}</p>}

            {hobby.details?.length > 0 && (
              <ul className="hobby-details">
                {hobby.details.map((d) => (
                  <li key={d.title}>
                    <strong>{d.title}</strong>
                    {d.text && <span>{d.text}</span>}
                    {d.link && (
                      <a href={d.link.url} target="_blank" rel="noopener noreferrer">
                        {d.link.label} <ArrowUpRight />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {hobby.records?.rows?.length > 0 && (
              <div className="hobby-records">
                {hobby.records.title && <h3>{hobby.records.title}</h3>}
                <table>
                  <thead>
                    <tr>{hobby.records.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
                  </thead>
                  <tbody>
                    {hobby.records.rows.map(([first, ...rest]) => (
                      <tr key={first}>
                        <th scope="row">{first}</th>
                        {rest.map((v, i) => <td key={i}>{v || "—"}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {hobby.gallery?.length > 0 && (
              <div className="hobby-dialog-gallery">
                {hobby.gallery.map((a) => (
                  <a key={a.src} href={a.full || a.src} target="_blank" rel="noopener noreferrer">
                    <img src={a.src} alt={`${a.title}, digital drawing by ${artist}`} loading="lazy" />
                    <span>{a.title}</span>
                  </a>
                ))}
              </div>
            )}

            {hobby.links?.length > 0 && (
              <div className="project-links">
                {hobby.links.map((l) => (
                  <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer">{l.label} <ArrowUpRight /></a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
