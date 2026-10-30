/* ==========================================================================
   site.js — loaded on EVERY page. Owns everything shared:
   site details, header + footer, active nav, mobile menu, theme toggle,
   scroll reveal, and the CV-file check.
   ========================================================================== */
(function () {
    "use strict";

    /* ---------- 1. Site details (single source of truth) ---------- */
    const SITE = {
        name: "Jobert R. Cabrera",
        brand: "Jobert Cabrera",
        initials: "JC",
        title: "Graphic Designer",
        email: "jobertcabrera29@gmail.com",
        phone: "+63 994 338 9419",
        location: "Calamba, Laguna, Philippines",
        cvFile: "assets/CV.pdf",           // put your PDF here with exactly this name
        cvDownloadName: "Jobert_Cabrera_CV.pdf",
        socials: [
            { label: "LinkedIn", url: "https://www.linkedin.com/in/jobert-cabrera-55b03a447/", icon: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>' },
            { label: "GitHub", url: "https://github.com/jobertcabrera", icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>' },
            { label: "Facebook", url: "https://www.facebook.com/jobert.cabrera29", icon: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>' },
            { label: "Instagram", url: "https://www.instagram.com/manhuawha_jajajajaj/", icon: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>' }
        ]
    };

    // RUBRIC #12: Navigation MUST include Home, About, Skills, Experience, Projects, Education, CV, Contact.
    const NAV = [
        { id: "home", label: "Home", href: "index.html" },
        { id: "about", label: "About", href: "about.html" },
        { id: "skills", label: "Skills", href: "skills.html" },
        { id: "experience", label: "Experience", href: "experience.html" },
        { id: "projects", label: "Projects", href: "projects.html" },
        { id: "education", label: "Education", href: "education.html" },
        { id: "cv", label: "CV", href: "cv.html" },
        { id: "contact", label: "Contact", href: "contact.html" }
    ];
    const FOOTER_NAV = NAV; // Footer can use the exact same list

    /* ---------- 2. Helpers shared with projects.js ---------- */
    const ROOT = document.body.dataset.root || "";
    const PAGE = document.body.dataset.page || "";

    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

    function picture(src, alt, opts) {
        const o = opts || {};
        const webp = src.replace(/\.(png|jpe?g)$/i, ".webp");
        const attrs = (o.cls ? ` class="${esc(o.cls)}"` : "") +
            (o.w && o.h ? ` width="${o.w}" height="${o.h}"` : "") +
            ` loading="${o.eager ? "eager" : "lazy"}" decoding="async"` +
            (o.eager ? ' fetchpriority="high"' : "");
        const source = webp !== src ? `<source type="image/webp" srcset="${ROOT}${esc(webp)}">` : "";
        return `<picture>${source}<img src="${ROOT}${esc(src)}" alt="${esc(alt)}"${attrs}></picture>`;
    }
    window.JC = { SITE, ROOT, esc, picture };

    const icon = (paths) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
    const socialsHTML = () => `<ul class="socials">${SITE.socials.map((s) =>
        `<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.label)} (opens in a new tab)">${icon(s.icon)}</a></li>`).join("")}</ul>`;

    /* ---------- 3. Header & footer ---------- */
    function renderHeader() {
        const mount = document.getElementById("site-header");
        if (!mount) return;
        const links = NAV.map((n) =>
            `<li><a class="nav__link" href="${ROOT}${n.href}"${n.id === PAGE ? ' aria-current="page"' : ""}>${n.label}</a></li>`).join("");
        mount.innerHTML = `
            <div class="container site-header__inner">
                <a class="brand" href="${ROOT}index.html" aria-label="${esc(SITE.brand)}, home"><span class="brand__mark" aria-hidden="true">${SITE.initials}</span><span>${esc(SITE.brand)}</span></a>
                <nav class="nav" aria-label="Main">
                    <ul class="nav__list" id="nav-list">${links}</ul>
                    <button type="button" class="icon-btn theme-toggle" id="theme-toggle" aria-label="Switch to dark theme">
                        ${icon('<path class="icon-moon" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/><g class="icon-sun"><circle cx="12" cy="12" r="4.5"/><path d="M12 1.5v2.5M12 20v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M1.5 12H4M20 12h2.5M4.2 19.8 6 18M18 6l1.8-1.8"/></g>')}
                    </button>
                    <button type="button" class="icon-btn nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-list"><span class="nav-toggle__bars" aria-hidden="true"></span></button>
                </nav>
            </div>`;
        mount.classList.add("site-header");
    }

    function renderFooter() {
        const mount = document.getElementById("site-footer");
        if (!mount) return;
        mount.className = "site-footer";
        mount.innerHTML = `
            <div class="container site-footer__grid">
                <div>
                    <h2>${esc(SITE.name)}</h2>
                    <p>${esc(SITE.title)}</p>
                    <p><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></p>
                    ${socialsHTML()}
                </div>
                <nav aria-label="Footer"><h3>Pages</h3><ul>${FOOTER_NAV.slice(0, 4).map((n) => `<li><a href="${ROOT}${n.href}">${n.label}</a></li>`).join("")}</ul></nav>
                <nav aria-label="More"><h3>More</h3><ul>${FOOTER_NAV.slice(4).map((n) => `<li><a href="${ROOT}${n.href}">${n.label}</a></li>`).join("")}</ul></nav>
            </div>
            <div class="site-footer__legal"><div class="container"><p>&copy; ${new Date().getFullYear()} ${esc(SITE.name)}. All rights reserved.</p></div></div>`;
    }

    function fillSiteFields() {
        document.querySelectorAll("[data-site]").forEach((el) => {
            const key = el.dataset.site;
            const value = SITE[key];
            if (!value) return;
            if (key === "email" || key === "phone") {
                const a = document.createElement("a");
                a.href = key === "email" ? "mailto:" + value : "tel:" + value.replace(/[^+\d]/g, "");
                a.textContent = value;
                el.replaceChildren(a);
            } else {
                el.textContent = value;
            }
        });
        document.querySelectorAll("[data-socials]").forEach((el) => { el.innerHTML = socialsHTML(); });
    }

    /* ---------- 4. Mobile menu ---------- */
    function initMenu() {
        const btn = document.getElementById("nav-toggle");
        const list = document.getElementById("nav-list");
        if (!btn || !list) return;
        const mq = window.matchMedia("(max-width: 980px)");

        function setOpen(open, returnFocus) {
            list.classList.toggle("is-open", open);
            btn.setAttribute("aria-expanded", String(open));
            btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
            if (!open && returnFocus) btn.focus();
        }
        btn.addEventListener("click", () => setOpen(!list.classList.contains("is-open")));
        list.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
        document.addEventListener("keydown", (e) => { if (e.key === "Escape" && list.classList.contains("is-open")) setOpen(false, true); });
        document.addEventListener("click", (e) => { if (list.classList.contains("is-open") && !e.target.closest(".site-header")) setOpen(false); });
        mq.addEventListener("change", () => setOpen(false));
    }

    /* ---------- 5. Theme toggle ---------- */
    function initTheme() {
        const btn = document.getElementById("theme-toggle");
        if (!btn) return;
        const root = document.documentElement;
        const sync = () => btn.setAttribute("aria-label", root.getAttribute("data-theme") === "dark" ? "Switch to light theme" : "Switch to dark theme");
        sync();
        btn.addEventListener("click", () => {
            const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", next);
            try { localStorage.setItem("theme", next); } catch (e) { }
            sync();
        });
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        mq.addEventListener("change", (e) => {
            let saved = null;
            try { saved = localStorage.getItem("theme"); } catch (err) { }
            if (!saved) { root.setAttribute("data-theme", e.matches ? "dark" : "light"); sync(); }
        });
    }

    /* ---------- 6. Scroll reveal ---------- */
    function initReveal(scope) {
        const items = (scope || document).querySelectorAll(".reveal:not(.is-visible)");
        if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            items.forEach((el) => el.classList.add("is-visible"));
            return;
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
        }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
        items.forEach((el) => io.observe(el));
    }
    window.JC.initReveal = initReveal;

    /* ---------- 7. CV links ---------- */
    function initCV() {
        const links = document.querySelectorAll("[data-cv]");
        if (!links.length) return;
        const url = ROOT + SITE.cvFile;
        links.forEach((a) => {
            a.href = url;
            if (a.dataset.cv === "download") a.setAttribute("download", SITE.cvDownloadName);
            if (a.dataset.cv === "view") { a.target = "_blank"; a.rel = "noopener"; }
        });
        if (!window.fetch || location.protocol === "file:") return;
        fetch(url, { method: "HEAD", cache: "no-store" }).then((res) => {
            if (res.status !== 404) return;
            links.forEach((a) => { a.setAttribute("aria-disabled", "true"); a.removeAttribute("href"); a.removeAttribute("download"); });
            const note = document.getElementById("cv-missing");
            if (note) note.hidden = false;
        }).catch(() => { });
    }

    /* ---------- boot ---------- */
    renderHeader();
    renderFooter();
    fillSiteFields();
    initMenu();
    initTheme();
    initCV();
    initReveal();
})();