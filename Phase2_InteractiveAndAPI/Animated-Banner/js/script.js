// Select elements
const bannerAnimation = document.getElementById("banner-animation");
const pauseBtn = document.getElementById("pause-btn");
const resumeBtn = document.getElementById("resume-btn");

// Pause animation
pauseBtn.addEventListener("click", () => {
  bannerAnimation.style.animationPlayState = "paused";
});

// Resume animation
resumeBtn.addEventListener("click", () => {
  bannerAnimation.style.animationPlayState = "running";
});

// Accessibility: Detect reduced motion
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  bannerAnimation.style.animation = "none";
  console.warn("Animations disabled due to reduced motion preference.");
}
