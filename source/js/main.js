const navButton = document.querySelector('.main-nav__button');
const navMenu = document.querySelector('.main-nav__menu');

const onNavButtonClick = () => {
  navButton.classList.toggle('main-nav__button--open');
  navMenu.classList.toggle('main-nav__menu--hidden');
}

navButton.addEventListener('click', onNavButtonClick);
onNavButtonClick();
