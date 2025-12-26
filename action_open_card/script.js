const cardOpen = document.querySelector('.card-open');
const arrow = document.getElementById('arrow');
let touchStartX = 0;
let isArrowVisible = false;
let isDragging = false;

// Hover event để hiển thị mũi tên
cardOpen.addEventListener('mouseenter', (e) => {
    if (!isDragging) {
        arrow.classList.add('show');
        isArrowVisible = true;
    }
});

// Ẩn mũi tên khi không hover
cardOpen.addEventListener('mouseleave', () => {
    arrow.classList.remove('show');
    isArrowVisible = false;
});

// Touch start event
cardOpen.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    isDragging = false;
});

// Touch move event
cardOpen.addEventListener('touchmove', (e) => {
    if (!isArrowVisible) return;

    const touchCurrentX = e.touches[0].clientX;
    const diff = touchCurrentX - touchStartX;

    // Nếu kéo sang phải hơn 50px
    if (diff > 50) {
        isDragging = true;
        arrow.classList.remove('show');
        cardOpen.classList.add('hide');
        isArrowVisible = false;
    }
});

// Mouse drag event (cho desktop)
let mouseDown = false;
let mouseStartX = 0;

cardOpen.addEventListener('mousedown', (e) => {
    mouseDown = true;
    mouseStartX = e.clientX;
    isDragging = false;
});

cardOpen.addEventListener('mousemove', (e) => {
    if (!mouseDown || !isArrowVisible) return;

    const diff = e.clientX - mouseStartX;

    if (diff > 50) {
        isDragging = true;
        arrow.classList.remove('show');
        cardOpen.classList.add('hide');
        isArrowVisible = false;
    }
});

cardOpen.addEventListener('mouseup', () => {
    mouseDown = false;
});
