# Enoch Wei — personal site

React + Vite. Teal / sea-blue palette warmed with sand and amber, light & dark mode, subtle scroll animations.

```bash
npm install
npm run dev       # local dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the built site
```

## Where things live

```
src/content/site.js   ← all your text: name, links, experience, projects, hobbies
public/images/        ← your photos
public/resume.pdf     ← your résumé (linked from Contact)
src/styles.css        ← all styling; palette variables at the top
src/pages/            Home, Contact, NotFound
src/components/       Layout (nav/footer/animation hooks), UI bits, icons
```

## Filling in content

1. **Text & links**: edit `src/content/site.js`. Search for `TODO`, `Lorem`, `Company Name`,
   `your-handle`, `your-username`, `you@example.com`.
2. **Photos**: drop into `public/images/` using these names (or change the paths in `site.js`).
   Until a file exists, a soft gradient placeholder is shown.

   | File | Used for |
   | --- | --- |
   | `portrait.jpg` | Home hero (portrait, ~4:5) |
   | `hobby-music.jpg`, `hobby-osu.jpg`, `hobby-speed.jpg`, `hobby-life.jpg` | Hobby cards (~16:9) |
   | `project-1.jpg` … `project-3.jpg` | Project cards (~16:9 screenshots) |

3. **Projects**: add/remove entries in `projects`. `featured: true` gives one project the large card;
   `image`, `code` and `demo` are optional.

## Deploying

Any static host works: Vercel, Netlify, Cloudflare Pages (build command `npm run build`, output `dist`).
The site uses client-side routing; `public/_redirects` (Netlify/Cloudflare) and `vercel.json`
are included so that links like `/contact` work on refresh.
For GitHub Pages, switch `BrowserRouter` to `HashRouter` in `src/main.jsx`.
