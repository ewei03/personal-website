import { useEffect } from "react";
import { profile, links } from "../content/site.js";
import { SplitText } from "../components/ui.jsx";
import { ArrowUpRight, FileText, GitHub, LinkedIn, Mail } from "../components/Icons.jsx";

const cards = [
  { title: "LinkedIn", sub: links.linkedin.label, href: links.linkedin.url, Icon: LinkedIn, external: true },
  { title: "GitHub", sub: links.github.label, href: links.github.url, Icon: GitHub, external: true },
  { title: "Email", sub: links.email, href: `mailto:${links.email}`, Icon: Mail },
  { title: "Résumé", sub: "View PDF", href: links.resume, Icon: FileText },
];

export default function Contact() {
  useEffect(() => { document.title = `Contact — ${profile.name}`; }, []);


  return (
    <>
      <section className="page-hero">
        <div className="container">
          <SplitText text="Let's" accent="talk!" />
          <p className="fade-up" style={{ animationDelay: "400ms" }}>
            Wanna say hi or explore my profile more? Find me below:
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
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
        </div>
      </section>
    </>
  );
}
