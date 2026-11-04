import { useEffect } from "react";
import { profile, links } from "../content/site.js";
import { Blobs, SplitText } from "../components/ui.jsx";
import { ArrowRight, ArrowUpRight, FileText, GitHub, LinkedIn, Mail } from "../components/Icons.jsx";

const cards = [
  { title: "LinkedIn", sub: links.linkedin.label, href: links.linkedin.url, Icon: LinkedIn, external: true },
  { title: "GitHub", sub: links.github.label, href: links.github.url, Icon: GitHub, external: true },
  { title: "Email", sub: links.email, href: `mailto:${links.email}`, Icon: Mail },
  { title: "Résumé", sub: "View PDF", href: links.resume, Icon: FileText },
];

export default function Contact() {
  useEffect(() => { document.title = `Contact — ${profile.name}`; }, []);

  // No backend needed: opens the visitor's mail app with the message pre-filled.
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name") || "";
    const subject = encodeURIComponent(`Hello from ${name || "your website"}`);
    const body = encodeURIComponent(`${data.get("message") || ""}\n\n— ${name} (${data.get("email") || ""})`);
    window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <section className="page-hero">
        <Blobs />
        <div className="container">
          <span className="kicker fade-up">Contact</span>
          <SplitText text="Let's" accent="talk." />
          <p className="fade-up" style={{ animationDelay: "400ms" }}>
            A role, a project, or just a hello. My inbox is open.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container contact-grid">
          <div className="link-cards">
            {cards.map(({ title, sub, href, Icon, external }, i) => (
              <a
                key={title}
                className="card link-card reveal"
                style={{ "--i": i }}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="icon"><Icon /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{sub}</p>
                </div>
                <span className="go" aria-hidden="true"><ArrowUpRight /></span>
              </a>
            ))}
          </div>

          <form className="card form reveal" style={{ "--i": 1 }} onSubmit={onSubmit}>
            <h3 style={{ margin: 0 }}>Send a quick note</h3>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required />
            </div>
            <button className="btn btn-primary" type="submit" style={{ justifySelf: "start" }}>
              Send message <ArrowRight />
            </button>
            <p className="form-note">This opens your email app with the message pre-filled.</p>
          </form>
        </div>
      </section>
    </>
  );
}
