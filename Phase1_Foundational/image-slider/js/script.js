// Generate random images with placeholders
const images = [
    { url: "https://picsum.photos/700/400?random=1", caption: "Random Image 1" },
    { url: "https://picsum.photos/700/400?random=2", caption: "Random Image 2" },
    { url: "https://picsum.photos/700/400?random=3", caption: "Random Image 3" },
    { url: "https://picsum.photos/700/400?random=4", caption: "Random Image 4" },
    { url: "https://picsum.photos/700/400?random=5", caption: "Random Image 5" },
];

// Select elements
const sliderImage = document.getElementById("sliderImage");
const imageCaption = document.getElementById("imageCaption");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");

let currentIndex = 0;
let autoplayInterval = null;

// Initialize the slider
function initializeSlider() {
    if (images.length === 0) {
        sliderImage.src = "";
        imageCaption.textContent = "No images available.";
        prevButton.disabled = true;
        nextButton.disabled = true;
        playButton.disabled = true;
        return;
    }

    sliderImage.src = images[currentIndex].url;
    imageCaption.textContent = images[currentIndex].caption;
    prevButton.disabled = false;
    nextButton.disabled = false;
    playButton.disabled = false;
}

// Navigate to the previous image
function showPreviousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
}

// Navigate to the next image
function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
}

// Update the slider display
function updateSlider() {
    sliderImage.src = images[currentIndex].url;
    imageCaption.textContent = images[currentIndex].caption;
}

// Start autoplay
function startAutoplay() {
    autoplayInterval = setInterval(showNextImage, 3000);
    playButton.disabled = true;
    pauseButton.disabled = false;
}

// Pause autoplay
function pauseAutoplay() {
    clearInterval(autoplayInterval);
    playButton.disabled = false;
    pauseButton.disabled = true;
}

// Event Listeners
prevButton.addEventListener("click", () => {
    pauseAutoplay(); // Pause autoplay when navigating manually
    showPreviousImage();
});

nextButton.addEventListener("click", () => {
    pauseAutoplay(); // Pause autoplay when navigating manually
    showNextImage();
});

playButton.addEventListener("click", startAutoplay);
pauseButton.addEventListener("click", pauseAutoplay);

// Initialize the slider on page load
initializeSlider();
