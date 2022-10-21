(function(){
  let myMap;

  const init = () => {
    myMap = new ymaps.Map('map', {
      center: [55.745712, 37.606599],
      zoom: 15,
      controls: []
    });

    const coords = [
      [55.745498, 37.603325]
    ];

    const myCollection = new ymaps.GeoObjectCollection({},{
      draggable: false,
      iconLayout: 'default#image',
      iconImageHref: '../img/icons/marker.svg',
      iconImageSize: [60, 82],
      iconImageOffset: [-3, -42]
    });

    coords.forEach(coord => {
      myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);
    myMap.behaviors.disable('scrollZoom');
  }

  ymaps.ready(init);
})

