import Flickity from 'flickity';
import 'flickity-imagesloaded';

const carousels = document.querySelectorAll('.stats-panel__carousel');

carousels.forEach((carousel) => {
  const flkty = new Flickity(carousel, {
    imagesLoaded: true,
    cellSelector: '.stats-panel__item',
    // cellAlign: 0.001,
    draggable: false,
    watchCSS: true,
    prevNextButtons: false,
    resize: true,
  });

  const sliderNav = carousel.querySelectorAll('.stats-panel__nav');

  sliderNav.forEach((sliderNav) => {
    const previousButton = sliderNav.querySelector('.stats-panel__previous');
    previousButton.addEventListener('click', () => {
      flkty.previous();
    });

    const nextButton = sliderNav.querySelector('.stats-panel__next');
    nextButton.addEventListener('click', () => {
      flkty.next();
    });
  });
});
