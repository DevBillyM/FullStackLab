// Select elements
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const displayPassage = document.getElementById("displayPassage");
const typingArea = document.getElementById("typingArea");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const results = document.getElementById("results");

// Passages for the test
const passages = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing tests are a fun way to improve your keyboard skills.",
    "JavaScript is a versatile programming language.",
    "Practice makes perfect, especially when typing.",
];

// Variables for tracking progress
let startTime;
let isTestActive = false;
let currentPassage = "";

// Start Test
startButton.addEventListener("click", () => {
    if (isTestActive) return; // Prevent multiple starts

    // Select a random passage
    currentPassage = passages[Math.floor(Math.random() * passages.length)];
    displayPassage.textContent = currentPassage;

    // Reset UI and variables
    typingArea.value = "";
    typingArea.disabled = false;
    typingArea.focus();
    results.classList.add("d-none");
    resetButton.disabled = false;

    startTime = Date.now();
    isTestActive = true;
});

// Typing Area Event
typingArea.addEventListener("input", () => {
    if (!isTestActive) return;

    const typedText = typingArea.value;
    const typedWords = typedText.trim().split(/\s+/);
    const passageWords = currentPassage.split(/\s+/);

    // Compare input with the passage
    let correctChars = 0;
    let totalChars = currentPassage.length;
    let errors = 0;

    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === currentPassage[i]) {
            correctChars++;
        } else if (typedText[i] !== currentPassage[i]) {
            errors++;
        }
    }

    // Check if typing is complete
    if (typedText === currentPassage) {
        const endTime = Date.now();
        const timeTaken = (endTime - startTime) / 1000 / 60; // Convert to minutes

        // Calculate results
        const wordsPerMinute = Math.round(typedWords.length / timeTaken);
        const accuracy = Math.round((correctChars / totalChars) * 100);

        // Display results
        wpmDisplay.textContent = wordsPerMinute;
        accuracyDisplay.textContent = accuracy;
        results.classList.remove("d-none");

        isTestActive = false; // End the test
        typingArea.disabled = true;
    }
});

// Reset Test
resetButton.addEventListener("click", () => {
    // Reset all variables and UI
    typingArea.value = "";
    typingArea.disabled = true;
    displayPassage.textContent = "Click \"Start Test\" to begin typing.";
    resetButton.disabled = true;
    results.classList.add("d-none");
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "0";
    isTestActive = false;
});
