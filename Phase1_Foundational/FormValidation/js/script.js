// Select form and input elements
const validationForm = document.getElementById("validationForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const confirmPasswordInput = document.getElementById("confirmPasswordInput");

// Event listener for real-time validation
validationForm.addEventListener("input", (event) => {
    validateField(event.target);
});

// Event listener for form submission
validationForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    const isFormValid = validateForm();

    if (isFormValid) {
        alert("Form submitted successfully!");
        validationForm.reset();
    }
});

// Validate individual fields
function validateField(input) {
    const inputType = input.id;

    if (inputType === "nameInput") {
        validateName(input);
    } else if (inputType === "emailInput") {
        validateEmail(input);
    } else if (inputType === "passwordInput") {
        validatePassword(input);
    } else if (inputType === "confirmPasswordInput") {
        validateConfirmPassword(input);
    }
}

// Validate the entire form
function validateForm() {
    let isValid = true;

    // Validate all fields
    isValid &= validateName(nameInput);
    isValid &= validateEmail(emailInput);
    isValid &= validatePassword(passwordInput);
    isValid &= validateConfirmPassword(confirmPasswordInput);

    return isValid;
}

// Validation functions for each field
function validateName(input) {
    if (input.value.trim() === "") {
        setInvalid(input, "Name is required.");
        return false;
    }
    setValid(input);
    return true;
}

function validateEmail(input) {
    const emailPattern = /^[^@]+@[^@]+\.[a-z]{2,}$/i;

    if (!emailPattern.test(input.value.trim())) {
        setInvalid(input, "Please enter a valid email address.");
        return false;
    }
    setValid(input);
    return true;
}

function validatePassword(input) {
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    if (!passwordPattern.test(input.value.trim())) {
        setInvalid(input, "Password must be at least 8 characters long and include a number or special character.");
        return false;
    }
    setValid(input);
    return true;
}

function validateConfirmPassword(input) {
    if (input.value.trim() !== passwordInput.value.trim()) {
        setInvalid(input, "Passwords do not match.");
        return false;
    }
    setValid(input);
    return true;
}

// Helper functions for setting validation states
function setInvalid(input, message) {
    input.classList.add("is-invalid");
    input.nextElementSibling.textContent = message;
}

function setValid(input) {
    input.classList.remove("is-invalid");
    input.nextElementSibling.textContent = "";
}
