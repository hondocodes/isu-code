import Flickity from 'flickity';
import 'flickity-imagesloaded';

const carousels = document.querySelectorAll('.image-carousel');

carousels.forEach((carousel) => {
  const flkty = new Flickity(carousel, {
    imagesLoaded: true,
    cellSelector: '.image-carousel__item',
    cellAlign: 0.001,
    draggable: false,
    prevNextButtons: false,
    resize: true,
  });

  const sliderNav = carousel.querySelectorAll('.image-carousel__nav');

  sliderNav.forEach((sliderNav) => {
    const previousButton = sliderNav.querySelector('.image-carousel__previous');
    previousButton.addEventListener('click', () => {
      flkty.previous();
    });

    const nextButton = sliderNav.querySelector('.image-carousel__next');
    nextButton.addEventListener('click', () => {
      flkty.next();
    });
  });
});
