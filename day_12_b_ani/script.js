// Anime.js Animation Base Setup

// Create a basic animation
const animation = anime({
    targets: '#animBox',
    translateX: 250,
    duration: 2000,
    easing: 'easeInOutQuad',
    autoplay: false,
    loop: false
});

// Control buttons
document.getElementById('playBtn').addEventListener('click', () => {
    animation.play();
});

document.getElementById('pauseBtn').addEventListener('click', () => {
    animation.pause();
});

document.getElementById('resetBtn').addEventListener('click', () => {
    animation.restart();
});

// Additional animation example - you can add more animations
const rotateAnimation = anime({
    targets: '#animBox',
    rotate: 360,
    duration: 3000,
    easing: 'linear',
    autoplay: true,
    loop: true
});
