// const controls = document.querySelectorAll('.splash__control');

// for (const control of controls) {
//   const video = control.previousElementSibling?.querySelector('video');

//   if (video) {
//     video.addEventListener('pause', () => {
//       control.querySelector('.material-symbols-outlined').innerHTML = 'play_arrow';
//     });

//     video.addEventListener('play', () => {
//       control.querySelector('.material-symbols-outlined').innerHTML = 'pause';
//     });

//     control.addEventListener('click', () => {
//       if (video.paused) {
//         video.play();
//       } else {
//         video.pause();
//       }
//     });
//   }
// }

const splashes = document.querySelectorAll('.splash');

splashes.forEach((splash) => {
  if (splash.querySelector('#splashVideo')) {
    // Load the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;

    const control = splash.querySelector('.splash__control');
    const label = document.querySelector('.splash__control span');

    window.onYouTubeIframeAPIReady = function() {
      player = new YT.Player('splashVideo', {
        events: {
          'onReady': onPlayerReady,
        }
      });
    }

    function onPlayerReady() {
      control.removeAttribute("disabled");
      label.innerHTML = 'Pause background video';
      control.setAttribute('data-playing', '');
    }

    // Pause or Play video when the button is clicked
    control.addEventListener("click", function() {
      // Check if the video is playing
      if (player.getPlayerState() == YT.PlayerState.PLAYING) {
        player.pauseVideo();
        control.querySelector('.material-symbols-outlined').innerHTML = 'pause';
        control.removeAttribute('data-playing');
      } else {
        player.playVideo();
        control.querySelector('.material-symbols-outlined').innerHTML = 'play_arrow';
        control.setAttribute('data-playing', '');
      }
    });
  }
});