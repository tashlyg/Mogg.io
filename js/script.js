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
});
