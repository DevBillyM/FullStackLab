// Variables and DOM Elements
let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
const flashcardForm = document.getElementById("flashcardForm");
const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");
const flashcardGrid = document.getElementById("flashcardGrid");
const clearAllButton = document.getElementById("clearAllButton");

// Initialize Flashcards
function initializeFlashcards() {
    flashcardGrid.innerHTML = ""; // Clear the grid

    if (flashcards.length === 0) {
        flashcardGrid.innerHTML = `<p class="text-center text-muted">No flashcards available. Add some!</p>`;
        return;
    }

    flashcards.forEach((flashcard, index) => {
        const cardElement = createFlashcardElement(flashcard, index);
        flashcardGrid.appendChild(cardElement);
    });
}

// Create Flashcard Element
function createFlashcardElement(flashcard, index) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col-md-4");

    cardDiv.innerHTML = `
        <div class="flashcard">
            <button class="delete-button" data-index="${index}">&times;</button>
            <div class="flashcard-question">${flashcard.question}</div>
            <div class="flashcard-answer">${flashcard.answer}</div>
            <div class="flashcard-buttons">
                <button class="btn btn-secondary flip-button">Flip</button>
            </div>
        </div>
    `;

    // Add event listeners for flip and delete actions
    const flipButton = cardDiv.querySelector(".flip-button");
    const deleteButton = cardDiv.querySelector(".delete-button");
    const answerElement = cardDiv.querySelector(".flashcard-answer");

    flipButton.addEventListener("click", () => {
        answerElement.style.display =
            answerElement.style.display === "none" ? "block" : "none";
    });

    deleteButton.addEventListener("click", () => {
        deleteFlashcard(index);
    });

    return cardDiv;
}

// Add Flashcard
flashcardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    if (!question || !answer) {
        alert("Both question and answer are required.");
        return;
    }

    flashcards.push({ question, answer });
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
    flashcardForm.reset();
    initializeFlashcards();
});

// Delete Flashcard
function deleteFlashcard(index) {
    flashcards.splice(index, 1); // Remove the selected card
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
    initializeFlashcards();
}

// Clear All Flashcards
clearAllButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all flashcards?")) {
        flashcards = [];
        localStorage.setItem("flashcards", JSON.stringify(flashcards));
        initializeFlashcards();
    }
});

// Initialize Application
initializeFlashcards();
