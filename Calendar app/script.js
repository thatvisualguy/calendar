// Read URL parameters
const params = new URLSearchParams(window.location.search);
const monthsToShow = parseInt(params.get("months")) || 1;
const colors = {};

// Parse color-coded dates from URL
["red", "yellow"].forEach(color => {
    const dates = params.get(color);
    if (dates) {
        dates.split(",").forEach(date => {
            colors[date] = color;
        });
    }
});

// Function to generate the calendar
function generateCalendar(months) {
    const container = document.getElementById("calendarContainer");
    container.innerHTML = ""; // Clear previous content

    const today = new Date();
    for (let i = 0; i < months; i++) {
        const currentMonth = new Date(today.getFullYear(), today.getMonth() + i, 1);
        const monthDiv = document.createElement("div");
        monthDiv.classList.add("calendar");

        // Month title
        const monthTitle = document.createElement("h2");
        monthTitle.textContent = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });
        container.appendChild(monthTitle);

        // Days of the week
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach(day => {
            const header = document.createElement("div");
            header.classList.add("header");
            header.textContent = day;
            monthDiv.appendChild(header);
        });

        // Empty slots before the first day
        for (let j = 0; j < currentMonth.getDay(); j++) {
            monthDiv.appendChild(document.createElement("div"));
        }

        // Populate days
        while (currentMonth.getMonth() === today.getMonth() + i) {
            const dayDiv = document.createElement("div");
            dayDiv.classList.add("day");
            dayDiv.textContent = currentMonth.getDate();

            const dateStr = currentMonth.toISOString().split("T")[0]; // YYYY-MM-DD
            if (colors[dateStr]) {
                dayDiv.style.backgroundColor = colors[dateStr];
            }

            monthDiv.appendChild(dayDiv);
            currentMonth.setDate(currentMonth.getDate() + 1);
        }

        container.appendChild(monthDiv);
    }
}

// Function to capture and download the calendar as an image
function downloadImage() {
    const container = document.getElementById("calendarContainer");
    html2canvas(container).then(canvas => {
        const link = document.createElement("a");
        link.download = "calendar.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

// Run the function
generateCalendar(monthsToShow);
