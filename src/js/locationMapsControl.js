export default () => {
    const elements = Array.from(document.querySelectorAll('.js-location-map'));

    if(elements.length < 1) return;

    elements.forEach(element => {
        const windowHeight = element.clientHeight;
        ymaps.ready(initContactsMap);

        function initContactsMap() {
            const locationMiddleSchools = window.locationMiddleSchools ?? null;
            const locationMeds = window.locationMeds ?? null;
            const locationMarkets = window.locationMarkets ?? null;
            const locationPlayschools = window.locationPlayschools ?? null;


            const zoom = window.locationZoom ?? 15,
                center = window.locationCenter,
                mainCoords = window.mainCoords,
                mediaQuery = window.matchMedia('(max-width: 640px)').matches;

            const mapInstance = new ymaps.Map(element, {
                center: center,
                zoom: zoom,
                controls: []
            });

            const MainMarkerLayout = ymaps.templateLayoutFactory.createClass([
                '<div class="ya-main-placemark">',
                    '<span></span>',
                '</div>'
            ].join(''));

            const getPointData = function (index) {
                return {
                    balloonContentHeader: '<font size=3><b><a target="_blank" href="https://yandex.ru">Здесь может быть ваша ссылка</a></b></font>',
                    balloonContentBody: '<p>Ваше имя: <input name="login"></p><p>Телефон в формате 2xxx-xxx:  <input></p><p><input type="submit" value="Отправить"></p>',
                    balloonContentFooter: '<font size=1>Информация предоставлена: </font> балуном <strong>метки ' + index + '</strong>',
                    clusterCaption: 'метка <strong>' + index + '</strong>'
                }
            };

            const getPointOptions = function () {
                return {
                    iconLayout: MainMarkerLayout,
                };
            };

            // zoom controls start: ==========================================>
            const  ZoomLayout = ymaps.templateLayoutFactory.createClass(
                "<div class='zoom-btns'>" +
                    "<div id='zoom-in' class='zoom-in-btn'><i class='icon-plus'></i></div>" +
                    "<div id='zoom-out' class='zoom-in-btn'><i class='icon-minus'></i></div>" +
                "</div>", {

                // Переопределяем методы макета, чтобы выполнять дополнительные действия
                // при построении и очистке макета.
                build: function () {
                    // Вызываем родительский метод build.
                    ZoomLayout.superclass.build.call(this);

                    // Привязываем функции-обработчики к контексту и сохраняем ссылки
                    // на них, чтобы потом отписаться от событий.
                    this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                    this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                    // Начинаем слушать клики на кнопках макета.
                    $('#zoom-in').bind('click', this.zoomInCallback);
                    $('#zoom-out').bind('click', this.zoomOutCallback);
                },

                clear: function () {
                    // Снимаем обработчики кликов.
                    $('#zoom-in').unbind('click', this.zoomInCallback);
                    $('#zoom-out').unbind('click', this.zoomOutCallback);

                    // Вызываем родительский метод clear.
                    ZoomLayout.superclass.clear.call(this);
                },

                zoomIn: function () {
                    var map = this.getData().control.getMap();
                    map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
                },

                zoomOut: function () {
                    var map = this.getData().control.getMap();
                    map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
                }
            });
            const zoomControl = new ymaps.control.ZoomControl({
                options: {
                    position: {
                        top: (windowHeight / 2),
                        right: 'var(--content-padding, 4rem)',
                    },
                    layout: ZoomLayout
                }
            });
            mapInstance.controls.add(zoomControl);
            // <================================================= zoom end start

            let mainPLacemark = new ymaps.Placemark(mainCoords, getPointData(1), getPointOptions());
            mapInstance.geoObjects.add(mainPLacemark);

            mapInstance.behaviors.disable('scrollZoom');
            if (mediaQuery) {
                mapInstance.behaviors.disable('drag');
                mapInstance.behaviors.enable('MultiTouch');
            }

            var HintLayout = ymaps.templateLayoutFactory.createClass( "<div class='my-hint'>" +
                "<b>{{ properties.object }}</b><br />" +
                "{{ properties.address }}" +
                "</div>", {
                    // Определяем метод getShape, который
                    // будет возвращать размеры макета хинта.
                    // Это необходимо для того, чтобы хинт автоматически
                    // сдвигал позицию при выходе за пределы карты.
                    getShape: function () {
                        var el = this.getElement(),
                            result = null;
                        if (el) {
                            var firstChild = el.firstChild;
                            result = new ymaps.shape.Rectangle(
                                new ymaps.geometry.pixel.Rectangle([
                                    [0, 0],
                                    [firstChild.offsetWidth, firstChild.offsetHeight]
                                ])
                            );
                        }
                        return result;
                    }
                }
            );

            var locationMiddleSchoolsLayout = ymaps.templateLayoutFactory.createClass([
                '<div data-placemark="midschool" class="ya-mid-school-placemark ya-secondary-placemark">',
                    '<svg aria-hidden="true" class="icon">',
                        '<use xlink:href="#school"></use>',
                    '</svg>',
                '</div>'
            ].join(''));

            var locationMiddleSchoolsLayoutHover = ymaps.templateLayoutFactory.createClass([
                '<div data-placemark="midschool" class="ya-mid-school-placemark ya-secondary-placemark ya-secondary-placemark--hover">',
                    '<svg aria-hidden="true" class="icon">',
                        '<use xlink:href="#school"></use>',
                    '</svg>',
                '</div>'
            ].join(''));

            var locationMedsLayout = ymaps.templateLayoutFactory.createClass([
                '<div data-placemark="meds" class="ya-mid-school-placemark ya-secondary-placemark">',
                    '<svg aria-hidden="true" class="icon">',
                        '<use xlink:href="#meds"></use>',
                    '</svg>',
                '</div>'
            ].join(''));

            var locationMedsLayoutHover = ymaps.templateLayoutFactory.createClass([
                '<div data-placemark="meds" class="ya-mid-school-placemark ya-secondary-placemark ya-secondary-placemark--hover">',
                    '<svg aria-hidden="true" class="icon">',
                        '<use xlink:href="#meds"></use>',
                    '</svg>',
                '</div>'
            ].join(''));

            var locationMarketsLayout = ymaps.templateLayoutFactory.createClass([
                '<div data-placemark="markets" class="ya-mid-school-placemark ya-secondary-placemark">',
                    '<svg aria-hidden="true" class="icon">',
                        '<use xlink:href="#markets"></use>',
                    '</svg>',
                '</div>'
            ].join(''));

            var locationMarketsLayoutHover = ymaps.templateLayoutFactory.createClass([
                '<div data-placemark="markets" class="ya-mid-school-placemark ya-secondary-placemark ya-secondary-placemark--hover">',
                    '<svg aria-hidden="true" class="icon">',
                        '<use xlink:href="#markets"></use>',
                    '</svg>',
                '</div>'
            ].join(''));

            var locationPSLayout = ymaps.templateLayoutFactory.createClass([
                '<div data-placemark="playschool" class="ya-mid-school-placemark ya-secondary-placemark">',
                    '<svg aria-hidden="true" class="icon">',
                        '<use xlink:href="#p-school"></use>',
                    '</svg>',
                '</div>'
            ].join(''));

            var locationPSLayoutHover = ymaps.templateLayoutFactory.createClass([
                '<div data-placemark="playschool" class="ya-mid-school-placemark ya-secondary-placemark ya-secondary-placemark--hover">',
                    '<svg aria-hidden="true" class="icon">',
                        '<use xlink:href="#p-school"></use>',
                    '</svg>',
                '</div>'
            ].join(''));

            locationMiddleSchools.forEach(function(item) {
                var msp = new ymaps.Placemark(item.coords, {
                    address: item.title,
                    object: item.address
                },{
                    iconLayout: locationMiddleSchoolsLayout,
                    iconShape: {
                        type: 'Circle',
                        // Круг описывается в виде центра и радиуса
                        coordinates: [0, 0],
                        radius: 30
                    },
                    hintLayout: HintLayout,

                });

                msp.events.add('mouseenter', function (e) {
                    e.get('target').options.set('iconLayout', locationMiddleSchoolsLayoutHover);
                });

                msp.events.add('mouseleave', function (e) {
                    e.get('target').options.set('iconLayout', locationMiddleSchoolsLayout);
                });

                mapInstance.geoObjects.add(msp);
            });

            locationMeds.forEach(function(item) {
                var msp = new ymaps.Placemark(item.coords, {
                    address: item.title,
                    object: item.address
                },{
                    iconLayout: locationMedsLayout,
                    iconShape: {
                        type: 'Circle',
                        // Круг описывается в виде центра и радиуса
                        coordinates: [0, 0],
                        radius: 25
                    },
                    hintLayout: HintLayout
                });

                msp.events.add('mouseenter', function (e) {
                    e.get('target').options.set('iconLayout', locationMedsLayoutHover);
                });

                msp.events.add('mouseleave', function (e) {
                    e.get('target').options.set('iconLayout', locationMedsLayout);
                });


                mapInstance.geoObjects.add(msp);
            });

            locationMarkets.forEach(function(item) {
                var msp = new ymaps.Placemark(item.coords, {
                    address: item.title,
                    object: item.address
                },{
                    iconLayout: locationMarketsLayout,
                    iconShape: {
                        type: 'Circle',
                        // Круг описывается в виде центра и радиуса
                        coordinates: [0, 0],
                        radius: 25
                    },
                    hintLayout: HintLayout
                });

                msp.events.add('mouseenter', function (e) {
                    e.get('target').options.set('iconLayout', locationMarketsLayoutHover);
                });

                msp.events.add('mouseleave', function (e) {
                    e.get('target').options.set('iconLayout', locationMarketsLayout);
                });


                mapInstance.geoObjects.add(msp);
            });

            locationPlayschools.forEach(function(item) {
                var msp = new ymaps.Placemark(item.coords, {
                    address: item.title,
                    object: item.address
                },{
                    iconLayout: locationPSLayout,
                    iconShape: {
                        type: 'Circle',
                        // Круг описывается в виде центра и радиуса
                        coordinates: [0, 0],
                        radius: 25
                    },
                    hintLayout: HintLayout
                });

                msp.events.add('mouseenter', function (e) {
                    e.get('target').options.set('iconLayout', locationPSLayoutHover);
                });

                msp.events.add('mouseleave', function (e) {
                    e.get('target').options.set('iconLayout', locationPSLayout);
                });


                mapInstance.geoObjects.add(msp);
            });
        }
    })
}
