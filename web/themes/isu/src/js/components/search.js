
var checkReadyState = setInterval(() => {


if (document.readyState === "complete") {

clearInterval(checkReadyState);
const toggles = document.querySelectorAll('.search--open');
const body = document.querySelector('body');


const focusTrap = require('focus-trap');
let focusTrapViewSearch;

const activateSearch = () => {
  body.classList.add('search-active');

  toggles.forEach((toggle) => {
    toggle.setAttribute('aria-expanded', 'true');
  });

  focusTrapViewSearch = focusTrap.createFocusTrap('.header', {
    initialFocus: () => {
      return document.getElementById('search-main');
    },
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
      deactivateSearch(false);
    }
  });

  focusTrapViewSearch.activate();
}

const deactivateSearch = (deactivateSearchTrap = true) => {
  body.classList.remove('search-active');

  if (deactivateSearchTrap && focusTrapViewSearch) {
    focusTrapViewSearch.deactivate();
  }

  toggles.forEach((toggle) => {
    toggle.setAttribute('aria-expanded', 'false');
  });
}

const toggleSearch = () => {
  if (body.classList.contains('search-active')) {
    deactivateSearch();
  }
  else {
    activateSearch();
  }
}

toggles.forEach((toggle) => {
  toggle.addEventListener('click', toggleSearch);
});

}}, 5);
