const sections = $('section');
const display = $('.maincontent');
const sideMenu = $('.fixed-menu');
const menuItems = sideMenu.find('.fixed-menu__item');

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass('active');

const countSectionPosition = sectionEq => {
  const position = sectionEq * -100;

  if (isNaN(position)) {
    console.error('Передано неверное значение в CountSectionPosition')
    return 0;
  }

  return position;
}

const changeMenuTheme = sectionEq => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr('data-sidemenu-theme');
  const activeClass = 'fixed-menu--shadowed';
  
  if (menuTheme === 'black') {
    sideMenu.addClass(activeClass);
  } else {
    sideMenu.removeClass(activeClass);
  }
}

const resetActiveClass = (items, itemEq, activeClass) => {
  items
    .eq(itemEq)
    .addClass(activeClass)
    .siblings()
    .removeClass(activeClass);
}

const performTransition = sectionEq => {
  if (inScroll) return;

  const transitionOver = 1000;
  const mouseInertiaOver = 300;

  inScroll = true;

  const position = countSectionPosition(sectionEq);

  changeMenuTheme(sectionEq);

  display.css({
    transform: `translateY(${position}%)`
  });

  resetActiveClass(sections, sectionEq, 'active');
  
  setTimeout(() => {
    inScroll = false;
    resetActiveClass(menuItems, sectionEq, 'fixed-menu__item--active')
  }, transitionOver + mouseInertiaOver);
}

const viewportScroller = () => {
  const activeSection = sections.filter('.active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },
    prev() {
      if (prevSection.length) {
        performTransition(prevSection.index());
      }
    }
  }
}

$(window).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {
    scroller.next();
  }

  if (deltaY < 0) {
    scroller.prev();
  }
});

$(window).on('keydown', e => {

  const tagName = e.target.tagName.toLowerCase();
  const userTypinInInputs = tagName === 'input' || tagName === 'textarea';

  if (userTypinInInputs) return;

  switch (e.keyCode) {
    case 38:
      viewportScroller('prev');
      break;
    case 40:
      viewportScroller('next');
      break;
  }
});

$('[data-scroll-to]').click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
});

$('.wrapper').on('touchmove', (event) => event.preventDefault());

if (isMobile) {
  //https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
  $('body').swipe( {
    swipe:function(event,direction) {
      const scroller = viewportScroller();
      let scrollDirection = "";
  
      if (direction === 'up') scrollDirection = 'next';
      if (direction === 'down') scrollDirection = 'prev';
  
      scroller[scrollDirection]();
    }
  });
}
