// Animation state
let isAnimationEnabled = true;
let animationElements = [];

// Create falling dots
const addAnimation = () => {
    // Clear existing animation elements
    clearAnimation();
    const boxChart = document.querySelector('.box-chart');
    const boxRect = boxChart.getBoundingClientRect();

    for (let i = 0; i < 30; i++) {
        let d = document.createElement("div");
        d.className = "dot animated-element";

        // Start position at top of box-chart, random horizontal position within box
        d.style.top = (boxRect.top - 10) + "px";
        d.style.left = (boxRect.left + Math.random() * boxRect.width) + "px";

        // Randomize animation duration for both flicker and fall
        const flickerDuration = 1 + Math.random() * 2;
        const fallDuration = 3 + Math.random() * 4;
        const delay = Math.random() * 5; // Longer delay for staggered effect

        // Randomly choose fall animation
        const fallAnimations = ["fall", "fall2", "fall3"];
        const randomFall =
            fallAnimations[Math.floor(Math.random() * fallAnimations.length)];

        if (isAnimationEnabled) {
            d.style.animation = `flicker ${flickerDuration}s infinite alternate, ${randomFall} ${fallDuration}s infinite linear`;
            d.style.animationDelay = `${delay}s, ${delay}s`;
        }

        // Add random colors
        const colors = ["#fff", "#ffdd57", "#00f3d5", "#ff6b35", "#4caf50", "#e91e63", "#9c27b0"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        d.style.background = randomColor;

        // Add random box shadow for glow effect
        d.style.boxShadow = `0 0 ${5 + Math.random() * 15}px ${randomColor}`;

        // Add random size variation
        const size = 3 + Math.random() * 8;
        d.style.width = size + "px";
        d.style.height = size + "px";

        document.body.appendChild(d);
        animationElements.push(d);
    }

    // Create circular dots around win-text
    const circleContainer = document.querySelector('.circle-dots');
    const numberOfDots = 12;
    const radius = 180;
    const colors = ["#fff", "#ffdd57", "#00f3d5", "#ff6b35", "#4caf50", "#e91e63", "#9c27b0", "#ff9800"];

    for (let i = 0; i < numberOfDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'circle-dot animated-element';

        // Calculate position on circle
        const angle = (360 / numberOfDots) * i;
        const radian = (angle * Math.PI) / 180;
        const x = radius * Math.cos(radian);
        const y = radius * Math.sin(radian);

        // Position the dot
        dot.style.left = `calc(50% + ${x}px)`;
        dot.style.top = `calc(50% + ${y}px)`;
        dot.style.transform = 'translate(-50%, -50%)';

        // Add random color and glow
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        dot.style.background = randomColor;
        dot.style.color = randomColor;
        dot.style.boxShadow = `0 0 15px ${randomColor}`;

        // Add staggered animation delay
        if (isAnimationEnabled) {
            dot.style.animationDelay = `${i * 0.1}s`;
        }

        circleContainer.appendChild(dot);
    }

    // Animate the entire circle
    if (isAnimationEnabled) {
        circleContainer.style.animation = 'rotateCircle 8s linear infinite';
    }
};

// Clear all animation elements
const clearAnimation = () => {
    // Remove falling dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.remove());

    // Clear circle dots
    const circleContainer = document.querySelector('.circle-dots');
    if (circleContainer) {
        circleContainer.innerHTML = '';
        circleContainer.style.animation = 'none';
    }

    animationElements = [];
};

// Toggle animation on/off
const toggleAnimation = () => {
    isAnimationEnabled = !isAnimationEnabled;
    const toggleBtn = document.getElementById('animationToggle');

    if (isAnimationEnabled) {
        toggleBtn.textContent = 'Tắt hiệu ứng';
        addAnimation();
    } else {
        toggleBtn.textContent = 'Bật hiệu ứng';
        clearAnimation();
    }
};

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById('animationToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleAnimation);
    }

    // Start with animation enabled
    addAnimation();
});