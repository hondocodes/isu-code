import Flickity from 'flickity';
import 'flickity-imagesloaded';

const carousels = document.querySelectorAll('.testimonial-carousel');

carousels.forEach((carousel) => {
  const flkty = new Flickity(carousel, {
    imagesLoaded: true,
    cellSelector: '.testimonial-carousel__item',
    // cellAlign: 0.001,
    draggable: false,

    prevNextButtons: false,
    resize: true,
  });

  const sliderNav = carousel.querySelectorAll('.testimonial-carousel__nav');

  sliderNav.forEach((sliderNav) => {
    const previousButton = sliderNav.querySelector('.testimonial-carousel__previous');
    previousButton.addEventListener('click', () => {
      flkty.previous();
    });

    const nextButton = sliderNav.querySelector('.testimonial-carousel__next');
    nextButton.addEventListener('click', () => {
      flkty.next();
    });
  });
});
