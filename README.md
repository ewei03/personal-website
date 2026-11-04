# Enoch Wei — personal site

Source for [enochwei.com](https://enochwei.com). React + Vite.

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

## Hosting

Live at **[enochwei.com](https://enochwei.com)**. To publish changes, run `npm run build` and upload
the contents of `dist/` to the enochwei.com host.

The site uses client-side routing, so the server must fall back to `index.html` for unknown paths
(otherwise refreshing `/contact` gives a 404).
