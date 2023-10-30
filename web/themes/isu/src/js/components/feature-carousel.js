import Flickity from 'flickity';
import 'flickity-imagesloaded';

const carousels = document.querySelectorAll('.feature-carousel__carousel');

carousels.forEach((carousel) => {
  const flkty = new Flickity(carousel, {
    imagesLoaded: true,
    cellSelector: '.feature-carousel__item',
    arrowShape: 'm23.9,43.8h76.1v12.5H23.9l35,35-8.9,8.8L0,50,50,0l8.9,8.8L23.9,43.8Z',
  });

  document.addEventListener("DOMContentLoaded", function(){

    var buttonWrapper = document.createElement('div')
    buttonWrapper.setAttribute("class", "flickity-nav")
    var pageDots = carousel.querySelector('.flickity-page-dots');

    buttonWrapper.appendChild(pageDots);
    Array.prototype.forEach.call(carousel.querySelectorAll('.flickity-button'), (item) => {
      buttonWrapper.appendChild(item)
    })
    carousel.appendChild(buttonWrapper);

  })

  flkty.resize();

  // const sliderNav = carousel.querySelectorAll('.feature-carousel__nav');

  // sliderNav.forEach((sliderNav) => {
  //   const previousButton = sliderNav.querySelector('.feature-carousel__previous');
  //   previousButton.addEventListener('click', () => {
  //     flkty.previous();
  //   });

  //   const nextButton = sliderNav.querySelector('.feature-carousel__next');
  //   nextButton.addEventListener('click', () => {
  //     flkty.next();
  //   });
  // });
});
