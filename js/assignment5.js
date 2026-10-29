// Assignment 5, task 1: select elements and update their content and styles.
function initializeReadMore() {
    const readMoreButton = document.getElementById("read-more");
    if (!readMoreButton) return;

    const extraContent = document.getElementById("routine-more");

    readMoreButton.addEventListener("click", function () {
        const isOpen = readMoreButton.getAttribute("aria-expanded") === "true";

        extraContent.style.display = isOpen ? "none" : "block";
        readMoreButton.textContent = isOpen ? "Read more" : "Read less";
        readMoreButton.setAttribute("aria-expanded", String(!isOpen));
    });
}

function initializeRating() {
    const ratingStars = document.querySelectorAll(".rating-stars button");
    const ratingMessage = document.getElementById("rating-message");

    ratingStars.forEach(function (star) {
        star.addEventListener("click", function () {
            const rating = Number(star.value);

            ratingStars.forEach(function (button) {
                button.style.color = Number(button.value) <= rating ? "#a6370e" : "#687078";
                button.setAttribute("aria-pressed", String(button === star));
            });

            ratingMessage.textContent = "Your rating: " + rating + " out of 5. Thank you!";
        });
    });
}

// Task 2: button events, keyboard events, callbacks, and a switch statement.
function initializeCheckInTime() {
    const timeButton = document.getElementById("show-time");
    if (!timeButton) return;

    const checkInTime = document.getElementById("check-in-time");

    timeButton.addEventListener("click", function () {
        checkInTime.textContent = "Your check-in time: " + new Date().toLocaleTimeString();
    });
}

function initializeKeyboardNavigation() {
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
}

function initializeRoutinePlanner() {
    const planner = document.getElementById("routine-planner");
    if (!planner) return;

    const steps = planner.querySelectorAll(".planner-step");
    const routineName = document.getElementById("routine-name");
    const routineFocus = document.getElementById("routine-focus");
    const plannerResult = document.getElementById("planner-result");
    const plannerProgress = document.getElementById("planner-progress");
    let currentStep = 0;

    function showStep(stepNumber) {
        currentStep = stepNumber;
        steps.forEach(function (step, index) {
            step.hidden = index !== currentStep;
        });
        plannerProgress.textContent = "Step " + (currentStep + 1) + " of " + steps.length;
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

        // The form uses novalidate because the name field can be in a hidden step.
        routineName.value = routineName.value.trim();
        if (!routineName.checkValidity()) {
            showStep(0);
            routineName.reportValidity();
            return;
        }

        plannerResult.textContent = routineName.value + ", your focus is " + routineFocus.value + ". Your plan is ready for this visit!";
    });

    planner.addEventListener("input", function () {
        plannerResult.textContent = "";
    });
}

// Task 3: keep related data and a method in one object.
function initializeDailyRoutine() {
    const habitList = document.getElementById("habit-list");
    if (!habitList) return;

    const dailyRoutine = {
        title: "Daily basics",
        habits: [
            { name: "Wash your face", minutes: 2 },
            { name: "Tidy your hair", minutes: 3 },
            { name: "Take a short walk", minutes: 10 }
        ],
        getTotalMinutes: function () {
            let totalMinutes = 0;
            for (let index = 0; index < this.habits.length; index++) {
                totalMinutes += this.habits[index].minutes;
            }
            return totalMinutes;
        }
    };

    // forEach is a higher-order function: it receives a callback function.
    dailyRoutine.habits.forEach(function (habit) {
        const habitItem = document.createElement("li");
        habitItem.textContent = habit.name + " - " + habit.minutes + " minutes";
        habitList.appendChild(habitItem);
    });

    document.getElementById("routine-summary").textContent = dailyRoutine.title + ": " + dailyRoutine.habits.length + " habits, " + dailyRoutine.getTotalMinutes() + " minutes in total.";

    const routineCard = document.getElementById("routine-demo");
    const completeButton = document.getElementById("complete-routine");
    const completionMessage = document.getElementById("completion-message");
    const routineSound = document.getElementById("routine-sound");

    completeButton.addEventListener("click", function () {
        const isComplete = routineCard.classList.toggle("is-complete");
        completeButton.textContent = isComplete ? "Start again" : "Mark routine done";
        completeButton.setAttribute("aria-pressed", String(isComplete));
        completionMessage.textContent = isComplete ? "Well done! Your daily routine is complete." : "Ready for your next routine.";

        // Reuse one sound and rewind it so repeated clicks cannot overlap audio.
        routineSound.pause();
        routineSound.currentTime = 0;
        if (isComplete) {
            routineSound.play().catch(function (error) {
                // Resetting the routine can cancel a sound that is still loading.
                if (error.name !== "AbortError") {
                    completionMessage.textContent = "Well done! Sound is unavailable in this browser.";
                }
            });
        }
    });
}

// Task 4: initialize each feature separately and keep its state inside its function.
// This shared script runs after the HTML on every page; absent features are skipped.
initializeReadMore();
initializeRating();
initializeCheckInTime();
initializeKeyboardNavigation();
initializeRoutinePlanner();
initializeDailyRoutine();
