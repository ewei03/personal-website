// =============================================================
//  All of your editable site content lives here.
//  Keep it skimmable: one idea per line.
//  Photos go in /public/images and are referenced as "/images/…".
//  Missing photos fall back to a soft gradient placeholder.
// =============================================================

export const profile = {
  name: "Enoch Wei",
  firstName: "Enoch",
  status: "Open to new opportunities",
  headline: "I take things apart to see how they",
  headlineAccent: "work.",
  lede: "Software engineer and UWaterloo CS grad. Curious, competitive, and happiest deep in a hard problem.",
  portrait: "/images/portrait.jpg",
};

// TODO: replace with your real handles
export const links = {
  linkedin: { url: "https://www.linkedin.com/in/your-handle", label: "linkedin.com/in/your-handle" },
  github: { url: "https://github.com/your-username", label: "github.com/your-username" },
  email: "you@example.com",
  resume: "/resume.pdf", // drop your résumé at public/resume.pdf
};

export const experienceIntro = "New stack, new domain, every term.";

// Newest first. Aim for one or two short, impact-first bullets each.
export const experience = [
  {
    role: "Software Engineer",
    company: "Company Name",
    dates: "2026 — Present",
    points: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
    tech: ["TypeScript", "React", "GraphQL"],
  },
  {
    role: "Software Engineering Intern",
    company: "Company Name",
    dates: "Winter 2025",
    points: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
    tech: ["Go", "Kubernetes", "PostgreSQL"],
  },
  {
    role: "Backend Developer Intern",
    company: "Company Name",
    dates: "Spring 2024",
    points: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
    tech: ["Python", "Django", "AWS"],
  },
  {
    role: "Bachelor of Computer Science",
    company: "University of Waterloo",
    dates: "20XX — 2026",
    points: ["Lorem ipsum: an honour, club, or capstone."],
    tech: [],
  },
];

export const projectsIntro = "Built to find out if I could.";

// The first project with `featured: true` gets the large, full-width card.
// `image`, `code` and `demo` are all optional.
export const projects = [
  {
    title: "Project One",
    kind: "Featured project",
    featured: true,
    image: "/images/project-1.jpg",
    text: "Lorem ipsum dolor sit amet: what it does and the clever part, in one line.",
    tech: ["Rust", "WebAssembly", "React"],
    code: "https://github.com/your-username/project-one",
    demo: "https://example.com",
  },
  {
    title: "Project Two",
    kind: "Hackathon",
    image: "/images/project-2.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tech: ["Python", "FastAPI", "OpenCV"],
    code: "https://github.com/your-username/project-two",
  },
  {
    title: "Project Three",
    kind: "Deep dive",
    image: "/images/project-3.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tech: ["C++", "Systems"],
    code: "https://github.com/your-username/project-three",
  },
];

export const hobbiesIntro = "Practice, precision, and usually a timer.";

// Each hobby card: optional image, stats (big numbers), tags, and links.
// TODO: replace the profile URLs with your own.
export const hobbies = [
  {
    title: "Music",
    image: "/images/hobby-music.jpg",
    text: "Piano first. I've also learned violin and taught myself guitar.",
    tags: ["Piano", "Violin", "Guitar (self-taught)"],
  },
  {
    title: "Rhythm games",
    image: "/images/hobby-osu.jpg",
    text: "Where practice turns into milliseconds.",
    stats: [
      { value: "Top 1K", label: "global, osu!mania" },
      { value: "Top 10K", label: "global, osu!" },
    ],
    links: [{ label: "osu! profile", url: "https://osu.ppy.sh/users/your-id" }],
  },
  {
    title: "Against the clock",
    image: "/images/hobby-speed.jpg",
    text: "If there's a timer, I want to beat it.",
    stats: [{ value: "~200", label: "WPM on Monkeytype" }],
    tags: ["Speedcubing", "Speed stacking"],
    links: [
      { label: "WCA profile", url: "https://www.worldcubeassociation.org/persons/YOUR-WCA-ID" },
      { label: "Monkeytype", url: "https://monkeytype.com/profile/your-username" },
    ],
  },
  {
    title: "Away from screens",
    image: "/images/hobby-life.jpg",
    text: "Cooking, lifting, and anything with a racket.",
    tags: ["Cooking", "Weightlifting", "Racket sports"],
  },
];
