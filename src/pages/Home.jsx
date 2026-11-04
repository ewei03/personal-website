import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  profile, experience, education, projects, hobbies,
} from "../content/site.js";
import { Blobs, Chips, Photo, SplitText } from "../components/ui.jsx";
import { ArrowRight, ArrowUpRight, GitHub } from "../components/Icons.jsx";
import ResumeViewer from "../components/ResumeViewer.jsx";
import PortraitCycle from "../components/PortraitCycle.jsx";

function SectionHead({ kicker, title, intro, children }) {
  return (
    <div className="section-head">
      <div className="reveal">
        <span className="kicker">{kicker}</span>
        <h2>{title}</h2>
      </div>
      {intro && <p className="reveal" style={{ "--i": 1 }}>{intro}</p>}
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <Blobs />
      <div className="container hero-grid">
        <div>
          <span className="eyebrow fade-up" style={{ animationDelay: "40ms" }}>
            <span className="dot" />{profile.status}
          </span>
          <SplitText text={profile.headline} accent={profile.headlineAccent} />
          <p className="lede fade-up" style={{ animationDelay: "800ms" }}>{profile.lede}</p>
          <div className="hero-cta fade-up" style={{ animationDelay: "950ms" }}>
            <Link className="btn btn-primary" to={{ pathname: "/", hash: "#projects" }}>Explore me <ArrowRight /></Link>
            <Link className="btn btn-ghost" to="/contact">Get in touch</Link>
          </div>
        </div>
        <div className="portrait-wrap fade-up" style={{ animationDelay: "300ms" }}>
          <PortraitCycle photos={profile.portraits} name={profile.name} />
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const timeline = useRef(null);

  // Grow the timeline's gradient line as you scroll through it
  useEffect(() => {
    const el = timeline.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const p = Math.min(Math.max((window.innerHeight * 0.75 - rect.top) / rect.height, 0), 1);
      el.style.setProperty("--progress", p.toFixed(3));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHead kicker="Experience" title="Where I've worked">
          <div className="reveal" style={{ "--i": 2 }}><ResumeViewer /></div>
        </SectionHead>
        <ol className="timeline" ref={timeline}>
          {experience.map((job, i) => (
            <li className="job" key={i}>
              <article className="card reveal">
                <div className="job-top">
                  <h3>{job.role} <span className="company">@ {job.company}</span></h3>
                  <span className="dates">{job.dates}{job.location && <> · {job.location}</>}</span>
                </div>
                <ul>{job.points.map((pt, j) => <li key={j}>{pt}</li>)}</ul>
                <Chips items={job.tech} label="Technologies" />
              </article>
            </li>
          ))}
        </ol>

        <div className="subsection">
          <span className="kicker reveal">Education</span>
          {education.map((ed) => (
            <article className="card edu reveal" key={ed.school}>
              <div className="job-top">
                <h3>{ed.degree} <span className="company">@ {ed.school}</span></h3>
                <span className="dates">{ed.dates}{ed.location && <> · {ed.location}</>}</span>
              </div>
              {ed.points?.length > 0 && <ul>{ed.points.map((pt, j) => <li key={j}>{pt}</li>)}</ul>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  if (!projects.length) return null;
  return (
    <section className="section section-alt" id="projects">
      <div className="container">
        <SectionHead kicker="Projects" title="Things I've built" />
        <div className="project-grid">
          {projects.map((p, i) => (
            <article className={`card project reveal${p.featured ? " featured" : ""}`} style={{ "--i": i % 2 }} key={p.title}>
              {p.image !== undefined && <Photo src={p.image} alt={`Screenshot of ${p.title}`} label={`${p.title} image`} />}
              <div className="project-body">
                {p.kind && <span className={`project-meta${p.wip ? " wip" : ""}`}>{p.kind}</span>}
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <Chips items={p.tech} label="Built with" />
                {(p.code || p.demo || p.links?.length > 0) && (
                  <div className="project-links">
                    {p.code && (
                      <a href={p.code} target="_blank" rel="noopener noreferrer"><GitHub /> Code</a>
                    )}
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight /></a>
                    )}
                    {p.links?.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">{l.label} <ArrowUpRight /></a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hobbies() {
  return (
    <section className="section" id="hobbies">
      <div className="container">
        <SectionHead kicker="Off the clock" title="Things I love doing" />
        <div className="hobby-grid">
          {hobbies.map((h, i) => (
            <article className={`card hobby reveal${h.gallery ? " wide" : ""}`} style={{ "--i": i % 2 }} key={h.title}>
              {h.image && <Photo src={h.image} label={`${h.title} photo`} />}
              {h.gallery && (
                <div className="art-gallery">
                  {h.gallery.map((a) => (
                    <a
                      key={a.src}
                      className={`art-piece${a.fit === "contain" ? " contain" : ""}`}
                      href={a.full || a.src}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={a.src} alt={`${a.title}, digital drawing by ${profile.name}`} loading="lazy" />
                      <span>{a.title}</span>
                    </a>
                  ))}
                </div>
              )}
              <div className="hobby-body">
                <h3>{h.title}</h3>
                <p>{h.text}</p>
                {h.stats?.length > 0 && (
                  <div className="hobby-stats">
                    {h.stats.map((s) => (
                      <div className="hobby-stat" key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>
                    ))}
                  </div>
                )}
                <Chips items={h.tags} label={`${h.title} details`} />
                {h.links?.length > 0 && (
                  <div className="project-links">
                    {h.links.map((l) => (
                      <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer">{l.label} <ArrowUpRight /></a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-band reveal">
          <div>
            <h2>Got a hard problem?</h2>
            <p>Looking for a full-time SWE role on a team that goes deep.</p>
          </div>
          <Link className="btn" to="/contact">Say hello <ArrowRight /></Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => { document.title = `${profile.name} — Software Engineer`; }, []);
  return (
    <>
      <Hero />
      <Experience />
      <Projects />
      <Hobbies />
      <CallToAction />
    </>
  );
}
