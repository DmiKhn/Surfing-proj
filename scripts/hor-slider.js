
  $('.hor-slider__link').click((e) => {
    e.preventDefault();

    const curItem = $(e.target).closest('.hor-slider__item');

    curItem.toggleClass('hor-slider__item--active').siblings().removeClass('hor-slider__item--active');
  });

  $('.hor-slider__close').click((e) => {
    e.preventDefault();
    $(e.target).closest('.hor-slider__item').removeClass('hor-slider__item--active');
  });