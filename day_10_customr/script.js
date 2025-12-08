// Create falling dots
for (let i = 0; i < 30; i++) {
    let d = document.createElement("div");
    d.className = "dot";

    // Start position at top, random horizontal position
    d.style.top = "-10px";
    d.style.left = Math.random() * 100 + "vw";

    // Randomize animation duration for both flicker and fall
    const flickerDuration = 1 + Math.random() * 2;
    const fallDuration = 3 + Math.random() * 4;
    const delay = Math.random() * 5; // Longer delay for staggered effect

    // Randomly choose fall animation
    const fallAnimations = ["fall", "fall2", "fall3"];
    const randomFall =
        fallAnimations[Math.floor(Math.random() * fallAnimations.length)];

    d.style.animation = `flicker ${flickerDuration}s infinite alternate, ${randomFall} ${fallDuration}s infinite linear`;
    d.style.animationDelay = `${delay}s, ${delay}s`;

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
}

// Create circular dots around win-text
const circleContainer = document.querySelector('.circle-dots');
const numberOfDots = 12;
const radius = 180;
const colors = ["#fff", "#ffdd57", "#00f3d5", "#ff6b35", "#4caf50", "#e91e63", "#9c27b0", "#ff9800"];

for (let i = 0; i < numberOfDots; i++) {
    const dot = document.createElement('div');
    dot.className = 'circle-dot';

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
    dot.style.animationDelay = `${i * 0.1}s`;

    circleContainer.appendChild(dot);
}

// Animate the entire circle
circleContainer.style.animation = 'rotateCircle 8s linear infinite';