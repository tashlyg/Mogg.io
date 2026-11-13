// Final project 5.2 reuses the contact rules through the shared validator.

const form = document.getElementById("contact-form");

if (form) {
    form.noValidate = true;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const status = document.getElementById("contact-status");
        status.textContent = "";
        if (!FormValidation.validate(form)) return;
        status.textContent = "Your message passed validation. This is a demo; no message was sent.";
    });

    form.addEventListener("input", function () {
        document.getElementById("contact-status").textContent = "";
    });
}

// task 2: Toggle content sections with Bootstrap's slide animation.
document.querySelectorAll(".section-toggle").forEach(function (button) {
    const content = document.getElementById(button.getAttribute("aria-controls"));
    const collapse = new bootstrap.Collapse(content, { toggle: false });

    button.addEventListener("click", function () {
        collapse.toggle();
    });
    content.addEventListener("show.bs.collapse", function () {
        button.setAttribute("aria-expanded", "true");
    });
    content.addEventListener("hide.bs.collapse", function () {
        button.setAttribute("aria-expanded", "false");
    });
});

// task 3

const popupElement = document.getElementById("contact-popup");

if (popupElement) {
    const popup = new bootstrap.Modal(popupElement);
    const openButton = document.getElementById("open-contact");

    openButton.addEventListener("click", function () {
        popup.show();
    });

    popupElement.addEventListener("hidden.bs.modal", function () {
        openButton.focus();
    });
}

// task 4

let colorIndex = 0;

document.getElementById("change-background")?.addEventListener("click", function () {
    colorIndex = (colorIndex + 1) % 3;
    document.body.dataset.background = String(colorIndex);
});

// task 5

function updateDateTime() {
    if (!document.getElementById("current-date-time")) return;

    const now = new Date();
    document.getElementById("current-date-time").textContent = now.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });
}

updateDateTime();
setInterval(updateDateTime, 1000);
