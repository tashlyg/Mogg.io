$(document).ready(function () {
    // Assignment 6, task 0: check that jQuery has loaded.
    console.log("jQuery is ready!");

    // Task 1: show only tips containing the search text.
    $("#habit-search").on("input", function () {
        const query = $(this).val().trim().toLowerCase();

        $("#habit-results li").each(function () {
            const matches = $(this).text().toLowerCase().includes(query);
            $(this).toggle(matches);
        });

        $("#no-habits").toggle($("#habit-results li:visible").length === 0);
    });

    // Task 2: suggest matching tip names in a dropdown.
    $("#habit-search").on("input", function () {
        const query = $(this).val().trim().toLowerCase();
        const suggestions = $("#habit-suggestions");
        suggestions.empty().hide();
        if (query === "") return;

        $(".habit-title").each(function () {
            const title = $(this).text();
            if (title.toLowerCase().includes(query)) {
                const button = $("<button>").attr("type", "button").text(title);
                suggestions.append($("<li>").append(button));
            }
        });

        suggestions.toggle(suggestions.children().length > 0);
    });

    $("#habit-suggestions").on("click", "button", function () {
        $("#habit-search").val($(this).text()).trigger("input").trigger("focus");
        $("#habit-suggestions").hide();
    });

    $("#habit-search").on("keydown", function (event) {
        if (event.key === "Escape") $("#habit-suggestions").hide();
    });

    $(document).on("click focusin", function (event) {
        if ($(event.target).closest(".habit-search-box").length === 0) {
            $("#habit-suggestions").hide();
        }
    });

    // Task 3: highlight every match without replacing buttons or other elements.
    $("#habit-search").on("input", function () {
        $("mark.search-match").contents().unwrap();
        document.body.normalize(); // Join text again after removing old highlights.

        const query = $(this).val().trim();
        if (query === "") return;

        // Treat symbols such as "." and "(" as text, not regex commands.
        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const pattern = new RegExp("(" + escapedQuery + ")", "gi");

        $("body *").not("script, style, textarea, option, .habit-search-box, .habit-search-box *")
            .contents().filter(function () {
                return this.nodeType === 3; // Search text nodes only.
            }).each(function () {
                const parts = this.textContent.split(pattern);
                if (parts.length === 1) return;

                const fragment = document.createDocumentFragment();
                parts.forEach(function (part, index) {
                    // Captured matches are at odd positions in the split array.
                    const node = index % 2 === 1
                        ? $("<mark>").addClass("search-match").text(part)[0]
                        : document.createTextNode(part);
                    fragment.appendChild(node);
                });
                $(this).replaceWith(fragment);
            });
    });

    // Task 4: convert the scroll position into a percentage.
    function updateScrollProgress() {
        const scrollableHeight = $(document).height() - $(window).height();
        const percent = scrollableHeight > 0 ? $(window).scrollTop() / scrollableHeight * 100 : 100;
        const progress = Math.max(0, Math.min(100, percent));

        $("#scroll-progress-fill").css("width", progress + "%");
        $("#scroll-progress").attr("aria-valuenow", Math.round(progress));
    }

    $(window).on("load scroll resize", updateScrollProgress);
    $("#habit-search").on("input", updateScrollProgress);
    updateScrollProgress();

    // Task 5: animate each number once, when the stats enter the screen.
    let countersStarted = false;

    function animateCounters() {
        const stats = $("#site-stats");
        if (countersStarted || stats.length === 0) return;
        const screenBottom = $(window).scrollTop() + $(window).height();
        if (screenBottom <= stats.offset().top) return;
        countersStarted = true;

        $(".stat-number").each(function () {
            const counter = $(this);
            const target = Number(counter.attr("data-target"));

            $({ value: 0 }).animate({ value: target }, {
                duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1500,
                step: function (value) {
                    counter.text(Math.floor(value));
                },
                complete: function () {
                    counter.text(target);
                }
            });
        });
    }

    $(window).on("load scroll resize", animateCounters);
    animateCounters();

    // Task 6: keep the button busy while a short timer simulates a server call.
    $("#reminder-form").on("submit", function (event) {
        event.preventDefault();
        const form = $(this);
        const button = $("#reminder-submit");
        if (button.prop("disabled") || !this.reportValidity()) return;

        button.prop("disabled", true);
        button.find(".spinner-border").prop("hidden", false);
        button.find(".submit-label").text("Please wait...");
        form.attr("aria-busy", "true");
        $("#reminder-status").text("Preparing your demo reminder...");

        window.setTimeout(function () {
            button.prop("disabled", false);
            button.find(".spinner-border").prop("hidden", true);
            button.find(".submit-label").text("Submit");
            form.attr("aria-busy", "false");
            $("#reminder-status").text("Demo reminder ready! No email was sent.");
            showNotification("Demo reminder ready! No email was sent.");
        }, 1500);
    });

    // Task 7: replace old feedback and restart its timer for the latest action.
    let notificationTimer;

    function showNotification(message) {
        const notification = $("#action-notification");
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.clearTimeout(notificationTimer);
        notification.stop(true, true).text(message).fadeIn(reducedMotion ? 0 : 200);

        notificationTimer = window.setTimeout(function () {
            notification.fadeOut(reducedMotion ? 0 : 400);
        }, 3000);
    }

    // Task 8: use the Clipboard API, with a fallback for local-file browsers.
    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }

        const previousFocus = document.activeElement;
        const selection = window.getSelection();
        const ranges = [];
        for (let index = 0; index < selection.rangeCount; index++) {
            ranges.push(selection.getRangeAt(index).cloneRange());
        }
        const temporaryInput = $("<textarea>").addClass("clipboard-input")
            .attr({ readonly: true, "aria-label": "Text to copy" }).val(text).appendTo("body");
        let copied = false;
        try {
            temporaryInput[0].select();
            copied = document.execCommand("copy");
        } finally {
            temporaryInput.remove();
            previousFocus.focus({ preventScroll: true });
            selection.removeAllRanges();
            ranges.forEach(function (range) { selection.addRange(range); });
        }
        if (!copied) throw new Error("Copy was not permitted.");
    }

    $(".copy-button").on("click", async function () {
        const button = $(this);
        if (button.data("copying")) return;
        const tooltip = $("#" + button.attr("aria-describedby"));
        const snippet = $("#" + button.attr("data-copy-target")).text();

        function resetCopyFeedback() {
            button.find(".copy-icon").text("\u29c9");
            button.find(".copy-label").text("Copy");
            tooltip.prop("hidden", true).text("");
        }

        window.clearTimeout(button.data("copyTimer"));
        resetCopyFeedback();
        button.data("copying", true).attr("aria-busy", "true");
        try {
            await copyText(snippet);
            button.find(".copy-icon").text("\u2713");
            button.find(".copy-label").text("Copied!");
            tooltip.text("Copied to clipboard!").prop("hidden", false);
            showNotification("Copied to clipboard!");
            button.data("copyTimer", window.setTimeout(resetCopyFeedback, 2500));
        } catch (error) {
            showNotification("Could not copy. Select the snippet and copy it manually.");
        } finally {
            button.data("copying", false).attr("aria-busy", "false");
        }
    });

    $(".copy-button").on("keydown", function (event) {
        if (event.key === "Escape") {
            $("#" + $(this).attr("aria-describedby")).prop("hidden", true);
        }
    });

    // Task 9: replace a tiny placeholder only when an image enters the viewport.
    function loadImage(element) {
        const image = $(element);
        const source = image.attr("data-src");
        if (!source) return;

        image.one("load error", function () {
            // On failure, reveal the image's alt text instead of hiding it.
            image.addClass("is-loaded");
        });
        image.attr("src", source).removeAttr("data-src");
    }

    const lazyImages = $("img[data-src]");
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    imageObserver.unobserve(entry.target);
                }
            });
        });
        lazyImages.each(function () { imageObserver.observe(this); });
    } else {
        // Older browsers check visible images on scroll and carousel changes.
        function loadVisibleImages() {
            $("img[data-src]").each(function () {
                const bounds = this.getBoundingClientRect();
                if ($(this).is(":visible") && bounds.bottom > 0 && bounds.top < window.innerHeight
                    && bounds.right > 0 && bounds.left < window.innerWidth) {
                    loadImage(this);
                }
            });
        }
        $(window).on("load scroll resize", loadVisibleImages);
        $("#fishCarousel").on("slid.bs.carousel", loadVisibleImages);
        $("#habit-search").on("input", loadVisibleImages);
        loadVisibleImages();
    }
});
