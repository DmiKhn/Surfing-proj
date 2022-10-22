(function(){
  const mesureWidth = item => {
    let reqItemWidth = 0;
  
    const screenWidth = $(window).width();
    const container = item.closest('.hor-slider__menu');
    const titlesBlock = container.find('.hor-slider__link');
    const titlesWidth = titlesBlock.width() * titlesBlock.length;
  
    const textContainer = item.find('.hor-slider__desc-container');
    const padLeft = parseInt(textContainer.css('padding-left'));
    const padRight = parseInt(textContainer.css('padding-right'));
  
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
  
    if (isMobile) {
      reqItemWidth = screenWidth - titlesWidth;
    } else {
      reqItemWidth = 500;
    }
  
    console.log(reqItemWidth);
  
    return {
      container: reqItemWidth,
      textContainer: reqItemWidth - padLeft - padRight
    }
  
  };
  
  const closeEverything = container => {
    const items = container.find('.hor-slider__item');
    const content = container.find('.hor-slider__desc');
  
    items.removeClass('active');
    content.width(0);
  }
  
  const openItem = item => {
    const hiddenContent = item.find('.hor-slider__desc');
    const reqWidth = mesureWidth(item);
    const textBlock = item.find('.hor-slider__desc-container');
    
    item.addClass('active');
    hiddenContent.width(reqWidth.container);
    textBlock.width(reqWidth.textContainer);
  }
  
  $('.hor-slider__link').on('click', e => {
    e.preventDefault();
  
    const $this = $(e.currentTarget);
    const item = $this.closest('.hor-slider__item');
    const itemOpened = item.hasClass('active');
    const container = $this.closest('.hor-slider__menu');
  
    if (itemOpened) {
      closeEverything(container);
    } else {
      closeEverything(container);
      openItem(item);
    }
  });
  
  $('.hor-slider__close').on('click', e => {
    e.preventDefault();
  
    closeEverything($('.hor-slider__menu'));
  });
})()

