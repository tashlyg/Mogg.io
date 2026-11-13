// Apply the saved theme before styles load, then connect the sidebar switch.
(function initializeTheme() {
    const storageKey = "mogg.theme";
    const root = document.documentElement;

    function readTheme() {
        try {
            return localStorage.getItem(storageKey) === "dark" ? "dark" : "light";
        } catch (error) {
            return null;
        }
    }

    function applyTheme(theme, saved = true) {
        root.setAttribute("data-bs-theme", theme);
        const toggle = document.getElementById("theme-toggle");
        const status = document.getElementById("theme-status");
        if (toggle) toggle.checked = theme === "dark";
        if (status) {
            status.textContent = (theme === "dark" ? "Dark" : "Light")
                + " mode is on" + (saved ? "." : " for this visit.");
        }
    }

    applyTheme(readTheme() || "light");

    function connectSwitch() {
        const toggle = document.getElementById("theme-toggle");
        if (!toggle) return;
        applyTheme(root.getAttribute("data-bs-theme"));
        toggle.addEventListener("change", function () {
            const theme = toggle.checked ? "dark" : "light";
            let saved = true;
            try {
                localStorage.setItem(storageKey, theme);
            } catch (error) {
                saved = false;
            }
            applyTheme(theme, saved);
        });
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", connectSwitch);
    else connectSwitch();

    // Keep open tabs and pages restored with Back/Forward consistent.
    window.addEventListener("storage", function (event) {
        if (event.key === storageKey || event.key === null) applyTheme(readTheme() || "light");
    });
    window.addEventListener("pageshow", function () {
        const savedTheme = readTheme();
        if (savedTheme) applyTheme(savedTheme);
    });
})();
