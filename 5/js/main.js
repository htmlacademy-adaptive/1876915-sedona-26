document.querySelector('.main-header--no-js')?.classList.remove('main-header--no-js');
const navButton = document.querySelector('.main-nav__button');
const navMenu = document.querySelector('.main-nav__menu');

const onNavButtonClick = () => {
  if (navButton.classList.contains('main-nav__button--opened')) {
    navButton.classList.remove('main-nav__button--opened');
    navButton.classList.add('main-nav__button--closed');
    navMenu.classList.add('main-nav__menu--hidden');
  } else {
    navButton.classList.add('main-nav__button--opened');
    navButton.classList.remove('main-nav__button--closed');
    navMenu.classList.remove('main-nav__menu--hidden');
  }
}

navButton.addEventListener('click', onNavButtonClick);
onNavButtonClick();
