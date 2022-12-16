const toggles = document.querySelectorAll('.menu--open');
const body = document.querySelector('body');

const focusTrap = require('focus-trap');
let focusTrapViewMenu;

const activateMenu = () => {
  body.classList.add('menu-active');

  toggles.forEach((toggle) => {
    toggle.setAttribute('aria-expanded', 'true');
  });

  focusTrapViewMenu = focusTrap.createFocusTrap('.header', {
    checkCanFocusTrap: () => {
      // Wait for animations to finish before focusing
      return new Promise((resolve) => {
        setTimeout(resolve, 250);
      })
    },
    allowOutsideClick: true,
    escapeDeactivates: true,
    preventScroll: true,
    onPostDeactivate: () => {
      deactivateMenu(false);
    }
  });

  focusTrapViewMenu.activate();
}

const deactivateMenu = (deactivateMenuTrap = true) => {
  body.classList.remove('menu-active');

  if (deactivateMenuTrap && focusTrapViewMenu) {
    focusTrapViewMenu.deactivate();
  }

  toggles.forEach((toggle) => {
    toggle.setAttribute('aria-expanded', 'false');
  });
}

const toggleMenu = () => {
  if (body.classList.contains('menu-active')) {
    deactivateMenu();
  }
  else {
    activateMenu();
  }
}

toggles.forEach((toggle) => {
  toggle.addEventListener('click', toggleMenu);
});
