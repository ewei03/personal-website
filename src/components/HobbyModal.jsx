import { useEffect, useRef } from "react";
import { ArrowUpRight, Close } from "./Icons.jsx";
import { emphasize } from "./ui.jsx";
import { useI18n } from "../i18n.jsx";

/** Popup with a hobby's accomplishments, links and (for art) a larger gallery. */
export default function HobbyModal({ hobby, onClose, artist, alt = false }) {
  const { t } = useI18n();
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
      className={`hobby-dialog${alt ? " alt" : ""}`}
      aria-label={hobby ? t(hobby.title) : t("Details")}
      onClose={onClose}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {hobby && (
        <div className="hobby-dialog-inner">
          <header className="hobby-dialog-head">
            <h2>{t(hobby.title)}</h2>
            <button type="button" className="resume-icon-btn" onClick={onClose} aria-label={t("Close")} autoFocus>
              <Close />
            </button>
          </header>

          <div className="hobby-dialog-body">
            {hobby.video && (hobby.video.playlist || hobby.video.id) && (
              <div className="hobby-video">
                <iframe
                  src={
                    hobby.video.playlist
                      ? `https://www.youtube-nocookie.com/embed/${hobby.video.id || "videoseries"}?list=${hobby.video.playlist}&rel=0`
                      : `https://www.youtube-nocookie.com/embed/${hobby.video.id}?rel=0`
                  }
                  title={hobby.video.playlist ? t("{title} gameplay", { title: t(hobby.title) }) : t("{title} video", { title: t(hobby.title) })}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {hobby.bioTitle && <h3 className="hobby-dialog-subhead first">{t(hobby.bioTitle)}</h3>}
            {[].concat(hobby.bio || hobby.text || []).map((para, i) => (
              <p className="hobby-dialog-intro" key={i}>{emphasize(t(para))}</p>
            ))}

            {hobby.details?.length > 0 && hobby.detailsTitle && (
              <h3 className="hobby-dialog-subhead">{t(hobby.detailsTitle)}</h3>
            )}
            {hobby.details?.length > 0 &&
              // plain list, or groups of { group, items } each with a small heading
              (hobby.details.some((d) => d.items) ? hobby.details : [{ items: hobby.details }]).map((g, gi) => (
                <div className="hobby-detail-group" key={g.group || gi}>
                  {g.group && <h4 className="hobby-group-title">{t(g.group)}</h4>}
                  {g.items?.length > 0 && <ul className={`hobby-details${hobby.detailsTitle || g.group ? " titled" : ""}`}>
                    {g.items.map((d) => (
                      <li key={d.title}>
                        <strong>{t(d.title)}</strong>
                        {d.text && <span>{emphasize(t(d.text))}</span>}
                        {d.link && (
                          <a href={d.link.url} target="_blank" rel="noopener noreferrer">
                            {t(d.link.label)} <ArrowUpRight />
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>}
                  <RecordsTable records={g.records} />
                </div>
              ))}

            <RecordsTable records={hobby.records} />

            {hobby.gallery?.length > 0 && (
              <div className="hobby-dialog-gallery">
                {hobby.gallery.map((a) => (
                  <a key={a.src} href={a.full || a.src} target="_blank" rel="noopener noreferrer">
                    <img src={a.src} alt={t("{title}, digital drawing by {name}", { title: t(a.title), name: t(artist) })} loading="lazy" />
                    <span>{t(a.title)}</span>
                  </a>
                ))}
              </div>
            )}

            {hobby.note && <p className="hobby-dialog-note">{emphasize(t(hobby.note))}</p>}

            {hobby.links?.length > 0 && (
              <div className="project-links">
                {hobby.linksLabel && <span className="links-label">{t(hobby.linksLabel)}</span>}
                {hobby.links.map((l) => (
                  <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer">{t(l.label)} <ArrowUpRight /></a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}

/** Collapsible table of times/scores: { title?, columns: [...], rows: [[first, ...rest]] }.
 *  Starts collapsed; the title row toggles it. */
function RecordsTable({ records }) {
  const { t } = useI18n();
  if (!records?.rows?.length) return null;
  return (
    <details className="hobby-records">
      <summary>
        <svg className="records-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 6l6 6-6 6" />
        </svg>
        <span>{t(records.title || "Records")}</span>
        <span className="records-count">· {records.rows.length}</span>
      </summary>
      <table>
        <thead>
          <tr>{records.columns.map((c) => <th key={c} scope="col">{t(c)}</th>)}</tr>
        </thead>
        <tbody>
          {records.rows.map(([first, ...rest]) => (
            <tr key={first}>
              <th scope="row">{t(first)}</th>
              {rest.map((v, i) => <td key={i}>{v || "—"}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}
