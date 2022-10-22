(function(){
  $(document).ready(() => {
    $('.team__name-link').on('click', (e) => {
      e.preventDefault();
  
      const curItem = $(e.target).closest('.team__item');
  
      curItem.toggleClass('team__item--active').siblings().removeClass('team__item--active');
    });
  });
})()


