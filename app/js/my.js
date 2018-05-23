$(document).ready(function() {

    // Группы объектов
    var groups = [
        {
            name: "Студия кухни nobilia",
            style: "islands#redIcon",
            items: [
                {
                    center: [47.230731, 39.724589],
                    name: "<p class='map__title'>График работы:</p>" +
                    "<p class='map__text'>пн-сб: с 10:00 до 19:00,<br>" +
                    "вс: с 10:00 до 17:00</p>" +
                    "<p class='map__title'>Адрес:</p>" +
                    "<p class='map__text'>г.Ростов-на-Дону,<br>" +
                    "ул.Красноармейска д.103/123" +
                    "<p>Телефон:  +7 (863) 299-44-53</p>"
                }
            ]}
    ];

    ymaps.ready(init);

    function init() {

        // Создание экземпляра карты.
        var myMap = new ymaps.Map('map', {
                center: [47.230731, 39.724589],
                zoom: 13,
                controls: ['zoomControl', 'fullscreenControl', 'geolocationControl']
            }, {
                searchControlProvider: 'yandex#search'
            }),
            // Контейнер для меню.
            menu = $('<ul class="menu"/>');

        for (var i = 0, l = groups.length; i < l; i++) {
            createMenuGroup(groups[i]);
        }

        function createMenuGroup (group) {
            // Пункт меню.
            var menuItem = $('<li><a href="#">' + group.name + '</a></li>'),
                // Коллекция для геообъектов группы.
                collection = new ymaps.GeoObjectCollection(null, { preset: group.style }),
                // Контейнер для подменю.
                submenu = $('<ul class="submenu"/>');

            // Добавляем коллекцию на карту.
            myMap.geoObjects.add(collection);
            // Добавляем подменю.
            menuItem
                .append(submenu)
                // Добавляем пункт в меню.
                .appendTo(menu)
                // По клику удаляем/добавляем коллекцию на карту и скрываем/отображаем подменю.
                .find('a')
                .bind('click', function () {
                    if (collection.getParent()) {
                        myMap.geoObjects.remove(collection);
                        submenu.hide();
                    } else {
                        myMap.geoObjects.add(collection);
                        submenu.show();
                    }
                });
            for (var j = 0, m = group.items.length; j < m; j++) {
                createSubMenu(group.items[j], collection, submenu);
            }
        }

        function createSubMenu (item, collection, submenu) {
            // Пункт подменю.
            var submenuItem = $('<li><a href="#">' + item.name + '</a></li>'),
                // Создаем метку.
                placemark = new ymaps.Placemark(item.center, { balloonContent: item.name });

            // Добавляем метку в коллекцию.
            collection.add(placemark);
            // Добавляем пункт в подменю.
            submenuItem
                .appendTo(submenu)
                // При клике по пункту подменю открываем/закрываем баллун у метки.
                .find('a')
                .bind('click', function () {
                    if (!placemark.balloon.isOpen()) {
                        placemark.balloon.open();
                    } else {
                        placemark.balloon.close();
                    }
                    return false;
                });
        }

        // Добавляем меню в тэг BODY.
        menu.appendTo($('body'));
        myMap.setBounds({
            checkZoomRange: true,
        });
        // Выставляем масштаб карты чтобы были видны все группы.
        myMap.setBounds(myMap.geoObjects.getBounds());
    }



    var galleryTop = new Swiper('.gallery-top', {
        effect: 'coverflow',
        //grabCursor: true,
        centeredSlides: true,
        slidesPerView: 2,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        coverflowEffect: {
            rotate: 90,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true,
        },
    });
    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 5,
        touchRatio: 0.2,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        slideToClickedSlide: true,
    });

    galleryTop.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryTop;
	
});