
const colors = ["#c1fdff", "#ffe4d6", "#e2f0cb"];
let colorIndex = 0;

document.getElementById("change-background").addEventListener("click", function () {
    colorIndex = (colorIndex + 1) % colors.length;
    document.body.style.backgroundColor = colors[colorIndex];
});

function updateDateTime() {
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
