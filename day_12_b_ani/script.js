
document.querySelector('.animated-box').addEventListener('click', function () {
    console.log('Box clicked! Starting animation...');
    anime({
        targets: '.animated-box',
        x: {
            to: '26rem', // Dịch sang phải
            ease: 'outCubic',
        },
        rotate: {
            to: '2turn', // Quay tròn
            ease: 'inOutQuad'
        },
        opacity: {
            to: 0, // Ẩn đi
            ease: 'linear'
        },
        duration: 2500,
        complete: function() {
            // Reset lại position sau khi animation kết thúc
            anime.set('.animated-box', {
                x: 0,
                rotate: 0,
                opacity: 1
            });
        }
    });
});

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
document.getElementById('start-btn').addEventListener('click', () => {
    animation.play();
});

document.getElementById('pause-btn').addEventListener('click', () => {
    animation.pause();
});

document.getElementById('reset-btn').addEventListener('click', () => {
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
