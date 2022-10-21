(function() {
  const menuBtn = document.querySelector('#openFullScreen');
  const closeBtn = document.querySelector('.fullscreen-menu__close')
  const fullScreenActive = document.querySelector('.fullscreen-menu--active');

  menuBtn.addEventListener('click', e => {
    e.preventDefault();
    fullScreenActive.style.display = 'flex';
  });

  closeBtn.addEventListener('click', e => {
    e.preventDefault();
    fullScreenActive.style.display = 'none';
  });
})
