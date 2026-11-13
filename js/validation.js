// Final project 5.2: shared JavaScript rules for every form.
const FormValidation = (function () {
    function getError(field) {
        const value = field.value.trim();
        if (!value) return "Please fill in this field.";

        switch (field.dataset.validate) {
            case "name":
                return value.length <= 40 ? "" : "Please use a name of 40 characters or fewer.";
            case "email":
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254
                    ? "" : "Enter an email address like name@example.com.";
            case "phone": {
                const digits = value.replace(/\D/g, "");
                return /^\+?[\d ()-]+$/.test(value) && digits.length >= 10 && digits.length <= 15
                    ? "" : "Enter 10–15 digits, with an optional +, spaces, parentheses or hyphens.";
            }
            case "password":
                return field.value.length >= 8 && field.value.length <= 32
                    && /[a-z]/.test(field.value) && /[A-Z]/.test(field.value)
                    && /\d/.test(field.value) && /[^A-Za-z0-9\s]/.test(field.value)
                    && !/\s/.test(field.value)
                    ? "" : "Use 8–32 characters with uppercase, lowercase, a number and a symbol, without spaces.";
            case "confirm":
                return field.value === document.getElementById(field.dataset.confirmFor).value
                    ? "" : "The passwords do not match.";
            case "focus":
                return ["skincare", "grooming", "fitness"].includes(value)
                    ? "" : "Choose skincare, grooming or fitness.";
            default:
                return "";
        }
    }

    function showError(field, message) {
        const errorId = field.id + "-error";
        let error = document.getElementById(errorId);
        if (!error) {
            error = document.createElement("p");
            error.id = errorId;
            error.className = "field-error";
            (field.closest(".input-group") || field).insertAdjacentElement("afterend", error);
            const description = field.getAttribute("aria-describedby") || "";
            field.setAttribute("aria-describedby", (description + " " + errorId).trim());
        }
        error.textContent = message;
        error.hidden = !message;
        field.classList.toggle("is-invalid", Boolean(message));
        field.setAttribute("aria-invalid", String(Boolean(message)));
    }

    function validate(form, fieldIds) {
        const fields = Array.from(form.querySelectorAll("[data-validate]"))
            .filter(function (field) { return !fieldIds || fieldIds.includes(field.id); });
        let firstInvalid = null;
        fields.forEach(function (field) {
            const error = getError(field);
            showError(field, error);
            if (error && !firstInvalid) firstInvalid = field;
        });
        if (firstInvalid) firstInvalid.focus();
        return !firstInvalid;
    }

    function initialize() {
        document.querySelectorAll("form").forEach(function (form) {
            form.noValidate = true;
            form.querySelectorAll("[data-validate]").forEach(function (field) {
                field.setAttribute("aria-required", "true");
                field.addEventListener("input", function () {
                    if (field.hasAttribute("aria-invalid")) showError(field, getError(field));
                    form.querySelectorAll('[data-confirm-for="' + field.id + '"]').forEach(function (confirmation) {
                        if (confirmation.hasAttribute("aria-invalid")) showError(confirmation, getError(confirmation));
                    });
                });
            });
        });
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize);
    else initialize();
    return { validate: validate, getError: getError };
})();
