(function(){
  const productSlider = $('.products__list').bxSlider({
    pager: false,
    controls: false
  });
  
  $('.product__slide-arrow--right').on('click', e => {
    e.preventDefault();
    productSlider.goToNextSlide();
  });
  
  $('.product__slide-arrow--left').on('click', e => {
    e.preventDefault();
    productSlider.goToPrevSlide();
  
  });
})

