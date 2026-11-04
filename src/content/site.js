// =============================================================
//  All of your editable site content lives here.
//  Keep it skimmable: one idea per line.
//  Photos go in /public/images and are referenced as "/images/…".
//  Missing photos fall back to a soft gradient placeholder.
// =============================================================

export const profile = {
  name: "Enoch Wei",
  firstName: "Enoch",
  headline: "Hi, I'm",
  headlineAccent: "Enoch Wei.",
  bio: "I grew up competing in everything: piano competitions, math contests, badminton tournaments, Rubik's cube competitions. That never really stopped. I'm a hobbyist at heart who loves picking up new things and grinding until I'm good at them.",
  bioTagline: "Curious, competitive, and committed.",
  // Hero photos, youngest first. Shows the last one; clicking steps through from the first.
  // `label` is only read by screen readers.
  portraits: [
    { src: "/images/portrait/child.jpg", label: "Child" },
    { src: "/images/portrait/preteen.jpg", label: "Preteen" },
    { src: "/images/portrait/teen.jpg", label: "Teen" },
    { src: "/images/portrait/adult.jpg", label: "Adult" },
  ],
};

export const links = {
  linkedin: { url: "https://www.linkedin.com/in/enoch-wei", label: "linkedin.com/in/enoch-wei" },
  github: { url: "https://github.com/ewei03", label: "github.com/ewei03" },
  email: "enoch.wei03@gmail.com",
  resume: "/resume.pdf", // public/resume.pdf
};

// Newest first. Kept to short, impact-first one-liners; full detail lives in the résumé.
export const experience = [
  {
    role: "Software Engineering Consultant",
    company: "BrainRidge Consulting",
    dates: "Aug 2026 - Present",
    location: "Toronto, ON",
    points: [
      "Shipped a content migration project for BMO. Now building an IVR system.",
    ],
    tech: ["Contentful", "React", "TypeScript", "Node.js", "AWS Lambda"],
  },
  {
    role: "Forward Deployed Engineer",
    company: "Federato Technologies",
    dates: "Sep 2025 - Dec 2025",
    location: "Menlo Park, CA",
    points: [
      "Built internal tools and data workflows that improved quality across Federato's insurtech platform.",
    ],
    tech: ["Node.js", "GraphQL", "Python", "PostgreSQL"],
  },
  {
    role: "Software Engineer Intern",
    company: "Rakuten Kobo",
    dates: "Sep 2024 - Apr 2025",
    location: "Toronto, ON",
    points: [
      "Shipped Quick Buy, a one-click checkout (think Amazon's \"Buy Now\") worth ~$748K in projected annual revenue.",
    ],
    tech: ["C#", ".NET", "SQL", "Playwright", "Selenium", "Jenkins"],
  },
  {
    role: "Mobile Software Engineer Intern",
    company: "Insurance & Mobility Solutions",
    dates: "Jan 2024 - Apr 2024",
    location: "Waterloo, ON",
    points: [
      "Built iOS and Android sample apps that showcased the core product to clients.",
    ],
    tech: ["SwiftUI", "Kotlin", "Firebase", "Azure DevOps"],
  },
  {
    role: "Software Engineer Intern",
    company: "Alpha Labs",
    dates: "May 2023 - Aug 2023",
    location: "North York, ON",
    points: [
      "Led development of the patient portal website.",
    ],
    tech: ["Angular", "TypeScript", "Spring", "Java", "SQL Server"],
  },
  {
    role: "Data Quality Associate Intern",
    company: "Citylitics",
    dates: "May 2022 - Aug 2022",
    location: "Toronto, ON",
    points: [
      "Maintained data for 30,000+ North American infrastructure companies.",
    ],
    tech: ["SQL", "Python", "Django"],
  },
];

export const education = [
  {
    degree: "Bachelor of Computer Science",
    school: "University of Waterloo",
    dates: "Sep 2021 - Apr 2026",
    location: "Waterloo, ON",
    points: ["Chair of the University of Waterloo Chinese Christian Fellowship."],
  },
];

// The first project with `featured: true` gets the large, full-width card.
// `image`, `code`, `demo` and `links` (extra [{ label, url }]) are all optional.
export const projects = [
  {
    title: "PlanAway",
    kind: "Featured · AI agent",
    featured: true,
    image: "/images/project-planaway.png",
    text: "Describe a trip in plain English; a Claude-powered agent researches it and builds a day-by-day itinerary with maps that friends can plan on together.",
    tech: ["Next.js", "TypeScript", "Claude API", "Postgres", "MapLibre"],
    code: "https://github.com/ewei03/planaway",
  },
  {
    title: "Typing Duel",
    kind: "Work in progress",
    wip: true, // shows a pulsing dot
    image: "/images/project-typing-duel.png",
    text: "Real-time 1v1 typing battles: clean words charge attacks that bury your opponent. Think tetr.io meets TypeRacer.",
    tech: ["Vite", "Docker", "GitHub Actions"], // TODO: add language / realtime lib
    code: "https://github.com/ewei03/typing-duel-game",
  },
  {
    title: "Harold",
    kind: "Discord bot",
    image: "/images/project-harold.png",
    text: "An anti-procrastination bot that nags you, gently or annoyingly, until your assignments are done.",
    tech: ["Node.js", "discord.js", "MongoDB", "node-cron"],
    code: "https://github.com/ewei03/harold-discord-bot",
  },
  {
    title: "Need 2 Go",
    kind: "Hackathon",
    image: "/images/project-need-2-go.png",
    text: "An iOS app for finding, rating and getting directions to the nearest washroom, with filters for what you need.",
    tech: ["Swift", "Django", "Django REST", "Google Places API"],
    links: [{ label: "Devpost", url: "https://devpost.com/software/need-2-go" }],
  },
];

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
  {
    // `gallery` makes this a full-width card. `full` (optional) is opened on click.
    title: "Digital art",
    text: "Putting my drawing tablet to use sometimes. More to come, hopefully.",
    gallery: [
      { src: "/images/art/totoro.jpg", full: "/images/art/totoro-full.png", title: "Totoro" },
      { src: "/images/art/furret.png", title: "Furret" },
      { src: "/images/art/dwebble.png", title: "Dwebble", fit: "contain" },
    ],
  },
];
