/* ==========================================================================
   projects.js — loaded on the home page, Projects page and project pages.
   Reads window.PROJECTS (data/projects-data.js) and builds:
     • #featured-projects  (home)            • #projects-app    (search + filters)
     • #project-detail     (project pages)
   Requires site.js to be loaded first (window.JC).
   ========================================================================== */
(function () {
    "use strict";
    const { ROOT, esc, picture } = window.JC;
    const PROJECTS = window.PROJECTS || [];
    const $ = (sel, el) => (el || document).querySelector(sel);

    const projectUrl = (p) => `${ROOT}projects/${encodeURIComponent(p.id)}/`;
    const isHttp = (u) => /^https?:\/\//i.test(u || "");   // only ever render real web links

    /* ---------- one card, used by the home page AND the Projects page ---------- */
    function cardHTML(p) {
        const extra = [
            isHttp(p.github) ? `<a href="${esc(p.github)}" target="_blank" rel="noopener noreferrer">Source code</a>` : "",
            isHttp(p.demo) ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer">Demo</a>` : ""
        ].filter(Boolean).join(" · ");
        return `<li class="project-card reveal" data-id="${esc(p.id)}">
            <div class="project-card__media">${picture(p.image, p.imageAlt || p.name)}</div>
            <div class="project-card__meta"><span>${esc(p.category)}</span><span>${esc(p.type)}</span></div>
            <h3><a href="${projectUrl(p)}">${esc(p.name)}</a></h3>
            <p>${esc(p.description)}</p>
            <ul class="tags" aria-label="Tools used">${p.technologies.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}</ul>
            <div class="project-card__foot">
                <span>${esc(p.role)} · ${esc(p.year)} · ${esc(p.status)}</span>
                ${extra || `<span aria-hidden="true">View project →</span>`}
            </div>
        </li>`;
    }

    /* ---------- home: featured work ---------- */
    function initFeatured() {
        const mount = $("#featured-projects");
        if (!mount) return;
        mount.innerHTML = PROJECTS.filter((p) => p.featured).map(cardHTML).join("");
        window.JC.initReveal(mount);
    }

    /* ---------- Projects page: search + filters ---------- */
    function initProjectsPage() {
        const app = $("#projects-app");
        if (!app) return;

        const grid = $("#projects-grid");
        const search = $("#project-search");
        const count = $("#result-count");
        const chips = $("#active-filters");
        const reset = $("#reset-filters");
        const empty = $("#empty-state");

        const FACETS = [
            { key: "category", label: "Category", get: (p) => [p.category] },
            { key: "type", label: "Project type", get: (p) => [p.type] },
            { key: "year", label: "Year", get: (p) => [p.year] },
            { key: "tech", label: "Technology", get: (p) => p.technologies }
        ];
        const state = { q: "", category: "", type: "", year: "", tech: "" };

        // Build each <select> from the data, so new projects appear automatically
        FACETS.forEach((f) => {
            const select = $("#filter-" + f.key);
            const values = [...new Set(PROJECTS.flatMap(f.get))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
            select.insertAdjacentHTML("beforeend", values.map((v) => `<option value="${esc(v)}">${esc(v)}</option>`).join(""));
            select.addEventListener("change", () => { state[f.key] = select.value; update(); });
        });

        grid.innerHTML = PROJECTS.map(cardHTML).join("");
        window.JC.initReveal(grid);

        const haystack = (p) => [p.name, p.description, p.category, p.type, p.year, p.role, p.status, ...p.technologies].join(" ").toLowerCase();
        const cache = new Map(PROJECTS.map((p) => [p.id, haystack(p)]));

        function matches(p) {
            const terms = state.q.toLowerCase().split(/\s+/).filter(Boolean);
            const text = cache.get(p.id);
            if (!terms.every((t) => text.includes(t))) return false;
            return FACETS.every((f) => !state[f.key] || f.get(p).includes(state[f.key]));
        }

        function update() {
            let shown = 0;
            PROJECTS.forEach((p) => {
                const card = grid.querySelector(`[data-id="${CSS.escape(p.id)}"]`);
                const ok = matches(p);
                card.hidden = !ok;
                if (ok) shown++;
            });
            const active = FACETS.filter((f) => state[f.key]);
            if (state.q.trim()) active.unshift({ key: "q", label: "Search" });

            count.textContent = shown === PROJECTS.length && !active.length
                ? `Showing all ${PROJECTS.length} projects`
                : `${shown} of ${PROJECTS.length} projects match`;
            chips.innerHTML = active.map((f) =>
                `<li><button type="button" class="tag" data-remove="${f.key}" aria-label="Remove filter ${esc(f.label)}: ${esc(state[f.key])}">${esc(f.label)}: ${esc(state[f.key].trim())} <span aria-hidden="true">×</span></button></li>`).join("");
            reset.hidden = !active.length;
            empty.hidden = shown > 0;
            grid.hidden = shown === 0;
        }

        function clear(key) {
            state[key] = "";
            if (key === "q") search.value = "";
            else $("#filter-" + key).value = "";
        }

        search.addEventListener("input", () => { state.q = search.value; update(); });
        chips.addEventListener("click", (e) => {
            const b = e.target.closest("[data-remove]");
            if (b) { clear(b.dataset.remove); update(); search.focus(); }
        });
        app.addEventListener("click", (e) => {
            if (e.target.closest("[data-reset]")) { Object.keys(state).forEach(clear); update(); search.focus(); }
        });
        $("#project-filters").addEventListener("submit", (e) => e.preventDefault());
        update();
    }

    /* ---------- project detail page ---------- */
    function initDetail() {
        const mount = $("#project-detail");
        if (!mount) return;
        const index = PROJECTS.findIndex((p) => p.id === mount.dataset.id);
        const p = PROJECTS[index];
        if (!p) {
            mount.innerHTML = `<div class="page-head"><h1>Project not found</h1><p class="lede">That project does not exist. <a href="${ROOT}projects.html">Browse all projects</a>.</p></div>`;
            return;
        }
        const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
        const next = PROJECTS[(index + 1) % PROJECTS.length];
        const links = [
            [p.url, "Live project"], [p.demo, "Demo"], [p.github, "Source code"]
        ].filter(([u]) => isHttp(u)).map(([u, label]) =>
            `<a class="btn btn--ghost" href="${esc(u)}" target="_blank" rel="noopener noreferrer">${label}</a>`).join("");
        const lead = p.gallery.length > 1 && p.gallery.length % 2 === 1 ? " gallery--lead" : "";

        mount.innerHTML = `
            <p class="crumbs"><a href="${ROOT}projects.html">Projects</a> / <span>${esc(p.name)}</span></p>
            <header class="detail-head">
                <p class="kicker">${esc(p.category)} · ${esc(p.type)}</p>
                <h1>${esc(p.name)}</h1>
                <p class="lede">${esc(p.description)}</p>
            </header>
            <dl class="meta-grid">
                <div><dt>Year</dt><dd>${esc(p.year)}</dd></div>
                <div><dt>My role</dt><dd>${esc(p.role)}</dd></div>
                <div><dt>Status</dt><dd>${esc(p.status)}</dd></div>
                <div><dt>Category</dt><dd>${esc(p.category)}</dd></div>
                <div><dt>Type</dt><dd>${esc(p.type)}</dd></div>
            </dl>
            <div class="detail-cols">
                <section><h2>Problem</h2><p>${esc(p.problem)}</p></section>
                <section><h2>Solution</h2><p>${esc(p.solution)}</p></section>
                <section><h2>Key features</h2><ul class="bullet-list">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul></section>
                <section><h2>Technologies used</h2><ul class="tags">${p.technologies.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}</ul>${links ? `<div class="btn-row mt-3">${links}</div>` : ""}</section>
            </div>
            <h2 class="visually-hidden">Gallery</h2>
            <ul class="gallery${lead}">${p.gallery.map((g, i) => `
                <li class="reveal"><figure class="shot">
                    <button type="button" class="shot__btn" data-index="${i}" aria-label="View larger: ${esc(g.title)}">${picture(g.image, g.alt || g.title)}</button>
                    <figcaption><strong>${esc(g.title)}</strong><span>${esc(g.text)}</span></figcaption>
                </figure></li>`).join("")}
            </ul>
            <nav class="pager" aria-label="More projects">
                <a href="${projectUrl(prev)}" rel="prev"><small>← Previous</small><strong>${esc(prev.name)}</strong></a>
                <a href="${projectUrl(next)}" rel="next"><small>Next →</small><strong>${esc(next.name)}</strong></a>
            </nav>
            <p class="mt-4"><a class="btn btn--ghost" href="${ROOT}projects.html">← Back to all projects</a></p>`;
        window.JC.initReveal(mount);
        initLightbox(mount, p);
    }

    /* ---------- lightbox: native <dialog>, so Esc + focus handling come built in ---------- */
    function initLightbox(mount, p) {
        const dlg = document.createElement("dialog");
        dlg.className = "lightbox";
        dlg.setAttribute("aria-label", "Image viewer");
        dlg.innerHTML = `<div class="lightbox__inner">
            <div class="lightbox__stage"></div>
            <div class="lightbox__bar">
                <p></p>
                <span class="btn-row">
                    <button type="button" class="icon-btn" data-step="-1" aria-label="Previous image">←</button>
                    <button type="button" class="icon-btn" data-step="1" aria-label="Next image">→</button>
                    <button type="button" class="icon-btn" data-close aria-label="Close image viewer">✕</button>
                </span>
            </div></div>`;
        document.body.appendChild(dlg);
        const stage = $(".lightbox__stage", dlg), caption = $("p", dlg);
        let current = 0, opener = null;

        function show(i) {
            current = (i + p.gallery.length) % p.gallery.length;
            const g = p.gallery[current];
            stage.innerHTML = picture(g.image, g.alt || g.title, { eager: true });
            caption.textContent = `${g.title} (${current + 1} / ${p.gallery.length})`;
        }
        mount.addEventListener("click", (e) => {
            const b = e.target.closest(".shot__btn");
            if (!b) return;
            opener = b;
            show(Number(b.dataset.index));
            dlg.showModal();
        });
        dlg.addEventListener("click", (e) => {
            if (e.target.closest("[data-close]") || e.target === dlg) dlg.close();
            const step = e.target.closest("[data-step]");
            if (step) show(current + Number(step.dataset.step));
        });
        dlg.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") show(current + 1);
            if (e.key === "ArrowLeft") show(current - 1);
        });
        dlg.addEventListener("close", () => { if (opener) opener.focus(); });
    }

    /* ---------- skills page: tools and media taken straight from the project data ---------- */
    function initTools() {
        const mount = $("#project-tools");
        if (!mount) return;
        const tools = [...new Set(PROJECTS.flatMap((p) => p.technologies))].sort((a, b) => a.localeCompare(b));
        mount.innerHTML = tools.map((t) => `<li class="tag">${esc(t)}</li>`).join("");
    }

    initFeatured();
    initTools();
    initProjectsPage();
    initDetail();
})();
