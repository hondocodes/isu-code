const watch = () => {
  const targets = document.querySelectorAll('[data-animate]:not([data-animate="true"])');
  let done = false;

  [...targets].forEach((target) => {
    if (!done) {
      const pos = target.getBoundingClientRect();
      if (pos.top < (window.innerHeight - 100) && pos.bottom > 100) {
        target.setAttribute('data-animate', 'true');
        done = true;
      }
    }
  });

  const delay = done ? 125 : 0;

  setTimeout(() => {
    requestAnimationFrame(watch);
  }, delay);
};

setTimeout(() => {
  watch();
}, 1000);
