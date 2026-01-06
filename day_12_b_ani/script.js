
document.querySelector('.animated-box').addEventListener('click', function () {
    console.log('Box clicked! Starting animation...');
    animation.play();

});

const animation = anime({
    targets: '.animated-box',
    translateX: '26rem',
    rotate: '2turn',
    opacity: 0,
    duration: 1500,
    easing: 'easeInOutQuad',
    complete: function () {
        anime.set('.animated-box', {
            translateX: 0,
            rotate: 0,
            opacity: 1
        });
    }
});

const animationHideSlider = anime({
    targets: '.slide-box',
    rotateY: '90deg',
    translateX: '100%',
    opacity: 0,
    duration: 1200,
    easing: 'easeInOutQuad',
    autoplay: false,
    complete: function () {
        anime.set('.slide-box', {
           opacity: 0,
           rotateY: '90deg'
        });
    }
});

// Control buttons
document.getElementById('start-btn').addEventListener('click', () => {
    animation.play();
    setTimeout(() => {
        animationHideSlider.play();
    }, 500);
});

document.getElementById('pause-btn').addEventListener('click', () => {
    animation.pause();
});

document.getElementById('reset-btn').addEventListener('click', () => {
    animation.restart();
});


