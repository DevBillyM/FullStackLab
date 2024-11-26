// Game state variables
let board = ["", "", "", "", "", "", "", "", ""]; // 3x3 grid
let currentPlayer = "X";
let isGameOver = false;

// Winning combinations
const winningCombos = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal
    [2, 4, 6], // Diagonal
];

// Select elements
const gameBoard = document.getElementById("gameBoard");
const statusMessage = document.getElementById("statusMessage");
const resetButton = document.getElementById("resetButton");

// Initialize the game board
function initializeBoard() {
    gameBoard.innerHTML = ""; // Clear the board
    board.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", handleCellClick);
        gameBoard.appendChild(cell);
    });
    updateStatusMessage();
}

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.dataset.index;

    // Ignore clicks on already taken cells or if the game is over
    if (board[cellIndex] !== "" || isGameOver) return;

    // Update board state and UI
    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    // Check for a winner or draw
    if (checkWinner()) {
        statusMessage.textContent = `Player ${currentPlayer} wins!`;
        isGameOver = true;
    } else if (board.every((cell) => cell !== "")) {
        statusMessage.textContent = "It's a draw!";
        isGameOver = true;
    } else {
        // Switch turns
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatusMessage();
    }
}

// Check for a winner
function checkWinner() {
    return winningCombos.some((combo) => {
        return combo.every((index) => board[index] === currentPlayer);
    });
}

// Update the status message
function updateStatusMessage() {
    if (!isGameOver) {
        statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Reset the game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameOver = false;
    initializeBoard();
}

// Event listener for reset button
resetButton.addEventListener("click", resetGame);

// Initialize the game on page load
initializeBoard();
