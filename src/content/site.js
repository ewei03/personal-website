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
  headline: "Hi there! I'm",
  headlineAccent: "Enoch Wei.",
  pronunciation: "(\"ee-knock\")", // small note beside the name; hidden in Chinese
  bio: [
    "I was always a **competitive** kid. Piano competitions, math contests, badminton tournaments, even Rubik's cube competitions. I always wanted to be the best.",
    "I don't compete as much anymore, but my competitive spirit lives on. I'm a **hobbyist** at heart who loves picking up new things and **grinding** until I'm good at them.",
    "Today, I'm a **software engineer** who brings that same grind to my job.",
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
      "Shipped a content migration project for BMO. Now building them an IVR system.",
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
    points: ["Studied artificial intelligence, machine learning, user interfaces, databases, and statistics."],
  },
];

export const projects = [
  {
    title: "PlanAway",
    date: "Featured · Oct 2026",
    featured: true,
    image: "/projects/planaway.png",
    imagePosition: "center top", // keep the headline in view when cropped
    text: "PlanAway is the future for vacation planning: a **Claude-powered AI agent** that does all your research. Describe your dream trip in your own words, and it builds out a comprehensive, day-by-day itinerary within minutes!",
    tech: ["Next.js", "TypeScript", "Claude API", "Postgres", "MapLibre"],
    code: "https://github.com/ewei03/planaway",
  },
  {
    title: "TypeOff (WIP)",
    date: "Oct 2026",
    image: "/projects/typeoff-card.png", // cropped from typeoff.png to the game area
    text: "**Tetr.io** meets **TypeRacer**. A real-time 1v1 battle with a catch: the faster you type, the more they type.",
    tech: ["Vite", "Docker", "GitHub Actions"], // TODO: add language / realtime lib
    code: "https://github.com/ewei03/typing-duel-game",
  },
  {
    title: "Harold!",
    date: "Apr 2022",
    image: "/projects/harold.png",
    imageFit: "contain", // show the whole drawing
    imageBg: "#fff",
    text: "Harold is an anti-procrastination **Discord bot** that nags you until your homework is done.",
    tech: ["Node.js", "discord.js", "MongoDB", "node-cron"],
    code: "https://github.com/ewei03/harold-discord-bot",
  },
  {
    title: "Need 2 Go",
    date: "Aug 2022",
    image: "/images/project-need-2-go.png",
    text: "An **iOS app** for finding, rating and getting directions to the nearest washroom, with filters for what you need.",
    tech: ["Swift", "Django", "Django REST", "Google Places API"],
    links: [{ label: "Devpost", url: "https://devpost.com/software/need-2-go" }],
  },
];

// Fun facts card (top of Hobbies). Rotates through these; add as many as you like.
// Keep this list (even empty): the card stays hidden while it's empty.
// Each fact is a string, or { text, link: { label, url } } to add a link.
// Supports **double asterisks** for emphasis.
export const funFacts = [
  { text: "I can type **200+ WPM**, putting me in the **top 0.07%** on Monkeytype's 15-second leaderboard!", link: { label: "Monkeytype", url: MONKEYTYPE_URL } },
  "I have **perfect pitch**! I get tested on it a lot...",
  "I can recite pi to **101 decimal places** from memory!",
  { text: "I can name **every country in the world** on Sporcle, and at one point I knew all of their flags too.", link: { label: "Sporcle", url: "https://www.sporcle.com/user/asdfgasm/" } },
  { text: "At 12, I played **first violin** in the OCMS Youth Symphony Orchestra.", link: { label: "OCMS", url: "https://ocms-ca.com/program/symphony-orchestra/" } },
  { text: "I love shooter games, especially **VALORANT**. I even flew to Paris to watch a professional tournament live!", link: { label: "Tracker", url: "https://tracker.gg/valorant/profile/riot/stupud%23man/overview?platform=pc&playlist=competitive&season=d816f426-48ea-f052-117f-9697a155b319" } },
  { text: "I enjoy running! I recently finished the Under Armour 10K in **55 minutes**.", link: { label: "Strava", url: "https://www.strava.com/activities/11657582317" } },
  { text: "I once won a **chess medal** at a tournament. I'm not very good though.", link: { label: "Chess.com", url: "https://www.chess.com/member/eggnonk" } },
  "One of my more expensive hobbies is building **mechanical keyboards**!",
];

