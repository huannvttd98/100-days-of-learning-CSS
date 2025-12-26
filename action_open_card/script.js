const cardOpen = document.querySelector('.card-open');
const arrow = document.getElementById('arrow');
let touchStartX = 0;
let isArrowVisible = false;
let isDragging = false;
let mouseStartX = 0;
let mouseDown = false;
const cardWidth = cardOpen.offsetWidth || 400; // Lấy chiều rộng card (hoặc mặc định 400px)
const hideThreshold = cardWidth * 0.8; // 80% chiều dài card

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

    // Thu nhỏ độ rộng card theo khoảng cách kéo
    cardOpen.style.width = `calc(50% - ${diff}px)`;

    // Nếu kéo quá 80% chiều dài card
    if (diff > hideThreshold) {
        isDragging = true;
        arrow.classList.remove('show');
        cardOpen.classList.add('hide');
        isArrowVisible = false;
    }
});

cardOpen.addEventListener('touchend', (e) => {
    // Nếu chưa đến ngưỡng 80%, quay lại vị trí ban đầu
    if (!cardOpen.classList.contains('hide')) {
        cardOpen.style.width = '50%';
    }
});

// Mouse drag event (cho desktop)
cardOpen.addEventListener('mousedown', (e) => {
    mouseDown = true;
    mouseStartX = e.clientX;
    isDragging = false;
});

cardOpen.addEventListener('mousemove', (e) => {
    if (!mouseDown || !isArrowVisible) return;

    const diff = e.clientX - mouseStartX;

    cardOpen.style.width = `calc(50% - ${diff}px)`;


    if (diff > hideThreshold) {
        isDragging = true;
        mouseDown = false;
        arrow.classList.remove('show');
        cardOpen.classList.add('hide');
        isArrowVisible = false;
        console.log("Show time hide card");
    }
});

cardOpen.addEventListener('mouseup', () => {
    mouseDown = false;
    if (!cardOpen.classList.contains('hide')) {
        cardOpen.style.width = '50%';
    }
});
