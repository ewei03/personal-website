// =============================================================
//  All of your editable site content lives here.
//  Keep it skimmable: one idea per line.
//  Photos go in /public/images and are referenced as "/images/…".
//  Missing photos fall back to a soft gradient placeholder.
// =============================================================

// Used by the Hobbies card and the fun facts.
const MONKEYTYPE_URL = "https://monkeytype.com/profile/eggnonk";

export const profile = {
  name: "Enoch Wei",
  firstName: "Enoch",
  headline: "Hey! I'm",
  headlineAccent: "Enoch Wei.",
  bio: [
    "I was always a **competitive** kid. Piano competitions, math contests, badminton tournaments, even Rubik's cube competitions. I always wanted to be the best.",
    "I don't compete as much anymore, but my competitive spirit lives on. Now, I'm a **hobbyist** who loves picking up new things and **grinding** until I'm good at them.",
    "I'm now a Software Engineer who brings that same grind to my job.",
    "***Soli Deo Gloria.***"
  ],
  portraits: [
    { src: "/images/portrait/child.jpg", label: "Child", caption: "2006 · Age 3" },
    { src: "/images/portrait/preteen.jpg", label: "Preteen", caption: "2014 · Age 11" },
    { src: "/images/portrait/teen.jpg", label: "Teen", caption: "2016 · Age 13" },
    { src: "/images/portrait/adult.jpg", label: "Adult", caption: "2026 · Age 23" },
  ],
};

export const links = {
  linkedin: { url: "https://www.linkedin.com/in/enoch-wei", label: "linkedin.com/in/enoch-wei" },
  github: { url: "https://github.com/ewei03", label: "github.com/ewei03" },
  email: "enoch.wei03@gmail.com",
  resume: "/resume.pdf",
};

export const experience = [
  {
    role: "Software Engineering Consultant",
    company: "BrainRidge Consulting",
    dates: "Aug 2026 - Present",
    location: "Toronto, ON",
    points: [
      "Shipped a content migration project for BMO. Now building an IVR system.",
    ],
    tags: ["Fintech", "Consulting", "Full-stack"],
  },
  {
    role: "Forward Deployed Engineer Intern",
    company: "Federato Technologies",
    dates: "Sep 2025 - Dec 2025",
    location: "Menlo Park, CA",
    points: [
      "Built internal tools and data workflows that improved quality across Federato's insurtech platform.",
    ],
    tags: ["Insurtech", "Startup", "Full-stack"],
  },
  {
    role: "Software Engineer Intern",
    company: "Rakuten Kobo",
    dates: "Sep 2024 - Apr 2025",
    location: "Toronto, ON",
    points: [
      "Shipped Quick Buy, a one-click checkout (think Amazon's \"Buy Now\") worth ~$748K in annual revenue.",
    ],
    tags: ["E-commerce", "Backend", "QA & Testing"],
  },
  {
    role: "Mobile Software Engineer Intern",
    company: "Insurance & Mobility Solutions",
    dates: "Jan 2024 - Apr 2024",
    location: "Waterloo, ON",
    points: [
      "Built iOS and Android sample apps that showcased the core product to clients.",
    ],
    tags: ["Insurtech", "Telematics", "Mobile"],
  },
  {
    role: "Software Engineer Intern",
    company: "Alpha Labs",
    dates: "May 2023 - Aug 2023",
    location: "North York, ON",
    points: [
      "Led development of our flagship patient portal website.",
    ],
    tags: ["Healthtech", "Full-stack"],
  },
  {
    role: "Data Quality Associate Intern",
    company: "Citylitics",
    dates: "May 2022 - Aug 2022",
    location: "Toronto, ON",
    points: [
      "Maintained data for 30,000+ North American infrastructure companies.",
    ],
    tags: ["Infrastructure", "Data"],
  },
];

export const education = [
  {
    degree: "Bachelor of Computer Science",
    school: "University of Waterloo",
    dates: "Sep 2021 - Apr 2026",
    location: "Waterloo, ON",
    points: ["Studied artificial intelligence, machine learning, user interfaces, and statistics."],
  },
];

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

// Fun facts card (top of Hobbies). Rotates through these; add as many as you like.
// Keep this list (even empty): the card stays hidden while it's empty.
// Each fact is a string, or { text, link: { label, url } } to add a link.
// Supports **double asterisks** for emphasis.
export const funFacts = [
  "I can recite pi to **101 decimal places** from memory!",
  { text: "I can type **200+ WPM**, putting me in the **top 0.07%** on Monkeytype's 15-second leaderboard.", link: { label: "Monkeytype", url: MONKEYTYPE_URL } },
  { text: "I can name **every country in the world** on Sporcle, and at one point I knew all of their flags too.", link: { label: "Sporcle", url: "https://www.sporcle.com/user/asdfgasm/" } },
  { text: "At 12, I played **first violin** in the OCMS Youth Symphony Orchestra.", link: { label: "OCMS", url: "https://ocms-ca.com/program/symphony-orchestra/" } },
  { text: "I love shooter games, especially **VALORANT**. I even flew to Paris to watch Champions 2025 live.", link: { label: "Tracker", url: "https://tracker.gg/valorant/profile/riot/stupud%23man/overview?platform=pc&playlist=competitive&season=d816f426-48ea-f052-117f-9697a155b319" } },
  "I enjoy running! I recently finished the Under Armour 10K in **55 minutes**.",
  { text: "I once won a **chess medal** at a tournament (I'm not very good though.)", link: { label: "Chess.com", url: "https://www.chess.com/member/eggnonk" } },
  "One of my more expensive hobbies is building **mechanical keyboards**!",
];

