import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  profile, experience, education, projects, hobbies, funFacts,
} from "../content/site.js";
import { Chips, Photo, SplitText, emphasize } from "../components/ui.jsx";
import FunFacts from "../components/FunFacts.jsx";
import { ArrowRight, ArrowUpRight, GitHub } from "../components/Icons.jsx";
import ResumeViewer from "../components/ResumeViewer.jsx";
import PortraitCycle from "../components/PortraitCycle.jsx";
import HobbyModal from "../components/HobbyModal.jsx";
import { hobbyIcons } from "../components/HobbyIcons.jsx";
import SlideDeck from "../components/SlideDeck.jsx";

function SectionHead({ title, intro, children }) {
  return (
    <div className="section-head">
      <div className="reveal">
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
      <div className="container hero-grid">
        <div>
          <SplitText text={profile.headline} accent={profile.headlineAccent} />
          {profile.bio?.length > 0 && (
            <div className="bio fade-up" style={{ animationDelay: "800ms" }}>
              {profile.bio.map((para, i) => <p key={i}>{emphasize(para)}</p>)}
            </div>
          )}
          <div className="hero-cta fade-up" style={{ animationDelay: "1000ms" }}>
            <Link className="btn btn-primary" to={{ pathname: "/", hash: "#experience" }}>Explore me! <ArrowRight /></Link>
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
    // capture: also catches scrolling inside a slide; transitionend: fires after a slide change
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("transitionend", onScroll, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("transitionend", onScroll, true);
    };
  }, []);

  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHead title="Experience" intro="Feel free to download my résumé.">
          <div className="reveal" style={{ "--i": 2 }}><ResumeViewer /></div>
        </SectionHead>
        <ol className="timeline" ref={timeline}>
          {experience.map((job, i) => (
            <li
              className="job"
              key={i}
              // 0 = latest (brightest) … 1 = oldest (darkest); used by the card, dot and line
              style={{ "--age": experience.length > 1 ? i / (experience.length - 1) : 0 }}
            >
              <article className="card reveal job-card">
                <div className="job-top">
                  <h3>{job.role} <span className="company">@ {job.company}</span></h3>
                  <span className="job-when">
                    {job.location && <span className="job-loc">{job.location}</span>}
                    <span className="job-dates">{job.dates}</span>
                  </span>
                </div>
                <ul>{job.points.map((pt, j) => <li key={j}>{pt}</li>)}</ul>
                <Chips items={job.tags} label="Focus areas" />
              </article>
            </li>
          ))}
        </ol>

        <div className="subsection">
          <h3 className="subsection-title reveal">Education</h3>
          {education.map((ed) => (
            <article className="card edu reveal" key={ed.school}>
              <div className="job-top">
                <h3>{ed.degree} <span className="company">@ {ed.school}</span></h3>
                <span className="job-when">
                  {ed.location && <span className="job-loc">{ed.location}</span>}
                  <span className="job-dates">{ed.dates}</span>
                </span>
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
        <SectionHead title="Projects" intro="Check out some of my personal projects!" />
        <div className="project-grid">
          {projects.map((p, i) => (
            <article className={`card project reveal${p.featured ? " featured" : ""}`} style={{ "--i": i % 2 }} key={p.title}>
              {p.image !== undefined && (
                <Photo
                  src={p.image}
                  alt={`Screenshot of ${p.title}`}
                  label={`${p.title} image`}
                  fit={p.imageFit}
                  position={p.imagePosition}
                  bg={p.imageBg}
                />
              )}
              <div className="project-body">
                {p.date && <span className="project-meta">{p.date}</span>}
                <h3>{p.title}</h3>
                <p>{emphasize(p.text)}</p>
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
  const [open, setOpen] = useState(null);
  // Open the popup when the card itself is clicked, but let links/buttons inside work normally.
  const onCardClick = (h) => (e) => {
    if (e.target.closest("a, button")) return;
    if (h.details?.length || h.gallery?.length || h.links?.length || h.video) setOpen(h);
  };

  return (
    <section className="section" id="hobbies">
      <div className="container">
        <SectionHead title="Hobbies" intro="I do a lot of cool things - check them out!" />
        <FunFacts facts={funFacts} />
        <div className="hobby-grid">
          {hobbies.map((h, i) => (
            <article
              className={`card hobby reveal${h.gallery ? " wide" : ""}${h.details?.length || h.gallery?.length || h.links?.length ? " has-details" : ""}`}
              style={{ "--i": i % 2 }}
              key={h.title}
              onClick={onCardClick(h)}
            >
              {h.image && <Photo src={h.image} label={`${h.title} photo`} />}
              {!h.image && h.video?.id && (
                <div className="hobby-video-thumb">
                  <Photo src={`https://i.ytimg.com/vi/${h.video.id}/hqdefault.jpg`} alt={`${h.title} gameplay thumbnail`} label="" />
                  <span className="play-badge" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
                  </span>
                </div>
              )}
              {h.gallery && (
                <div className="art-gallery">
                  {h.gallery.map((a) => (
                    <div
                      key={a.src}
                      className={`art-piece${a.fit === "contain" ? " contain" : ""}`}
                    >
                      <img src={a.src} alt={`${a.title}, digital drawing by ${profile.name}`} loading="lazy" />
                      <span>{a.title}</span>
                    </div>
                  ))}
                </div>
              )}
              {h.icon && hobbyIcons[h.icon] && (
                <span className="hobby-icon">{(() => { const Icon = hobbyIcons[h.icon]; return <Icon />; })()}</span>
              )}
              <div className="hobby-body">
                <h3>{h.title}</h3>
                <p>{emphasize(h.text)}</p>
                {h.stats?.length > 0 && (
                  <div className="hobby-stats">
                    {h.stats.map((s) => (
                      <div className="hobby-stat" key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>
                    ))}
                  </div>
                )}
                <Chips items={h.tags} label={`${h.title} details`} />
                {(h.details?.length > 0 || h.gallery?.length > 0 || h.links?.length > 0) && (
                  <div className="project-links">
                    <button type="button" className="hobby-more" onClick={() => setOpen(h)}>
                      Details <ArrowRight />
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
      <HobbyModal
        hobby={open}
        onClose={() => setOpen(null)}
        artist={profile.name}
        // match the card's alternating shade (checkerboard: 2nd and 3rd of every four)
        alt={open ? [1, 2].includes(hobbies.indexOf(open) % 4) : false}
      />
    </section>
  );
}

export default function Home() {
  useEffect(() => { document.title = `${profile.name} — Software Engineer`; }, []);
  return (
    <SlideDeck
      slides={[
        { id: "intro", label: "Intro", content: <Hero /> },
        { id: "experience", label: "Experience", content: <Experience /> },
        { id: "projects", label: "Projects", content: <Projects /> },
        { id: "hobbies", label: "Hobbies", content: <Hobbies /> },
      ]}
      end={{ label: "Contact", to: "/contact" }}
    />
  );
}
