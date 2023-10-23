// dependencies
import 'focus-visible';

// utilities
import './util/focus-within';
import './util/minimodal';
import './util/expand';
import './util/select';
import './util/toggle';
import './util/animate';

// components
import './components/accordion';
import './components/alert';
import './components/header';
import './components/image-carousel';
import './components/menu';
import './components/_programs';
import './components/search';
import './components/stats-panel';
import './components/testimonial-carousel';
import './components/splash';
import './components/feature-carousel';

document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);

  const cards = document.querySelectorAll(".card-stack__card");

  cards.forEach((card, index) => {
      let scaleValue = Number((0.7 + 0.1 * index).toFixed(1));

      if (index === cards.length - 1) {
          // Special behavior for the last card
          gsap.fromTo(card, {
              scale: 1,
              transformOrigin: '50% 0%'
          }, {
              scale: 1,
              scrollTrigger: {
                  trigger: card,
                  start: "top 20%",
                  end: "bottom 20%",
                  scrub: true,
                  // markers: true
              }
          });
      } else {
          gsap.fromTo(card, {
              scale: 1,
              transformOrigin: '50% 0%'
          }, {
              scale: scaleValue,
              scrollTrigger: {
                  trigger: card,
                  start: "top 20%",
                  end: "top -30%",
                  scrub: true,
                  // markers: true
              }
          });
      }
  });
});

