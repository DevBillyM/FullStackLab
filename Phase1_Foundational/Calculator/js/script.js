// Calculator variables
let currentInput = "0";
let previousInput = "";
let operator = null;

// Select display
const display = document.getElementById("display");

// Handle button clicks
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;
        const value = button.textContent;

        switch (action) {
            case "number":
                handleNumber(value);
                break;
            case "operator":
                handleOperator(button, button.dataset.operator);
                break;
            case "decimal":
                addDecimal();
                break;
            case "clear":
                clearCalculator();
                break;
            case "sign":
                toggleSign();
                break;
            case "percent":
                convertToPercent();
                break;
            case "calculate":
                calculate();
                break;
            case "delete":
                deleteLastDigit();
                break;
        }

        updateDisplay();
    });
});

// Functions

function handleNumber(num) {
    if (currentInput === "0" || currentInput === previousInput) {
        currentInput = num;
    } else {
        currentInput += num;
    }
}

function handleOperator(button, op) {
    // Clear previous active operator button
    document.querySelectorAll(".operator-btn").forEach(btn => btn.classList.remove("active"));
    
    // Highlight the current operator
    button.classList.add("active");

    if (previousInput && operator) {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
}

function addDecimal() {
    if (!currentInput.includes(".")) {
        currentInput += ".";
    }
}

function toggleSign() {
    currentInput = currentInput.startsWith("-") ? currentInput.slice(1) : "-" + currentInput;
}

function convertToPercent() {
    currentInput = (parseFloat(currentInput) / 100).toString();
}

function deleteLastDigit() {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
}

function clearCalculator() {
    currentInput = "0";
    previousInput = "";
    operator = null;
    document.querySelectorAll(".operator-btn").forEach(btn => btn.classList.remove("active"));
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            result = current === 0 ? "Error" : prev / current;
            break;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = "";

    // Clear operator button highlight after calculation
    document.querySelectorAll(".operator-btn").forEach(btn => btn.classList.remove("active"));
}

function updateDisplay() {
    display.textContent = currentInput;
}
