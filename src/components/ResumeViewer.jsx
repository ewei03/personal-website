import { useEffect, useRef, useState } from "react";
import { links, profile } from "../content/site.js";
import { Close, Download, FileText } from "./Icons.jsx";
import { useI18n } from "../i18n.jsx";

/**
 * "View résumé" button. On desktop it opens the PDF in an in-page viewer, so visitors never
 * leave the site. On small screens (where embedded PDFs render poorly) it falls back to a
 * normal same-tab link, and the browser's back button returns here.
 */
export default function ResumeViewer({ className = "btn btn-ghost", label = "View résumé" }) {
  const { t } = useI18n();
  const name = t(profile.name);
  const dialog = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  const onClick = (e) => {
    const canEmbed = window.matchMedia("(min-width: 721px)").matches && typeof HTMLDialogElement === "function";
    if (!canEmbed) return; // let the link open the PDF in this tab
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <a className={className} href={links.resume} onClick={onClick}>
        <FileText /> {t(label)}
      </a>

      <dialog
        ref={dialog}
        className="resume-dialog"
        aria-label={t("{name}'s résumé", { name })}
        onClose={() => setOpen(false)}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
      >
        <div className="resume-frame">
          <div className="resume-bar">
            <span>{name} · {t("Résumé")}</span>
            <div className="resume-actions">
              <a href={links.resume} download={`${profile.name} resume.pdf`} className="resume-icon-btn" aria-label={t("Download PDF")} title={t("Download PDF")}>
                <Download />
              </a>
              <button type="button" className="resume-icon-btn" onClick={() => setOpen(false)} aria-label={t("Close")} title={t("Close")}>
                <Close />
              </button>
            </div>
          </div>
          {open && <iframe src={`${links.resume}#view=FitH`} title={t("{name}'s résumé", { name })} />}
        </div>
      </dialog>
    </>
  );
}
