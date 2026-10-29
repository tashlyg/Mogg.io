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

// Task 2: button events, keyboard events, callbacks, and a switch statement.
const timeButton = document.getElementById("show-time");

if (timeButton) {
    timeButton.addEventListener("click", function () {
        document.getElementById("check-in-time").textContent = "Your check-in time: " + new Date().toLocaleTimeString();
    });
}

const menuLinks = document.querySelectorAll(".site-nav .nav-link");

menuLinks.forEach(function (link, index) {
    link.addEventListener("keydown", function (event) {
        let nextIndex = index;

        switch (event.key) {
            case "ArrowRight":
            case "ArrowDown":
                nextIndex = (index + 1) % menuLinks.length;
                break;
            case "ArrowLeft":
            case "ArrowUp":
                nextIndex = (index - 1 + menuLinks.length) % menuLinks.length;
                break;
            default:
                return;
        }

        event.preventDefault();
        menuLinks[nextIndex].focus();
    });
});

const planner = document.getElementById("routine-planner");

if (planner) {
    const steps = document.querySelectorAll(".planner-step");
    const routineName = document.getElementById("routine-name");
    const routineFocus = document.getElementById("routine-focus");
    const result = document.getElementById("planner-result");
    let currentStep = 0;

    function showStep(stepNumber) {
        currentStep = stepNumber;
        steps.forEach(function (step, index) {
            step.hidden = index !== currentStep;
        });
        document.getElementById("planner-progress").textContent = "Step " + (currentStep + 1) + " of 2";
        steps[currentStep].querySelector("input, select").focus();
    }

    function goToNextStep() {
        routineName.value = routineName.value.trim();
        if (routineName.reportValidity()) {
            showStep(1);
        }
    }

    // Passing a function to addEventListener makes it an event callback.
    document.getElementById("planner-next").addEventListener("click", goToNextStep);
    document.getElementById("planner-back").addEventListener("click", function () {
        showStep(0);
    });

    planner.addEventListener("submit", function (event) {
        event.preventDefault();

        if (currentStep === 0) {
            goToNextStep();
            return;
        }

        result.textContent = routineName.value + ", your focus is " + routineFocus.value + ". Your plan is ready for this visit!";
    });

    planner.addEventListener("input", function () {
        result.textContent = "";
    });
}

// Task 3: keep related data and a method in one object.
const dailyRoutine = {
    title: "Daily basics",
    habits: [
        { name: "Wash your face", minutes: 2 },
        { name: "Tidy your hair", minutes: 3 },
        { name: "Take a short walk", minutes: 10 }
    ],
    getTotalMinutes: function () {
        let total = 0;
        for (let i = 0; i < this.habits.length; i++) {
            total += this.habits[i].minutes;
        }
        return total;
    }
};

const habitList = document.getElementById("habit-list");

if (habitList) {
    // forEach is a higher-order function: it receives a callback function.
    dailyRoutine.habits.forEach(function (habit) {
        const item = document.createElement("li");
        item.textContent = habit.name + " - " + habit.minutes + " minutes";
        habitList.appendChild(item);
    });

    document.getElementById("routine-summary").textContent = dailyRoutine.title + ": " + dailyRoutine.habits.length + " habits, " + dailyRoutine.getTotalMinutes() + " minutes in total.";

    const routineCard = document.getElementById("routine-demo");
    const completeButton = document.getElementById("complete-routine");
    const completionMessage = document.getElementById("completion-message");
    const sound = document.getElementById("routine-sound");

    completeButton.addEventListener("click", function () {
        const isComplete = routineCard.classList.toggle("is-complete");
        completeButton.textContent = isComplete ? "Start again" : "Mark routine done";
        completeButton.setAttribute("aria-pressed", String(isComplete));
        completionMessage.textContent = isComplete ? "Well done! Your daily routine is complete." : "Ready for your next routine.";

        // Reuse one sound and rewind it so repeated clicks cannot overlap audio.
        sound.pause();
        sound.currentTime = 0;
        if (isComplete) {
            sound.play().catch(function (error) {
                // Resetting the routine can cancel a sound that is still loading.
                if (error.name !== "AbortError") {
                    completionMessage.textContent = "Well done! Sound is unavailable in this browser.";
                }
            });
        }
    });
}
