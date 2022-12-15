import minimodal from 'minimodal';

const body = document.body;
const targets = document.querySelectorAll('[data-minimodal]');

targets.forEach((target) => {
  const modal = minimodal(target, {
    onOpen: function() {
      body.classList.add('noscroll');
    },
    onClose: function() {
      body.classList.remove('noscroll');
    }
  });
  modal.init();
});
