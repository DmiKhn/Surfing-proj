// let iframe = document.querySelector('iframe');
// let player = new Vimeo.Player(iframe);
// const playerContainer = $('.player');

// let formatTime = (timeSec) => {
//   const roundTime = Math.round(timeSec);

//   const minutes = addZero(Math.floor(roundTime / 60));
//   const seconds = addZero(roundTime - minutes * 60);

//   function addZero(num) {
//     return num < 10 ? `0${num}` : num;
//   }

//   return `${minutes}`+':'+`${seconds}`;
// }


// player.getCurrentTime().then((seconds) => { 
//   let interval;

//   if (typeof interval !== 'undefined') {
//     clearInterval(interval);
//   }

//   interval = setInterval(() => {
//     let completedSec = seconds;
//     $('.player__duration-completed').text(formatTime(completedSec));
//     // console.log(completedSec);
//   }, 1000);
// });



// const durationSec = player.getDuration().then((dur) => {
  
//   $('.player__duration-estimate').text(formatTime(dur));
// });

// let eventsInit = () => {

//   $('.player__start').click(e => {
//     e.preventDefault();

//     if (playerContainer.hasClass('paused')) {
//       playerContainer.removeClass('paused');
//       player.pause();
//     } else {
//       playerContainer.addClass('paused');
//       player.play();
//     }
    
//   });
// };

// eventsInit();

let iframe = document.querySelector('iframe');
let player = new Vimeo.Player(iframe);
const playerContainer = $('.player');

let formatTime = (timeSec) => {
  const roundTime = Math.round(timeSec);

  const minutes = addZero(Math.floor(roundTime / 60));
  const seconds = addZero(roundTime - minutes * 60);

  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  return `${minutes}`+':'+`${seconds}`;
}

$('.player__start').click(e => {
  e.preventDefault();
  
  if (playerContainer.hasClass('paused')) {
    playerContainer.removeClass('paused');
    player.pause();
  } else {
    playerContainer.addClass('paused');
    player.play();
  }
});

player.getDuration().then((duration) => {
  $('.player__duration-estimate').text(formatTime(duration));
  // `duration` indicates the duration of the video in seconds
});

player.on('play', () => {
  let interval;

  if (typeof interval !== 'undefined') {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const currentTime = player.getCurrentTime().then(function(seconds) {
      $('.player__duration-completed').text(formatTime(seconds));
      // console.log(formatTime(seconds));
    });

    // $('.player__playback-button').css({
    //   left: `${5}%`
    // });
  },1000)
  
  console.log('Played the video');
});

player.getVideoTitle().then(function(title) {
  console.log('title:', title);
});