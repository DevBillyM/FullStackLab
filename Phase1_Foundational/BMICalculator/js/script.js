// Select elements
const bmiForm = document.getElementById("bmiForm");
const weightInput = document.getElementById("weightInput");
const heightInput = document.getElementById("heightInput");
const bmiResult = document.getElementById("bmiResult");
const resetButton = document.getElementById("resetButton");

// Event listener for form submission
bmiForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload

    // Get and validate inputs
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);

    if (!validateInputs(weight, height)) {
        bmiResult.textContent = "Please enter valid weight and height values!";
        bmiResult.classList.add("text-danger");
        return;
    }

    // Calculate BMI
    const bmi = calculateBMI(weight, height);
    const category = getBMICategory(bmi);

    // Display results
    displayResult(bmi, category);
    resetButton.classList.remove("d-none"); // Show reset button
});

// Event listener for reset button
resetButton.addEventListener("click", resetForm);

// Validate input values
function validateInputs(weight, height) {
    return weight > 0 && height > 0;
}

// Calculate BMI
function calculateBMI(weight, height) {
    // Convert height from cm to meters and calculate BMI
    const heightInMeters = height / 100;
    return (weight / (heightInMeters ** 2)).toFixed(2);
}

// Get BMI category
function getBMICategory(bmi) {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 24.9) return "Normal weight";
    if (bmi < 29.9) return "Overweight";
    return "Obesity";
}

// Display result
function displayResult(bmi, category) {
    bmiResult.textContent = `Your BMI is ${bmi} (${category})`;
    bmiResult.classList.remove("text-danger");
    bmiResult.classList.add("text-success");
}

// Reset form
function resetForm() {
    bmiForm.reset();
    bmiResult.textContent = "";
    resetButton.classList.add("d-none");
}