export const hobbies = [
  {
    title: "Music",
    // YouTube video embedded in the popup below the bio (thumb: false keeps it off the card)
    video: { id: "LQSybd6CuUs", thumb: false },
    icon: "piano", // corner clip art: piano | violin | rhythm | cube | question
    // image: "/images/hobby-music.jpg", // uncomment once you add the photo
    // shown in the popup instead of `text`
    bio: "Music is a very formative part of my life. I've competed in provincial-level competitions, accompanied soloists for recitals, and led church worship. My next goal is to get into **production**!",
    text: "I learned **piano** when I was five and **violin** when I was seven. I'm a huge music guy! Click to explore my music background.",
    stats: [
      { value: "ARCT", label: "Diploma in Piano" },
      { value: "Level 9", label: "RCM Violin" },
    ],
    // Grouped details: each { group, items } gets its own small heading in the popup
    details: [
      { group: "Piano", items: [
        { title: "ARCT Diploma", text: "Associate diploma from the Royal Conservatory of Music - the highest level." },
        { title: "Competitions", text: "Competed throughout my childhood, including OMFA Provincials. Took home various medals and awards.", link: { label: "OMFA", url: "https://omfa.ca" } },
      ] },
      { group: "Violin", items: [
        { title: "RCM Level 9" },
        { title: "First violin, OCMS Youth Symphony Orchestra", text: "Played in orchestra for three years.", link: { label: "OCMS", url: "https://ocms-ca.com/program/symphony-orchestra/" } },
      ] },
    ],
    // small closing line at the bottom of the popup
    note: "I'm also self-taught in **guitar** and played **trumpet** in my school band!",
  },
  {
    title: "Rhythm games",
    icon: "rhythm", // corner clip art: piano | violin | rhythm | cube | question
    // image: "/images/hobby-osu.jpg", // uncomment once you add the photo
    // Gameplay video: `playlist` is embedded in the popup; set `id` (a YouTube video ID, the part
    // after watch?v=) to also show that video's thumbnail on the card.
    video: { playlist: "PLN3eQJaijAk5c_3KhQyYELxzn7W7lFHCP", id: "" },
    // Popup: optional headings, and `bio` (a string, or a list of paragraphs) replaces `text`
    // inside the popup (the card keeps `text`)
    bio: [
      "In 2017, I downloaded **osu!** after a friend introduced it to me, and I was immediately hooked.",
      "I've competed in small tournaments, performed at my school's talent show, and spent a *lot* of hours grinding.",
      "I don't play anymore, but I love going to rhythm game arcades!",
    ],
    text: "I'm a huge rhythm game enjoyer, most notably **osu!**. Click to see some of my best plays!",
    stats: [
      { value: "\#844", label: "global, osu!mania" },
      { value: "\#7,349", label: "global, osu!" },
    ],
    details: [
      {
        group: "Achievements",
        items: [
          { title: "#844 peak global rank (Top 30 in Canada), osu!mania" },
          { title: "#7,349 peak global rank, osu!" },
          { title: "1st place, Tournamint #4", text: "Part of the winning team, with a profile badge to show for it!" },
        ],
      },
    ],
    links: [
      { label: "osu! profile", url: "https://osu.ppy.sh/users/9261099" },
      { label: "My osu! playlist", url: "https://www.youtube.com/playlist?list=PLN3eQJaijAk5c_3KhQyYELxzn7W7lFHCP" },
    ],
  },
  {
    title: "Against the clock",
    // YouTube video embedded in the popup below the bio (thumb: false keeps it off the card)
    video: { id: "CiIl4Tjc3Z4", thumb: false },
    icon: "cube", // corner clip art: piano | violin | rhythm | cube | question
    // image: "/images/hobby-speed.jpg", // uncomment once you add the photo
    // shown in the popup instead of `text`
    bio: [
      "In 2014, I was bored and randomly decided to pick up a **Rubik's Cube**. Using a YouTube tutorial, I learned to solve it - and the rest is history!",
      "I love speedy hobbies in general, which also includes **typing games**, and most recently **cup stacking**.",
    ],
    text: "It all started when I picked up my first **Rubik's Cube** back in 2014. Click to see some cool stats!",
    stats: [
      { value: "5.750s", label: "3x3 Rubik's cube"},
      { value: "9.966s", label: "Cycle (speed stacking)" },
    ],
    // Grouped details; each group can have its own collapsible `records` table (leave "" for no time)
    details: [
      { group: "Rubik's Cube", items: [
        { title: "Bronze medal, 2x2 cube", text: "Done at Toronto Winter Open 2015." },
      ], records: {
        title: "Personal bests",
        columns: ["Event", "Single", "Average"],
        rows: [
          ["3x3", "5.750", "7.893"],
          ["2x2", "0.419", "1.925"],
          ["4x4", "31.640", "39.878"],
          ["5x5", "1:18.747", ""],
          ["3x3 One-Handed", "16.530", "22.672"],
        ],
      } },
      { group: "Typing", items: [
        { title: "200+ WPM, top 0.07%", text: "Monkeytype's 15-second leaderboard." },
      ], records: {
        title: "Personal bests (Monkeytype)",
        columns: ["Test", "WPM"],
        rows: [
          ["15 seconds", "222"],
          ["30 seconds", "200"],
          ["60 seconds", "189"],
          ["10 words", "274"],
          ["25 words", "223"],
        ],
      } },
      { group: "Speed stacking", items: [], records: {
        title: "Personal bests",
        columns: ["Event", "Time"],
        rows: [
          ["Cycle", "9.966"],
          ["3-6-3", "3.165"],
        ],
      } },
    ],
    links: [
      { label: "WCA profile", url: "https://www.worldcubeassociation.org/persons/2014WEIE01" },
      { label: "Monkeytype", url: MONKEYTYPE_URL },
    ],
  },
  {
    title: "Away from the screen",
    icon: "question", // corner clip art: piano | violin | rhythm | cube | question
    // image: "/images/hobby-life.jpg", // uncomment once you add the photo
    bio: ["Here's just a few more of the many things I partake in:"], // shown in the popup instead of `text`
    text: "Some miscellaneous hobbies of mine that didn't fit in the other categories. Click to find out more!",
    tags: ["click", "me", "to", "find", "out!"],
    details: [
      { group: "Cooking", items: [
        { title: "Sourdough bread and handmade pasta", text: "My latest obsessions. I've made plenty of other stuff but I can't be bothered to list them all."}
      ] },
      { group: "Racket sports", items: [
        { title: "Badminton, table tennis, pickleball, tennis", text: "Grew up playing and competing in badminton (I'm ultra washed now)." },
      ] },
      { group: "Writing", items: [
        { title: "Because He Cares", text: "On Medium.", link: { label: "Read", url: "https://medium.com/@enoch.wei03/because-he-cares-7d9228e20fe2" } },
        { title: "You're Not as Important as You Think You Are", text: "Published in UWCCF on Medium.", link: { label: "Read", url: "https://medium.com/uwccf/you-re-not-as-important-as-you-think-you-are-3357735b48c0" } },
      ] },
      { group: "Weightlifting", items: [
        { title: "Lifting since 2024", text: "Trying to do a muscle-up next." },
      ] },
    ],
  },
  {
    title: "Digital art",
    icon: "pencil", // corner clip art: piano | violin | rhythm | cube | question | pencil
    bio: ["Check out my works!"], // popup shows only the drawings (no repeat of the card text)
    text: "Putting my drawing tablet to use sometimes. More to come... if I have the patience for it...",
    gallery: [
      { src: "/images/art/totoro.jpg", full: "/images/art/totoro-full.png", title: "Totoro" },
      { src: "/images/art/furret.png", title: "Furret" },
      { src: "/images/art/dwebble.png", title: "Dwebble", fit: "contain" },
    ],
  },
];
