// Select elements
const modeSelector = document.getElementById("modeSelector");
const timerInputGroup = document.getElementById("timerInputGroup");
const timerInput = document.getElementById("timerInput");
const timeDisplay = document.getElementById("timeDisplay");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");

// Variables
let interval;
let isRunning = false;
let elapsedTime = 0; // Stopwatch time in seconds
let timerTime = 0;   // Timer time in seconds
let mode = "timer"; // Default mode

// Update mode
modeSelector.addEventListener("change", () => {
    mode = modeSelector.value;
    reset();
    if (mode === "timer") {
        timerInputGroup.classList.remove("d-none");
    } else {
        timerInputGroup.classList.add("d-none");
    }
});

// Start button
startButton.addEventListener("click", () => {
    if (isRunning) return;

    if (mode === "timer") {
        const inputTime = parseInt(timerInput.value);
        if (isNaN(inputTime) || inputTime <= 0) {
            alert("Please enter a valid time in seconds.");
            return;
        }
        timerTime = inputTime;
    }

    isRunning = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;

    interval = setInterval(() => {
        if (mode === "timer") {
            handleTimer();
        } else {
            handleStopwatch();
        }
    }, 1000);
});

// Pause button
pauseButton.addEventListener("click", () => {
    if (!isRunning) return;
    clearInterval(interval);
    isRunning = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
});

// Reset button
resetButton.addEventListener("click", reset);

// Timer logic
function handleTimer() {
    if (timerTime > 0) {
        timerTime--;
        updateDisplay(timerTime);
    } else {
        clearInterval(interval);
        alert("Time's up!");
        reset();
    }
}

// Stopwatch logic
function handleStopwatch() {
    elapsedTime++;
    updateDisplay(elapsedTime);
}

// Update time display
function updateDisplay(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    timeDisplay.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Reset function
function reset() {
    clearInterval(interval);
    isRunning = false;
    elapsedTime = 0;
    timerTime = 0;
    updateDisplay(0);
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;

    if (mode === "timer") {
        timerInput.value = "";
    }
}
