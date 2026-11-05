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
        const screenBottom = $(window).scrollTop() + $(window).height();
        if (countersStarted || screenBottom <= $("#site-stats").offset().top) return;
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
        }, 1500);
    });
});
