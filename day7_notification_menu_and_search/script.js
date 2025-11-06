

const searchIcon = document.querySelector('.search-icon');
searchIcon.addEventListener('click', () => {
    const searchInput = document.querySelector('.search-input');
    searchInput.classList.toggle('active');
}   );

const menuIcon = document.querySelector('.menu-icon');
menuIcon.addEventListener('click', () => {
    const panel = document.querySelector('.panel');
    const menu = document.querySelector('.menu');
    panel.classList.toggle('show-menu');
    menu.classList.toggle('active');
});