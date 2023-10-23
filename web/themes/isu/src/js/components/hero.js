const toggle = document.querySelector('.hero__form__toggle');
const body = document.querySelector('body');
const close = document.querySelector('.hero__form__content--close');

const focusTrap = require('focus-trap');

let focusTrapViewForm;

if (toggle) {
  toggle.addEventListener('click', () => {
    body.classList.add('form-active');

    focusTrapViewForm = focusTrap.createFocusTrap('.hero__form__content', {
      escapeDeactivates: true,
      preventScroll: true,
    });

    focusTrapViewForm.activate();
  });

  close.addEventListener('click', () => {
    body.classList.remove('form-active');
    // focusTrapViewForm.deactivate();
  });
}
