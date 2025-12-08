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