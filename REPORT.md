# Change report, duplicate-code report and test checklist

## 1. What was wrong in the original (audit)
- Two half-merged generations of pages: 4 pages had SEO tags, theme-flash script and skip link; 8 did not. Nav differed by page (4–8 items; "Experience/Education/CV" missing on most pages).
- **Two different email/phone pairs** across pages. `project-detail.html` was broken (script looked for a different container id). `projects.json` and `projects-data.js` held conflicting project names (e.g. Orange Slice was "Design Foundations…" in one file).
- Hamburger menu had no accessibility, no Esc/close-on-link. Theme toggle used per-page inline `style` swapping.
- Detail pages used large inline `style=""` blocks with hard-coded colors that broke in dark mode. Placeholder-image `onerror` hacks pointed at an external site.
- Skills page used invented percentage bars (Figma 90% etc.); no CV PDF existed; contact form had no JS validation or feedback; `404.html` used absolute placeholder URLs for everything.
- No Open Graph image of correct size, `sitemap.xml` listed `.html` pages inconsistently, no CSP.

## 2. What was done
- New design system (editorial look: warm paper + ink + one orange accent, Fraunces + Hanken Grotesk), light and dark themes, consistent buttons/cards/forms, subtle reveal motion that respects reduced-motion.
- One shared header/footer/nav/theme/menu implementation in `js/site.js`; one stylesheet; one data file.
- Search + 4 combinable filters (category, type, year, technology), removable filter chips, reset, empty state, live result count.
- Project detail pages built from data (problem, solution, features, tools, gallery with accessible lightbox, prev/next, back link). Links shown only if they exist.
- CV buttons (download + open in new tab) with automatic "file missing" handling. Contact form with validation, honeypot, Formspree via fetch, success/error states, email fallback.
- SEO: unique title/description/canonical/OG/Twitter on every page, JSON-LD Person, `robots.txt`, `sitemap.xml`, new 1200×630 `og-image.jpg` made from your artwork.
- Performance/security: WebP with PNG/JPG fallback (`<picture>`), lazy loading, explicit dimensions on the profile photo, CSP meta, escaped rendering, no inline scripts/styles.
- Content kept as you wrote it. Skills percentages replaced by your own level words (Advanced / Strong / Proficient). Footer no longer prints your phone number on every page (it stays on About and Contact).

## 3. Duplicate-code report
| Area | Before | After |
|---|---|---|
| Nav markup | 14 copies (differing) | 1 (`js/site.js`) |
| Footer markup | 14 copies (differing) | 1 |
| Theme toggle logic + moon/sun SVG | 14 SVG copies, 4 inline scripts + 1 toggle script | `theme-init.js` (head, 12 lines) + one toggle in `site.js` |
| Project data | `projects.json` **and** `projects-data.js`, conflicting | `data/projects-data.js` only |
| Detail pages | `project-detail.html` (broken) + 4 project pages | 4 small project pages (content from data) |
| Project card renderer / search | 1 card function, 1 search; detail page had inline styles | 1 card function used by home + Projects page |
| CSS selectors defined more than once | 110 of 380 | remaining repeats are grouped heading selectors and responsive overrides; none conflict |
| Unused CSS classes | many (`contact-box`, `cool-*`, `premium-*`…) | 0 found |
| Unreferenced assets | — | 0 (PNG/JPG originals are the WebP fallbacks) |

**Files retired (not in the new folder; your original ZIP still has them):** `project-detail.html` (broken, referenced nowhere), `projects.json` (duplicate, referenced nowhere), root `style.css`/`script.js`/`projects-data.js` (replaced by `css/`, `js/`, `data/`), the old `og-image.jpg` (600×600, replaced).

**Duplication intentionally kept:** each page's `<head>` metadata (must be unique per page for SEO); 4 near-identical `projects/<id>/index.html` stubs (needed for clean URLs on static hosting, each has its own title/description/canonical); the PNG/JPG + WebP pairs (fallbacks).
I did not verify the site is "duplicate-free" in an absolute sense; the checks were selector/markup counts and a class-usage scan.

## 4. Tested (real browser, Chromium via Playwright, local server)
- 12 pages × 4 widths (375, 768, 1024, 1440): no horizontal overflow, no broken/unloaded images, one `<h1>` per page, no JS errors, no CSP violations. **PASS**
- 148 functional checks: nav links/active states on all pages (incl. nested), theme toggle + localStorage + persistence across reload and pages + system-dark default, all search/filter combinations, empty state, chips, reset, card → correct detail page, title/description in each project page match the data, lightbox (open, next, Esc, focus return), CV states (missing → disabled + notice; present → link, download attribute, download event), form validation, honeypot, success / server-error / network-error paths (Formspree **mocked**), mobile menu (open, Esc, link, outside click, resize), skip link, focus outline. **148/148 PASS**
- Static: every local `href`/`src`/data-image path resolves except `assets/CV.pdf` (missing, see below); unique titles; meta tags on every page; sitemap lists 12 URLs; URL tool and 404 page verified on a copy served under a sub-path.
- Contrast: all text/background pairs ≥ 4.5:1 in both themes (calculated).

## 5. NOT tested / still open
- **Not deployed.** No public URL exists yet; HTTPS, DNS and public-URL checks are unverified until you deploy.
- **A real form submission was not sent** (Formspree was mocked). Whether `xgaaayvg` is your active form and delivers to your inbox is unverified.
- **CV PDF missing** → put it at `assets/CV.pdf`.
- GitHub / LinkedIn / Facebook / Instagram URLs were kept from your original; I could not open them from here, so they are unverified. The Instagram handle (`manhuawha_jajajajaj`) looks personal; remove it from `js/site.js` if you do not want it on a professional site.
- Google Fonts could not load in my sandbox, so I saw the fallback serif/sans fonts; the real fonts will load online (check the look once deployed).
- Real phones/Safari/Firefox were not tested (Chromium only). Lighthouse was not run.
- Content to confirm: "2+ years" experience vs. freelance dates 2025–2026; professional goals sentence (missing); which email/phone is correct; "Available for work" badge.
- Optional analytics were not added (not required; would need a CSP update).
