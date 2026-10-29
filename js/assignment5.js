// Assignment 5, task 1: select elements and update their content and styles.
const readMoreButton = document.getElementById("read-more");

if (readMoreButton) {
    const extraContent = document.getElementById("routine-more");

    readMoreButton.addEventListener("click", function () {
        const isOpen = readMoreButton.getAttribute("aria-expanded") === "true";

        extraContent.style.display = isOpen ? "none" : "block";
        readMoreButton.textContent = isOpen ? "Read more" : "Read less";
        readMoreButton.setAttribute("aria-expanded", String(!isOpen));
    });
}

const ratingStars = document.querySelectorAll(".rating-stars button");

ratingStars.forEach(function (star) {
    star.addEventListener("click", function () {
        const rating = Number(star.value);

        ratingStars.forEach(function (button) {
            button.style.color = Number(button.value) <= rating ? "#a6370e" : "#687078";
            button.setAttribute("aria-pressed", String(button === star));
        });

        document.getElementById("rating-message").textContent = "Your rating: " + rating + " out of 5. Thank you!";
    });
});
