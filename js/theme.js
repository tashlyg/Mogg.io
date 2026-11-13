// Apply saved appearance before styles load, then connect the sidebar controls.
(function initializeTheme() {
    const storageKey = "mogg.theme";
    const backgroundKey = "mogg.background";
    const backgrounds = ["default", "aqua", "peach", "sage"];
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

    function readBackground() {
        try {
            const background = localStorage.getItem(backgroundKey);
            return backgrounds.includes(background) ? background : "default";
        } catch (error) {
            return null;
        }
    }

    function applyBackground(background, saved = true) {
        if (background === "default") root.removeAttribute("data-background");
        else root.setAttribute("data-background", background);

        const status = document.getElementById("background-status");
        if (status) {
            status.textContent = "Background: " + background
                + (saved ? "." : " (for this visit).");
        }
    }

    applyTheme(readTheme() || "light");
    applyBackground(readBackground() || "default");

    function connectSettings() {
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

        applyBackground(root.getAttribute("data-background") || "default");
        document.getElementById("change-background").addEventListener("click", function () {
            const current = root.getAttribute("data-background") || "default";
            const next = backgrounds[(backgrounds.indexOf(current) + 1) % backgrounds.length];
            let saved = true;
            try {
                localStorage.setItem(backgroundKey, next);
            } catch (error) {
                saved = false;
            }
            applyBackground(next, saved);
        });
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", connectSettings);
    else connectSettings();

    // Keep open tabs and pages restored with Back/Forward consistent.
    window.addEventListener("storage", function (event) {
        if (event.key === storageKey || event.key === null) applyTheme(readTheme() || "light");
        if (event.key === backgroundKey || event.key === null) applyBackground(readBackground() || "default");
    });
    window.addEventListener("pageshow", function () {
        const savedTheme = readTheme();
        if (savedTheme) applyTheme(savedTheme);
        const savedBackground = readBackground();
        if (savedBackground) applyBackground(savedBackground);
    });
})();
