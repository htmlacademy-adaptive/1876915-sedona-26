const MIN_TEL_LENGTH = 10;

document.querySelector('.main-header--no-js')?.classList.remove('main-header--no-js');
document.querySelector('.hotel-search__map--no-js')?.classList.remove('hotel-search__map--no-js');
const navButton = document.querySelector('.main-nav__button');
const navMenu = document.querySelector('.main-nav__list');
const form = document.querySelector('.form');
const footer = document.querySelector('.footer');
const body = document.querySelector('.page__body-wrapper');
const successMessage = document.querySelector('.modal-success')?.content.querySelector('.form-modal')?.cloneNode(true);
const errorMessage = document.querySelector('.modal-error')?.content.querySelector('.form-modal')?.cloneNode(true);
const successButton = successMessage?.querySelector('.form-modal__button');
const errorButton = errorMessage?.querySelector('.form-modal__button');

if (successMessage && errorMessage) {
  body.prepend(successMessage);
  body.prepend(errorMessage);
}

const closeMenu = () => {
  navButton.classList.remove('main-nav__button--opened');
  navButton.classList.add('main-nav__button--closed');
  navMenu.classList.add('main-nav__list--hidden');
}

const openMenu = () => {
  navButton.classList.add('main-nav__button--opened');
  navButton.classList.remove('main-nav__button--closed');
  navMenu.classList.remove('main-nav__list--hidden');
}

const onNavButtonClick = () => {
  if (navButton.classList.contains('main-nav__button--opened')) {
    closeMenu();
  } else {
    openMenu();
  }
}

const onNavClose = (evt) => {
  if ((evt.target !== navButton) && (evt.target !== navMenu)) {
    closeMenu();
  }
}

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    closeMenu();
    successMessage.hidden = true;
    errorMessage.hidden = true;
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const tel = form.querySelector('input[type="tel"]');
  if (tel?.value.length < MIN_TEL_LENGTH) {
    errorMessage.hidden = false;
  } else {
    successMessage.hidden = false;
  }
}

const onSuccessButtonClick = () => successMessage.hidden = true;
const onErrorButtonClick = () => errorMessage.hidden = true;

errorButton?.addEventListener('click', onErrorButtonClick);
successButton?.addEventListener('click', onSuccessButtonClick);
navButton.addEventListener('click', onNavButtonClick);
document.body.addEventListener('click', onNavClose);
document.body.addEventListener('keydown', onEscKeyDown);
form?.addEventListener('submit', onFormSubmit);

onNavButtonClick();
