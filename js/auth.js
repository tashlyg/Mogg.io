// Final project 5.1: browser-only demonstration, not secure authentication.
(function initializeAuthentication() {
    const accountPage = document.getElementById("account-page");
    if (!accountPage) return;

    const usersKey = "mogg.users";
    const sessionKey = "mogg.currentUser";
    const signUpSection = document.getElementById("signup-section");
    const loginSection = document.getElementById("login-section");
    const profileSection = document.getElementById("profile-section");
    const pageStatus = document.getElementById("account-status");
    const signUpForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");

    function readUsers() {
        const stored = localStorage.getItem(usersKey);
        if (stored === null) return [];
        const users = JSON.parse(stored);
        if (!Array.isArray(users) || !users.every(function (user) {
            return user && ["name", "email", "phone", "password"].every(function (key) {
                return typeof user[key] === "string";
            });
        })) throw new Error("Invalid saved accounts");
        return users;
    }

    function showView(section) {
        [signUpSection, loginSection, profileSection].forEach(function (panel) {
            panel.hidden = panel !== section;
        });
    }

    function storageError() {
        pageStatus.textContent = "Saved accounts could not be accessed. Allow browser storage, or clear this site's demo data if it is damaged, then reload.";
    }

    function renderAccount() {
        pageStatus.textContent = "";
        // Hide profile details first so a missing or damaged session cannot leave them visible.
        document.getElementById("profile-name").textContent = "";
        document.getElementById("profile-email").textContent = "";
        document.getElementById("profile-phone").textContent = "";
        showView(new URLSearchParams(window.location.search).get("view") === "signup" ? signUpSection : loginSection);
        try {
            const users = readUsers();
            const email = localStorage.getItem(sessionKey);
            const user = users.find(function (account) { return account.email === email; });
            if (!user) return;
            document.getElementById("profile-name").textContent = user.name;
            document.getElementById("profile-email").textContent = user.email;
            document.getElementById("profile-phone").textContent = user.phone;
            showView(profileSection);
        } catch (error) {
            storageError();
        }
    }

    signUpForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const status = document.getElementById("signup-status");
        status.textContent = "";
        if (!FormValidation.validate(signUpForm)) return;

        const user = {
            name: document.getElementById("signup-name").value.trim(),
            email: document.getElementById("signup-email").value.trim().toLowerCase(),
            phone: document.getElementById("signup-phone").value.trim(),
            password: document.getElementById("signup-password").value
        };
        try {
            const users = readUsers();
            if (users.some(function (account) { return account.email === user.email; })) {
                status.textContent = "An account with this email already exists. Log in instead.";
                return;
            }
            users.push(user);
            localStorage.setItem(usersKey, JSON.stringify(users));
            signUpForm.reset();
            document.getElementById("login-email").value = user.email;
            showView(loginSection);
            window.history.replaceState(null, "", "profile.html?view=login");
            document.getElementById("login-status").textContent = "Account created! Log in with your new password.";
            document.getElementById("login-password").focus();
        } catch (error) {
            storageError();
        }
    });

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const status = document.getElementById("login-status");
        status.textContent = "";
        if (!FormValidation.validate(loginForm)) return;
        const email = document.getElementById("login-email").value.trim().toLowerCase();
        const password = document.getElementById("login-password").value;
        try {
            const user = readUsers().find(function (account) {
                return account.email === email && account.password === password;
            });
            if (!user) {
                status.textContent = "Email or password is incorrect. Try again or create an account.";
                return;
            }
            localStorage.setItem(sessionKey, user.email);
            window.location.assign("profile.html");
        } catch (error) {
            storageError();
        }
    });

    document.getElementById("logout").addEventListener("click", function () {
        try {
            localStorage.removeItem(sessionKey);
            loginForm.reset();
            renderAccount();
            showView(loginSection);
            document.getElementById("login-status").textContent = "You have logged out.";
            document.getElementById("login-email").focus();
        } catch (error) {
            storageError();
        }
    });

    window.addEventListener("storage", function (event) {
        if (event.key === usersKey || event.key === sessionKey || event.key === null) renderAccount();
    });
    window.addEventListener("pageshow", renderAccount);
    renderAccount();
})();
