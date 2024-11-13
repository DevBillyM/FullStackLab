// Select elements
const display = document.getElementById("display");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const message = document.getElementById("message");

let countdown; // Variable to store the setInterval
let remainingTime = 0; // Store remaining time in seconds for pause/resume functionality
let isRunning = false;

// Event Listeners
startButton.addEventListener("click", startCountdown);
pauseButton.addEventListener("click", pauseCountdown);
resetButton.addEventListener("click", resetCountdown);

// Start Countdown
function startCountdown() {
    // Check if already running to prevent multiple intervals
    if (isRunning) return;

    // Retrieve and validate input
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    if (minutes < 0 || seconds < 0 || seconds >= 60) {
        alert("Please enter valid minutes and seconds (0-59).");
        return;
    }

    // Set initial remaining time in seconds
    remainingTime = minutes * 60 + seconds;

    if (remainingTime <= 0) {
        alert("Please enter a time greater than zero.");
        return;
    }

    // Start countdown
    isRunning = true;
    message.textContent = ""; // Clear any previous messages

    countdown = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            updateDisplay();
        } else {
            clearInterval(countdown);
            display.textContent = "00:00:00";
            message.textContent = "Time’s Up!";
            isRunning = false;
        }
    }, 1000);

    updateDisplay();
}

// Pause Countdown
function pauseCountdown() {
    if (isRunning) {
        clearInterval(countdown);
        isRunning = false;
    }
}

// Reset Countdown
function resetCountdown() {
    clearInterval(countdown);
    remainingTime = 0;
    isRunning = false;
    message.textContent = "";
    updateDisplay();

    // Clear input fields
    minutesInput.value = "";
    secondsInput.value = "";
}

// Update Display
function updateDisplay() {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
