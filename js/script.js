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
});
