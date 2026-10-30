/* Runs in <head> BEFORE the page paints so the saved theme is applied with no flash.
   The toggle button itself lives in site.js. Keep this file tiny. */
(function () {
    var theme = null;
    try { theme = localStorage.getItem("theme"); } catch (e) { /* storage blocked: fall back to system */ }
    if (theme !== "dark" && theme !== "light") {
        theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    var root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.classList.add("js");
})();
