# Jobert Cabrera Portfolio — setup, editing and deployment

A plain static website (HTML + CSS + JavaScript, no build step). It works on GitHub Pages and any other static host.

## 1. Run it on your computer
Project pages use clean folder URLs (`/projects/brew-haven/`), so open the site through a tiny local server, not by double-clicking the files:

- VS Code: install **Live Server**, right-click `index.html` → *Open with Live Server*, or
- Terminal, inside this folder: `python -m http.server 8000` then open http://localhost:8000

## 2. Things YOU must supply before submitting
| # | What | Where | Status |
|---|------|-------|--------|
| 1 | **Your CV as a PDF** named exactly `CV.pdf` | `assets/CV.pdf` | **MISSING.** Until it exists, the Download/View CV buttons show as disabled and the CV page tells visitors it is unavailable. |
| 2 | **Public URL** | run `python tools/set-site-url.py https://YOURNAME.github.io/Web_Portfolio` once you know it | Placeholder `https://YOUR-USERNAME.github.io/Web_Portfolio` is in canonical links, Open Graph tags, `sitemap.xml`, `robots.txt`, `404.html`. |
| 3 | **Formspree form** | `contact.html` → `<form ... action="https://formspree.io/f/xgaaayvg">` | This ID was already in your original code. Log in at formspree.io and confirm that ID is *your* form, that it is activated (confirm the email Formspree sent) and that submissions go to your email. If not, create a form and replace the ID. |
| 4 | Professional goals sentence | `about.html` (see the `TODO` comment) | The course brief asks for it; none was in your original text, so none was invented. |
| 5 | Confirm contact details | `js/site.js` (top, `SITE`) | Your original pages disagreed: most used `jobertcabrera29@gmail.com` / `+63 994 338 9419`; Experience, Education, CV and 404 used `jobertcabrera21@gmail.com` / `+63 964 338 9439`. The first set (used on the Contact page) was kept. Change it in one place if wrong. |

Contact details, social links and the CV filename all live in `SITE` at the top of `js/site.js`. Every page reads them from there.

## 3. Publish on GitHub Pages (free, HTTPS included)
1. Create a GitHub account → **New repository** → name it `Web_Portfolio` → **Public**.
2. Upload the *contents* of this folder (so `index.html` is at the top of the repo; keep `assets/`, `css/`, `js/`, `data/`, `projects/`).
3. **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save.**
4. After 1–2 minutes the site is live at `https://<your-username>.github.io/Web_Portfolio/`.
5. Run the URL tool from step 2 (or edit by hand), upload the changed files again, and wait a minute.

Note: this PDF requires a working public URL by **Nov 1, 2026, 11:59 PM**. The site is not deployed until you do these steps.

## 4. After it is online — test it
- [ ] The URL opens over **https** and every menu link works (also on your phone, with the ☰ menu)
- [ ] Projects: search, each filter, reset; each project page opens and its images load
- [ ] **Download CV** downloads `Jobert_Cabrera_CV.pdf`; **View CV online** opens the PDF in a new tab
- [ ] Send a real message through the contact form and confirm it reaches your inbox
- [ ] Dark/light toggle works and is remembered after refresh
- [ ] `https://<your-url>/sitemap.xml` and `/robots.txt` open; visit a wrong address to see the 404 page
- [ ] Browser console (F12) shows no red errors
- Optional: add the site to Google Search Console and submit `sitemap.xml`.

## 5. Adding or editing a project
Everything about projects is in **`data/projects-data.js`**. The home page, project cards, search/filters and detail pages all read from it.
1. Copy an existing project object, give it a new unique `id`.
2. Copy the folder `projects/brew-haven` to `projects/<new-id>` and, in its `index.html`, change `data-id`, the `<title>`, the two description texts and the `canonical`/`og:url` address.
3. Put images in `assets/` (PNG/JPG, plus an optional `.webp` copy with the same name; the site uses WebP when it exists).
4. Add the new page to `sitemap.xml`.

Leave `url`, `github`, `demo` as `""` if you have none; empty links are never shown.

## 6. Folder map
```
index.html about.html skills.html experience.html projects.html education.html cv.html contact.html 404.html
projects/<id>/index.html     one small page per project (content comes from the data file)
css/style.css                the only stylesheet (design tokens at the top, light + dark theme)
js/theme-init.js             applies the saved theme before the page paints (loaded in <head>)
js/site.js                   header, footer, mobile menu, theme toggle, CV check, site details
js/projects.js               project cards, search + filters, detail pages, lightbox
js/contact.js                form validation + Formspree submission
data/projects-data.js        project data
assets/                      your artwork (PNG/JPG originals + WebP copies), profile photo, og-image.jpg
tools/set-site-url.py        replaces the placeholder URL everywhere
```

## 7. Security notes
- No API keys or secrets are in the code. The Formspree form ID is a public endpoint by design; spam is limited by Formspree's own filtering plus the hidden honeypot field.
- A Content-Security-Policy `<meta>` on each page allows only your own scripts/styles, Google Fonts and Formspree. If you add analytics or another third-party script, add its address to that policy.
- All text from the data file is escaped before it is inserted into the page; only `http(s)` links are ever rendered.
