// const nameLink = document.querySelectorAll('.team__name-link');
// const nameDesk = document.querySelectorAll('.team__desc');
// const nameIcon = document.querySelector('.team__name-icon');
// const teamItem = document.querySelectorAll('.team__item');

// nameLink.forEach(item => {
//   item.addEventListener('click', e => {
//     e.preventDefault();

//     item.closest('.team__item').querySelector('.team__desc').classList.toggle('team__desc--active');
//     item.closest('.team__item').querySelector('.team__name-icon').classList.toggle('team__name-icon--active');
//   });
// });


// $(document).ready(() => {
//   $('.team__name-link').on('click', (e) => {
//       e.preventDefault();

//       const currentItem = $(e.target).closest('.team__item')
//       const currentDesc = currentItem.find('.team__desc')

//       currentDesc.toggleClass('team__desc--active').siblings().removeClass('team__desc--active');
//   });
// });

$(document).ready(() => {
  $('.team__name-link').on('click', (e) => {
    e.preventDefault();

    const curItem = $(e.target).closest('.team__item');

    curItem.toggleClass('team__item--active').siblings().removeClass('team__item--active');
  });
});
