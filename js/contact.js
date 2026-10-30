/* ==========================================================================
   contact.js — contact page only.
   Validates the form, then sends it to Formspree with fetch() so the page
   does not reload. The endpoint is the form's own `action` attribute in
   contact.html (change it there). Spam protection: Formspree's honeypot
   field "_gotcha" (hidden from people, filled in by bots).
   ========================================================================== */
(function () {
    "use strict";
    const form = document.getElementById("contact-form");
    if (!form) return;
    const { SITE } = window.JC;
    const status = document.getElementById("form-status");
    const submit = form.querySelector('button[type="submit"]');

    const RULES = {
        name: { min: 2, max: 100, msg: "Please enter your name (2–100 characters)." },
        email: { max: 254, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, msg: "Please enter a valid email address, like name@example.com." },
        subject: { min: 3, max: 150, msg: "Please add a subject (3–150 characters)." },
        message: { min: 10, max: 2000, msg: "Please write a message of at least 10 characters (max 2000)." }
    };

    function validateField(name) {
        const input = form.elements[name];
        const rule = RULES[name];
        const value = input.value.trim();
        const ok = (!rule.min || value.length >= rule.min) && (!rule.max || value.length <= rule.max) && (!rule.pattern || rule.pattern.test(value));
        const wrap = input.closest(".field");
        const err = document.getElementById("error-" + name);
        wrap.dataset.invalid = String(!ok);
        input.setAttribute("aria-invalid", String(!ok));
        err.textContent = ok ? "" : rule.msg;
        return ok;
    }

    function show(state, html) {
        status.hidden = false;
        status.dataset.state = state;
        status.innerHTML = html;
    }

    // Live feedback once a field has been touched
    Object.keys(RULES).forEach((name) => {
        form.elements[name].addEventListener("blur", () => validateField(name));
        form.elements[name].addEventListener("input", () => {
            if (form.elements[name].closest(".field").dataset.invalid === "true") validateField(name);
        });
    });
    const counter = document.getElementById("message-count");
    form.elements.message.addEventListener("input", () => { counter.textContent = `${form.elements.message.value.length} / 2000`; });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (submit.disabled) return;                             // block double submits
        const results = Object.keys(RULES).map(validateField);
        if (results.includes(false)) {
            show("error", "Please fix the highlighted fields and try again.");
            form.querySelector('[aria-invalid="true"]').focus();
            return;
        }
        if (form.elements._gotcha.value) {                       // honeypot filled: it is a bot. Pretend success, send nothing.
            show("success", "Thank you! Your message was sent.");
            form.reset();
            return;
        }
        if (/YOUR_FORM_ID/.test(form.action)) {
            show("error", "The contact form has not been set up yet (missing Formspree form ID).");
            return;
        }

        submit.disabled = true;
        const label = submit.textContent;
        submit.textContent = "Sending…";
        show("", "Sending your message…");
        try {
            const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
            if (res.ok) {
                show("success", "Thank you! Your message was submitted. I will reply to the email address you gave.");
                form.reset();
                counter.textContent = "0 / 2000";
            } else {
                let detail = "";
                try { const data = await res.json(); detail = (data.errors || []).map((x) => x.message).join(" "); } catch (err) { /* no JSON body */ }
                show("error", `Sorry, the message could not be sent${detail ? " (" + window.JC.esc(detail) + ")" : ""}. Please email me directly at <a href="mailto:${window.JC.esc(SITE.email)}">${window.JC.esc(SITE.email)}</a>.`);
            }
        } catch (err) {
            show("error", `Network problem: your message was not sent. Please check your connection or email me directly at <a href="mailto:${window.JC.esc(SITE.email)}">${window.JC.esc(SITE.email)}</a>.`);
        } finally {
            submit.disabled = false;
            submit.textContent = label;
        }
    });
})();
