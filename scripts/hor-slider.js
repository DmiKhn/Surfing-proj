  const sliderSection = $('.hor-slider__wrapper');

  $('.hor-slider__link').click((e) => {
    e.preventDefault();

    const curItem = $(e.target).closest('.hor-slider__item');
    
    sliderSection.toggleClass('hor-slider__wrapper--active');
    curItem.toggleClass('hor-slider__item--active').siblings().removeClass('hor-slider__item--active');
  });

  $('.hor-slider__close').click((e) => {
    e.preventDefault();
    sliderSection.toggleClass('hor-slider__wrapper--active');
    $(e.target).closest('.hor-slider__item').removeClass('hor-slider__item--active');
  });