const navButton = document.querySelector('.main-nav__button');
const navList = document.querySelector('.main-nav__list');

const onNavButtonClick = () => {
  navButton.classList.toggle('main-nav__button--close');
  navButton.classList.toggle('main-nav__button--open');
  navList.classList.toggle('visually-hidden');
}

document.addEventListener("DOMContentLoaded", onNavButtonClick);
navButton.addEventListener('click', onNavButtonClick);
