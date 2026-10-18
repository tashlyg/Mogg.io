// task 1
// Form ID: contact-form. Input IDs: name, email, password, confirm-password, message.

const form = document.getElementById("contact-form");

if (form) {
    form.noValidate = true;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const emailInput = document.getElementById("email");
        const email = emailInput.value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const message = document.getElementById("message").value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name === "" || email === "" || password.trim() === "" || confirmPassword.trim() === "" || message === "") {
            alert("Please fill in all required fields.");
        } else if (!emailPattern.test(email) || emailInput.validity.typeMismatch) {
            alert("Please enter a valid email address.");
        } else if (password.length < 8 || password.length > 32) {
            alert("Password must be between 8 and 32 characters.");
        } else if (password !== confirmPassword) {
            alert("Passwords do not match.");
        } else {
            alert("All fields are valid.");
        }
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

const colors = ["#c1fdff", "#ffe4d6", "#e2f0cb"];
let colorIndex = 0;

document.getElementById("change-background")?.addEventListener("click", function () {
    colorIndex = (colorIndex + 1) % colors.length;
    document.body.style.backgroundColor = colors[colorIndex];
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
