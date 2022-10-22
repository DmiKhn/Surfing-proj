(function(){
  const findBlockByName = (name) => {
    return $('.reviews__item').filter((ndx, elem) => {
      return $(elem).attr('data-linked-with') === name;
    });
  };
  
  $('.interactive-avatar__link').click(e => {
    e.preventDefault();
  
    const $this = $(e.currentTarget);
    const linkTarget = $this.attr('data-open');
    const linkToShow = findBlockByName(linkTarget);
    const currentLink = $this.closest('.interactive-avatar');
  
    console.log(linkToShow);
    linkToShow.addClass('reviews__item--active').siblings().removeClass('reviews__item--active');
    currentLink.addClass('interactive-avatar--active').siblings().removeClass('interactive-avatar--active');
  });
})()
