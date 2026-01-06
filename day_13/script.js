let currentPage = 0;
const totalPages = 4;
const bookCover = document.querySelector('.book-cover');
const pages = document.querySelectorAll('.page');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const pageIndicator = document.getElementById('pageIndicator');

// Initialize
function init() {
    pages.forEach((page, index) => {
        page.style.opacity = '0';
        page.style.pointerEvents = 'none';
    });
    bookCover.style.zIndex = '100';
    updateButtons();
}

function showPage(pageIndex) {
    // Hide all pages
    pages.forEach((page, index) => {
        page.style.pointerEvents = 'none';
    });

    // If cover is still visible, hide it with animation
    if (bookCover.style.opacity !== '0') {
        anime({
            targets: bookCover,
            opacity: 0,
            duration: 800,
            easing: 'easeInOutQuad',
            complete: () => {
                bookCover.style.pointerEvents = 'none';
                bookCover.style.zIndex = '-1';
            }
        });
    }

    // Show current page with flip animation
    const currentPageElement = pages[pageIndex];
    currentPageElement.style.pointerEvents = 'auto';

    anime({
        targets: currentPageElement,
        opacity: [0, 1],
        rotateY: [-90, 0],
        duration: 900,
        easing: 'easeOutCubic'
    });

    currentPage = pageIndex;
    updatePageIndicator();
    updateButtons();
}

function flipToNextPage() {
    if (currentPage < totalPages - 1) {
        // Animate out current page
        if (currentPage >= 0) {
            anime({
                targets: pages[currentPage],
                rotateY: 90,
                opacity: 0,
                duration: 700,
                easing: 'easeInCubic'
            });
        }

        // Show next page
        setTimeout(() => {
            showPage(currentPage + 1);
        }, 100);
    }
}

function flipToPrevPage() {
    if (currentPage > 0) {
        // Animate out current page
        anime({
            targets: pages[currentPage],
            rotateY: -90,
            opacity: 0,
            duration: 700,
            easing: 'easeInCubic'
        });

        // Show previous page
        setTimeout(() => {
            showPage(currentPage - 1);
        }, 100);
    } else if (currentPage === 0) {
        // Go back to cover
        anime({
            targets: pages[0],
            rotateY: -90,
            opacity: 0,
            duration: 700,
            easing: 'easeInCubic'
        });

        setTimeout(() => {
            anime({
                targets: bookCover,
                opacity: 1,
                duration: 800,
                easing: 'easeInOutQuad'
            });
            bookCover.style.pointerEvents = 'auto';
            bookCover.style.zIndex = '100';
            currentPage = -1;
            updatePageIndicator();
            updateButtons();
        }, 100);
    }
}

function updateButtons() {
    // Disable/enable next button
    if (currentPage >= totalPages - 1) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }

    // Disable/enable prev button
    if (currentPage <= -1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
}

function updatePageIndicator() {
    if (currentPage === -1) {
        pageIndicator.textContent = 'Cover';
    } else {
        pageIndicator.textContent = `Page ${currentPage + 1}`;
    }
}

// Event listeners
nextBtn.addEventListener('click', flipToNextPage);
prevBtn.addEventListener('click', flipToPrevPage);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        flipToNextPage();
    } else if (e.key === 'ArrowLeft') {
        flipToPrevPage();
    }
});

// Initialize on load
init();
