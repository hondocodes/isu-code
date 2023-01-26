const toggles = document.querySelectorAll('.accordion__toggle');
const toggleContents = document.querySelectorAll('.accordion__content');

toggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    toggleContents.forEach((content) => {
      content.classList.remove('active');
      content.style.height = '0px';
    });
    if (toggle.getAttribute('aria-expanded') === 'true') {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.parentElement.nextElementSibling.style.height = '0px';
    } else {
      toggles.forEach((button) => {
        button.setAttribute('aria-expanded', 'false');
      });
      toggle.setAttribute('aria-expanded', 'true');
      toggle.parentElement.nextElementSibling.classList.add('active');
      toggle.parentElement.nextElementSibling.style.height = `${toggle.parentElement.nextElementSibling.scrollHeight}px`;
    }
  });
});
