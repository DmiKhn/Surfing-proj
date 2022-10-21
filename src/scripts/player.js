(function(){
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

  let previewOnPlay = () => {
    playerContainer.addClass('player--active');
    $('.player__controls').addClass('player__controls--active');
  }
  let previewOnPause = () => {
    playerContainer.removeClass('player--active');
    $('.player__controls').removeClass('player__controls--active');
  }

  const playerOnAndOff = () => {
    if (playerContainer.hasClass('paused')) {
      playerContainer.removeClass('paused');
      player.pause();
      previewOnPause();
    } else {
      playerContainer.addClass('paused');
      player.play();
      previewOnPlay();
    }
  };

  $('.player__start').click(e => {
    e.preventDefault();
    playerOnAndOff();
  });

  $('.player__splash').click(() => {
    playerOnAndOff();
  })

  player.getDuration().then((duration) => {
    $('.player__duration-estimate').text(formatTime(duration));
  });

  player.on('play', () => {
    let interval;

    if (typeof interval !== 'undefined') {
      clearInterval(interval);
    }

    interval = setInterval(() => {
      player.getCurrentTime().then(function(seconds) {
        $('.player__duration-completed').text(formatTime(seconds));
      });
    },1000)
  });

  player.on('timeupdate', (data) => {
    $('.player__playback-button').css({
      left: `${data.percent * 100}%` 
    })
  });

  $('.player__playback').click(e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
    
    $('.player__playback-button').css({
      left: `${newButtonPositionPercent}%` 
    })

    player.getDuration().then((duration) => {
      const result = (duration / 100) * newButtonPositionPercent;
      player.setCurrentTime(result);
    });
  });
})
