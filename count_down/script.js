

//  count down 10 seconds script.js

const buttonClick = document.getElementById('start-button');

function runAnimation() {
    const el = document.getSelection('center-cont-down');
    el.style.animation = "none";
    void el.offsetWidth; // reset
    el.style.animation = "scaleAnim 1s ease-in-out";
}
const startCountdown = () => {
    console.log('Countdown started');
    let time = document.getElementById('time');
    const countdownInterval =
    setInterval(() => {
        console.log('Counting down:', time.textContent);
        runAnimation();
        if (time.textContent > 0) {
            time.textContent = time.textContent - 1;
            document.getElementById('time').innerText = time.textContent;
        } else {
            clearInterval(countdownInterval);

            console.log('Countdown finished');
        }
    }, 1000);
};

document.addEventListener('DOMContentLoaded', () => {

buttonClick.addEventListener('click', startCountdown);

});