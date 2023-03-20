const toggles = document.querySelectorAll('[data-alert-toggle]');
const alert = document.querySelector('.alert--primary');

toggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    if (toggle.getAttribute('aria-expanded') === 'true') {
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
});

const closes = document.querySelectorAll('[data-alert-close]');

closes.forEach((close) => {
  close.addEventListener('click', () => {
    if (sessionStorage) {
      if (!sessionStorage.getItem('closed')) {
        alert.style.display = 'none';
        close.parentNode.remove();
        sessionStorage.setItem('closed', 'true');
      }
    }
  });
});

const load = function load() {
  if (sessionStorage) {
    if (sessionStorage.getItem('closed')) {
      if (alert) {
        alert.style.display = 'none';
      }
    } else if (alert) {
      alert.style.display = 'flex';
    }
  }
};

window.addEventListener('load', load);
