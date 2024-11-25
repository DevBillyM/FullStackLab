// Select elements
const passwordForm = document.getElementById("passwordForm");
const passwordLengthInput = document.getElementById("passwordLength");
const passwordLengthDisplay = document.getElementById("passwordLengthDisplay");
const includeUppercase = document.getElementById("includeUppercase");
const includeLowercase = document.getElementById("includeLowercase");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");
const generatedPassword = document.getElementById("generatedPassword");
const copyButton = document.getElementById("copyButton");

// Character pools
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+[]{}|;:',.<>?/~`";

// Update password length display
passwordLengthInput.addEventListener("input", () => {
    passwordLengthDisplay.textContent = passwordLengthInput.value;
});

// Generate password
passwordForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const length = parseInt(passwordLengthInput.value);
    const useUppercase = includeUppercase.checked;
    const useLowercase = includeLowercase.checked;
    const useNumbers = includeNumbers.checked;
    const useSymbols = includeSymbols.checked;

    // Validate input
    if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
        alert("Please select at least one character type.");
        return;
    }

    // Build character pool
    let characterPool = "";
    if (useUppercase) characterPool += UPPERCASE;
    if (useLowercase) characterPool += LOWERCASE;
    if (useNumbers) characterPool += NUMBERS;
    if (useSymbols) characterPool += SYMBOLS;

    // Generate and display password
    generatedPassword.value = generatePassword(length, characterPool);
});

// Generate random password
function generatePassword(length, pool) {
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        password += pool[randomIndex];
    }
    return password;
}

// Copy password to clipboard
copyButton.addEventListener("click", () => {
    if (generatedPassword.value === "") {
        alert("No password to copy!");
        return;
    }
    navigator.clipboard.writeText(generatedPassword.value);
    alert("Password copied to clipboard!");
});
