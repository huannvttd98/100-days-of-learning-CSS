// ===== Card Squeeze Effect - Hiệu Ứng Nặn Bài =====

// LEVEL 3: Advanced Mouse Tracking Effect
const advancedCards = document.querySelectorAll('.card-advanced');

advancedCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    const maxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2;

    // Tính intensity dựa trên khoảng cách
    const intensity = Math.max(0, 1 - distance / maxDistance);

    // Áp dụng distortion dựa trên mouse position
    const skewX = (mouseX / rect.width) * 8 * intensity;
    const skewY = (mouseY / rect.height) * 8 * intensity;
    const rotateX = (mouseY / rect.height) * 15 * intensity;
    const rotateY = -(mouseX / rect.width) * 15 * intensity;

    card.style.transform = `
      perspective(600px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      skewX(${skewX}deg)
      skewY(${skewY}deg)
      scale(${1 + intensity * 0.08})
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) skewX(0) skewY(0) scale(1)';
  });
});

// LEVEL 2: Drag Effect Enhancement
const intermediateCards = document.querySelectorAll('.card-intermediate');
let isDragging = false;
let dragCard = null;

intermediateCards.forEach(card => {
  card.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragCard = card;
    card.style.transition = 'none';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !dragCard) return;

  const rect = dragCard.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;

  const rotateX = (deltaY / rect.height) * -20;
  const rotateY = (deltaX / rect.width) * 20;
  const scaleX = 0.9 + Math.abs(deltaX / rect.width) * 0.15;

  dragCard.style.transform = `
    perspective(600px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scaleX(${scaleX})
    scaleY(0.95)
  `;
});

document.addEventListener('mouseup', () => {
  if (dragCard) {
    dragCard.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    dragCard.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scaleX(1) scaleY(1)';
    isDragging = false;
    dragCard = null;
  }
});

// LEVEL 1: Simple ripple effect on click
const basicCards = document.querySelectorAll('.card-basic');

basicCards.forEach(card => {
  card.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: rgba(102, 126, 234, 0.4);
      border-radius: 50%;
      pointer-events: none;
      animation: ripple-animation 0.6s ease-out;
    `;

    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-animation {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Info display
console.log(`
🎴 Card Squeeze Effects Loaded!

Level 1 (Cơ bản): Hover để xem scale + rotate
Level 2 (Trung bình): Nhấn giữ để drag và xem 3D effect
Level 3 (Nâng cao): Di chuyển chuột để xem distortion realtime
🔄 Flip Card: Click để lật bài

Enjoy! 🎉
`);

// ===== FLIP CARD: Lật bài enhancement =====
const flipCards = document.querySelectorAll('.flip-card');

flipCards.forEach(flipCard => {
  flipCard.addEventListener('click', function(e) {
    // Play flip animation effect
    const flipCardInner = this.querySelector('.flip-card-inner');
    flipCardInner.classList.add('flip-sound');

    // Remove the animation class after it finishes
    setTimeout(() => {
      flipCardInner.classList.remove('flip-sound');
    }, 300);

    // Add ripple effect
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: rgba(102, 126, 234, 0.5);
      border-radius: 50%;
      pointer-events: none;
      animation: flip-ripple 0.8s ease-out;
      z-index: 10;
    `;

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 800);
  });

  // Add keyboard support (Space to flip)
  flipCard.addEventListener('keydown', function(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.click();
    }
  });

  // Make flipcard focusable for keyboard
  flipCard.setAttribute('tabindex', '0');
});

// Ripple animation for flip cards
const flipRippleStyle = document.createElement('style');
flipRippleStyle.textContent = `
  @keyframes flip-ripple {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(flipRippleStyle);
