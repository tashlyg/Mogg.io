// Assignment 5, task 5: encourage small habits that fit the Mogg.io theme.
function initializeDailyChallenge() {
    const challengeBoard = document.getElementById("daily-challenge");
    if (!challengeBoard) return;

    const habitCheckboxes = Array.from(challengeBoard.querySelectorAll('input[name="daily-habit"]'));
    const progress = document.getElementById("challenge-progress");
    const message = document.getElementById("challenge-message");
    const badge = document.getElementById("challenge-badge");
    const suggestButton = document.getElementById("suggest-habit");
    const resetButton = document.getElementById("reset-challenge");
    let suggestedHabit = null;

    function updateChallenge() {
        const completedCount = habitCheckboxes.filter(function (checkbox) {
            return checkbox.checked;
        }).length;
        const allComplete = completedCount === habitCheckboxes.length;
        const progressText = completedCount + " of " + habitCheckboxes.length + " complete.";

        habitCheckboxes.forEach(function (checkbox) {
            const habitCard = checkbox.closest(".challenge-option");
            habitCard.classList.toggle("is-checked", checkbox.checked);
            habitCard.classList.toggle("is-suggested", checkbox === suggestedHabit);
        });

        progress.max = habitCheckboxes.length;
        progress.value = completedCount;
        progress.textContent = progressText;
        challengeBoard.classList.toggle("is-complete", allComplete);
        badge.textContent = allComplete ? "Daily Mogg Champion!" : "Small steps, big energy";
        suggestButton.disabled = allComplete;
        resetButton.disabled = completedCount === 0 && suggestedHabit === null;

        if (allComplete) {
            message.textContent = progressText + " Challenge complete! Keep showing up for yourself and others.";
        } else if (suggestedHabit) {
            message.textContent = progressText + " Try this next: " + suggestedHabit.value + ".";
        } else {
            message.textContent = progressText + (completedCount === 0 ? " Pick any habit to begin!" : " Nice work! Every small step counts.");
        }
    }

    habitCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            if (suggestedHabit === checkbox) suggestedHabit = null;
            updateChallenge();
        });
    });

    suggestButton.addEventListener("click", function () {
        const remainingHabits = habitCheckboxes.filter(function (checkbox) {
            return !checkbox.checked;
        });
        if (remainingHabits.length === 0) return;

        // Avoid repeating the previous suggestion when another habit is available.
        const otherHabits = remainingHabits.filter(function (checkbox) {
            return checkbox !== suggestedHabit;
        });
        const choices = otherHabits.length > 0 ? otherHabits : remainingHabits;
        suggestedHabit = choices[Math.floor(Math.random() * choices.length)];
        updateChallenge();
        suggestedHabit.focus();
    });

    resetButton.addEventListener("click", function () {
        habitCheckboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
        suggestedHabit = null;
        updateChallenge();
        habitCheckboxes[0].focus();
    });

    // Also reflects any checkbox state restored by the browser on reload.
    updateChallenge();
}

initializeDailyChallenge();
