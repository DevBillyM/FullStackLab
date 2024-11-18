// Quiz data
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris",
    },
    {
        question: "Which language runs in the browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: "JavaScript",
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Central Style Sheets",
            "Cascading Style Sheets",
            "Cascading Simple Sheets",
            "Cars SUVs Sailboats",
        ],
        answer: "Cascading Style Sheets",
    },
];

const quizForm = document.getElementById("quizForm");
const quizQuestions = document.getElementById("quizQuestions");
const quizResult = document.getElementById("quizResult");
const resetButton = document.getElementById("resetButton");

// Render questions dynamically
function renderQuestions() {
    quizData.forEach((item, index) => {
        const questionBlock = document.createElement("div");
        questionBlock.classList.add("mb-4");

        // Question title
        const questionTitle = document.createElement("h5");
        questionTitle.textContent = `${index + 1}. ${item.question}`;
        questionBlock.appendChild(questionTitle);

        // Options
        item.options.forEach((option) => {
            const optionWrapper = document.createElement("div");
            optionWrapper.classList.add("form-check");

            const optionInput = document.createElement("input");
            optionInput.classList.add("form-check-input");
            optionInput.type = "radio";
            optionInput.name = `question${index}`;
            optionInput.value = option;

            const optionLabel = document.createElement("label");
            optionLabel.classList.add("form-check-label");
            optionLabel.textContent = option;

            optionWrapper.appendChild(optionInput);
            optionWrapper.appendChild(optionLabel);

            questionBlock.appendChild(optionWrapper);
        });

        quizQuestions.appendChild(questionBlock);
    });
}

// Calculate score and display results
function calculateScore() {
    let score = 0;
    let unansweredQuestions = false;

    quizData.forEach((item, index) => {
        const selectedOption = quizForm[`question${index}`].value;

        if (!selectedOption) {
            unansweredQuestions = true;
        } else if (selectedOption === item.answer) {
            score++;
        }
    });

    if (unansweredQuestions) {
        alert("Please answer all questions before submitting.");
        return;
    }

    quizResult.textContent = `You scored ${score} out of ${quizData.length}!`;

    // Show correct/incorrect feedback
    quizData.forEach((item, index) => {
        const selectedOption = quizForm[`question${index}`].value;
        const feedback = selectedOption === item.answer ? "correct" : "incorrect";

        const questionTitle = quizQuestions.children[index].querySelector("h5");
        questionTitle.classList.add(feedback);
    });

    // Disable form and show reset button
    quizForm.querySelectorAll("input").forEach((input) => (input.disabled = true));
    resetButton.classList.remove("d-none");
}

// Reset the quiz
function resetQuiz() {
    quizForm.reset();
    quizQuestions.innerHTML = "";
    quizResult.textContent = "";
    resetButton.classList.add("d-none");
    renderQuestions();
}

// Event listeners
quizForm.addEventListener("submit", (e) => {
    e.preventDefault();
    calculateScore();
});

resetButton.addEventListener("click", resetQuiz);

// Initialize quiz
renderQuestions();