export const hobbies = [
  {
    title: "Music",
    // image: "/images/hobby-music.jpg", // uncomment once you add the photo
    text: "I learned piano when I was five and violin when I was seven. I'm also self taught in guitar and played trumpet in my high school band!",
    stats: [
      { value: "ARCT", label: "Diploma in Piano" },
      { value: "Level 9", label: "RCM Violin" },
    ],
    details: [
      { title: "ARCT Diploma in Piano", text: "Associate diploma from the Royal Conservatory of Music." },
      { title: "RCM Level 9, Violin" },
      { title: "First violin, OCMS Youth Symphony Orchestra", text: "At age 12.", link: { label: "OCMS", url: "https://ocms-ca.com/program/symphony-orchestra/" } },
      { title: "Piano competitions", text: "Competed throughout my childhood." },
      { title: "Trumpet, high school band" },
      { title: "Self-taught guitar" },
    ],
  },
  {
    title: "Rhythm games",
    // image: "/images/hobby-osu.jpg", // uncomment once you add the photo
    text: "I'm a huge rhythm game enjoyer - click to see some of my osu! plays.",
    stats: [
      { value: "\#844", label: "global, osu!mania" },
      { value: "\#7349", label: "global, osu!" },
      { value: "1st", label: "Tournamint #4 Winning Team" },
    ],
    details: [
      { title: "#844 global, osu!mania" },
      { title: "#7349 global, osu!" },
      { title: "1st place, Tournamint #4", text: "Part of the winning team, with a profile badge to show for it." },
    ],
    links: [
      { label: "osu! profile", url: "https://osu.ppy.sh/users/9261099" },
      { label: "Watch my plays", url: "https://www.youtube.com/playlist?list=PLN3eQJaijAk5c_3KhQyYELxzn7W7lFHCP" },
    ],
  },
  {
    title: "Against the clock",
    // image: "/images/hobby-speed.jpg", // uncomment once you add the photo
    text: "I was bored one day back in 2014, and that's when I decided to pick up a Rubik's Cube. The rest is history! I've also gotten into speedstacking lately.",
    stats: [
      { value: "200+", label: "WPM on Monkeytype" },
      { value: "Bronze", label: "2x2 cube, WCA 2015" },
      { value: "9.96s", label: "Cycle, speed stacking" },
    ],
    details: [
      { title: "Bronze medal, 2x2 cube", text: "WCA competition, 2015.", link: { label: "WCA", url: "https://www.worldcubeassociation.org/persons/2014WEIE01" } },
      { title: "200+ WPM, top 0.07%", text: "Monkeytype's 15-second leaderboard.", link: { label: "Monkeytype", url: MONKEYTYPE_URL } },
      { title: "9.96s cycle", text: "Personal best in speed stacking." },
      { title: "Cubing since 2014" },
    ],
    tags: ["Speedcubing", "Speed stacking"],
    links: [
      { label: "WCA profile", url: "https://www.worldcubeassociation.org/persons/2014WEIE01" },
      { label: "Monkeytype", url: MONKEYTYPE_URL },
    ],
  },
  {
    title: "Away from screens",
    // image: "/images/hobby-life.jpg", // uncomment once you add the photo
    text: "I love to cook! Some of my favourite things to make are sourdough bread and handmade pasta. I also weightlift and I dabble in all racket sports.",
    tags: ["Cooking", "Weightlifting", "Racket sports"],
    details: [
      { title: "Under Armour 10K in 55 minutes" },
      { title: "Badminton tournaments", text: "Competed growing up." },
      { title: "Chess tournament medal", text: "(Still not very good.)", link: { label: "Chess.com", url: "https://www.chess.com/member/eggnonk" } },
      { title: "Sourdough and handmade pasta", text: "My favourite things to cook." },
    ],
  },
  {
    title: "Digital art",
    text: "Putting my drawing tablet to use sometimes. More to come, hopefully.",
    gallery: [
      { src: "/images/art/totoro.jpg", full: "/images/art/totoro-full.png", title: "Totoro" },
      { src: "/images/art/furret.png", title: "Furret" },
      { src: "/images/art/dwebble.png", title: "Dwebble", fit: "contain" },
    ],
  },
];
