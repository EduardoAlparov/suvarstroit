export default () => {
    const elements = document.querySelectorAll('.js-projects-map');

    elements.forEach(element => {

        ymaps.ready(['Panel']).then(initProjectsMap);

        ymaps.modules.define('Panel', [
            'util.augment',
            'collection.Item'
        ], function (provide, augment, item) {
            // Создаем собственный класс.
            var Panel = function (options) {
                Panel.superclass.constructor.call(this, options);
            };

            // И наследуем его от collection.Item.
            augment(Panel, item, {
                onAddToMap: function (map) {
                    Panel.superclass.onAddToMap.call(this, map);
                    this.getParent().getChildElement(this).then(this._onGetChildElement, this);
                    // Добавим отступы на карту.
                    // Отступы могут учитываться при установке текущей видимой области карты,
                    // чтобы добиться наилучшего отображения данных на карте.
                    map.margin.addArea({
                        top: 0,
                        left: 0,
                        width: '50%',
                        height: '100%'
                    })
                },

                onRemoveFromMap: function (oldMap) {
                    if (this._$control) {
                        this._$control.remove();
                    }
                    Panel.superclass.onRemoveFromMap.call(this, oldMap);
                },

                _onGetChildElement: function (parentDomContainer) {
                    // Создаем HTML-элемент с текстом.
                    // По-умолчанию HTML-элемент скрыт.
                    this._$control = $('<div class="customControl"><div class="content js-map-popup"></div><div class="closeButton"></div></div>').appendTo(parentDomContainer);
                    this._$content = $('.content');
                    // При клике по крестику будем скрывать панель.
                    $('.closeButton').on('click', this._onClose);
                },
                _onClose: function () {
                    $('.customControl').css('display', 'none');
                },
                // Метод задания контента панели.
                setContent: function (text) {
                    this._$control.css('display', 'flex');
                    this._$content.html($.parseHTML(text));
                }
            });

            provide(Panel);
        });

        function initProjectsMap() {
            const mapData = window.mapDataObjects ?? null;
            if (!mapDataObjects) return;

            const zoom = window.mapProjectsZoom ?? 14,
                center = window.mapProjectsCenter,

                mapInstance = new ymaps.Map(element, {
                    center: center,
                    zoom: zoom,
                    controls: []
                }),

                // макет главных маркеров с картинкой:
                MainMarkerLayout = ymaps.templateLayoutFactory.createClass([
                    '<div class="ya-main-placemark">',
                        '<div>$[properties.iconContent]</div>',
                    '</div>'
                ].join('')),

                // макет кластера с бордером:
                clusterMarkerLayout = ymaps.templateLayoutFactory.createClass([
                    '<div class="ya-main-cluster">',
                        '<div>{{ properties.geoObjects.length }}</div>',
                    '</div>'
                ].join('')),

                // макет кластера с ховером:
                clusterMarkerLayoutHover = ymaps.templateLayoutFactory.createClass([
                    '<div class="ya-main-cluster ya-main-cluster--hover">',
                        '<div>{{ properties.geoObjects.length }}</div>',
                    '</div>'
                ].join('')),

                // настройка макета иконки кластера:
                clusterIcons = [
                    {
                        size: [40, 40],
                        offset: [-20, -20]
                    },
                    {
                        shape: {
                            type: 'Circle',
                            coordinates: [0, 0],
                            radius: 25
                        }
                    }
                ],

                // макет хинта кластера(всплывашка):
                HintLayout = ymaps.templateLayoutFactory.createClass( "<div class='my-hint'>" +
                        "<div class='cluster-hint'>" +
                            "<p>Кликните,&nbsp;чтобы&nbsp;посмотреть объекты&nbsp;в&nbsp;этой&nbsp;оне</p>" +
                        "</div>" +
                    "</div>", {
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
                ),

                // макет обертки для попапа:
                MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
                    '<div class="popover">' +
                        '<a class="close" href="#">&times;</a>' +
                        '<div class="arrow"></div>' +
                        '<div class="popover-inner">' +
                        '$[[options.contentLayout observeSize]' +
                        '</div>' +
                    '</div>',
                {
                    /**
                     * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
                     * @function
                     * @name build
                     */
                    build: function() {
                        this.constructor.superclass.build.call(this);

                        this._$element = $('.popover', this.getParentElement());

                        this.applyElementOffset();

                        this._$element.find('.close').on('click', $.proxy(this.onCloseClick, this));
                    },

                    /**
                     * Удаляет содержимое макета из DOM.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
                     * @function
                     * @name clear
                     */
                    clear: function() {
                        this._$element.find('.close').off('click');

                        this.constructor.superclass.clear.call(this);
                    },

                    /**
                     * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                     * @function
                     * @name onSublayoutSizeChange
                     */
                    onSublayoutSizeChange: function() {
                        MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                        if (!this._isElement(this._$element)) {
                            return;
                        }

                        this.applyElementOffset();

                        this.events.fire('shapechange');
                    },

                    /**
                     * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                     * @function
                     * @name applyElementOffset
                     */
                    applyElementOffset: function() {
                        this._$element.css({
                            left: -46,
                            top: -(this._$element[0].offsetHeight / 2 + this._$element.find('.arrow')[0].offsetHeight)
                        });
                    },

                    /**
                     * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                     * @function
                     * @name onCloseClick
                     */
                    onCloseClick: function(e) {
                        e.preventDefault();

                        this.events.fire('userclose');
                    },

                    /**
                     * Используется для автопозиционирования (balloonAutoPan).
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
                     * @function
                     * @name getClientBounds
                     * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
                     */
                    getShape: function() {
                        if (!this._isElement(this._$element)) {
                            return MyBalloonLayout.superclass.getShape.call(this);
                        }

                        var position = this._$element.position();

                        return new ymaps.shape.Rectangle(
                            new ymaps.geometry.pixel.Rectangle([
                                [position.left, position.top],
                                [
                                    position.left + this._$element[0].offsetWidth,
                                    position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                                ]
                            ])
                        );
                    },

                    /**
                     * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
                     * @function
                     * @private
                     * @name _isElement
                     * @param {jQuery} [element] Элемент.
                     * @returns {Boolean} Флаг наличия.
                     */
                    _isElement: function(element) {
                        return element && element[0] && element.find('.arrow')[0];
                    }
                }
                ),

                // макет кнопок зума:
                ZoomLayout = ymaps.templateLayoutFactory.createClass(
                    "<div class='zoom-btns zoom-btns--projects'>" +
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
                }),

                // настройка кнопок зума:
                zoomControl = new ymaps.control.ZoomControl({
                    options: {
                        position: {
                            top: '30rem',
                            right: 'var(--content-padding, 4rem)',
                        },
                        layout: ZoomLayout
                    }
                }),

                // пакет плейсмаркеров:
                objectManager = new ymaps.ObjectManager({
                    clusterIcons: clusterIcons,
                    clusterIconContentLayout: clusterMarkerLayout,
                    clusterize: true,
                    clusterHasBalloon: true,
                    geoObjectOpenBalloonOnClick: true,
                    visible: true,
                    gridSize: 256,
                    clusterHasHint: true,
                    hintLayout: HintLayout,
                    hasBalloon: false,
                });

            // ховеры кластеров ==============================================>:
            objectManager.clusters.events.add(['mouseenter', 'mouseleave'], function (e) {
                const objectId = e.get('objectId');
                const overlay = objectManager.clusters.overlays.getById(objectId);

                if (e.get('type') == 'mouseenter') {
                    setHoverColor(objectId);
                    overlay.events.add('mapchange', onMapChange);

                } else {
                    setInitialColor(objectId);
                    overlay.events.remove('mapchange', onMapChange);

                }
            });
            function onMapChange (e) {
                setHoverColor(objectManager.clusters.overlays.getId(e.get('target')));
            }
            function setHoverColor (objectId) {
                objectManager.clusters.setClusterOptions(objectId, {
                    clusterIconContentLayout: clusterMarkerLayoutHover,
                });
            }
            function setInitialColor (objectId) {
                objectManager.clusters.setClusterOptions(objectId, {
                    clusterIconContentLayout: clusterMarkerLayout,
                });
            }
            // <============================================== ховеры кластеров.

            const panel = new ymaps.Panel();

            mapInstance.controls.add(panel, {
                float: 'left'
            });

            mapInstance.geoObjects.add(objectManager);
            mapInstance.behaviors.disable('scrollZoom');
            mapInstance.controls.add(zoomControl);

            mapInstance.events.add('click', function() {
                mapInstance.balloon.close();
            });

            const renderPlaces = () => {
                mapData.forEach(function(item, index) {
                    var objectToAdd = {
                        id: index,
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: item.coords,
                        },
                        options: {
                            iconLayout: MainMarkerLayout,
                            iconShape: {
                                type: 'Circle',
                                coordinates: [0, 0],
                                radius: 50
                            },
                            iconImageOffset: window.matchMedia("(max-width: 640px)").matches ? [-50, -150] : [-50, -150],
                            hideIconOnBalloonOpen: false
                        },
                        properties: {
                            iconContent: `
                                <img src="${item.image}" alt="" />
                            `,
                            balloonContent: `
                                <div class="map-popup">
                                    <div class="map-popup__inner-wrapper">
                                        <button id="closeButton" type="button" class="map-popup__close close-btn close-btn--smaller">
                                            <svg aria-hidden="true" class="icon">
                                                <use xlink:href="#close-empty"></use>
                                            </svg>
                                        </button>
                                        <div class="map-popup__body">
                                            <div class="map-popup__image">
                                                <ul class="project-card__tabs">
                                                    <li class="project-card__tab tab ${item.class[0]}">
                                                        <svg class="icon">
                                                            <use xlink:href="#key"></use>
                                                        </svg>
                                                        <span class="tab__text tab__text--text-14">${item.class[1]}</span>
                                                    </li>
                                                    <li class="project-card__tab tab tab--icon">
                                                        <svg class="icon">
                                                            <use xlink:href="#key"></use>
                                                        </svg>
                                                        <span class="tab__text tab__text--text-14">Сдача в ${item.devEnd}</span>
                                                    </li>
                                                </ul>
                                                <img src="${item.image}" alt="" />
                                            </div>

                                            <div class="map-popup__info">
                                                <div class="map-popup__heading">
                                                    <p class="map-popup__title map-popup__title--text-32">
                                                        ${item.name}
                                                    </p>
                                                    <p class="map-popup__address project-card__address">
                                                        ${item.address}
                                                    </p>
                                                </div>
                                                <ul class="map-popup__list">
                                                    <li class="map-popup__item">
                                                        <p class="map-popup__key">Студии</p>
                                                        <p class="map-popup__value">
                                                            ${item.studios} кв.
                                                        </p>
                                                    </li>
                                                    <li class="map-popup__item">
                                                        <p class="map-popup__key">1 комнатная</p>
                                                        <p class="map-popup__value">
                                                            ${item.oneRoom} кв.
                                                        </p>
                                                    </li>
                                                    <li class="map-popup__item">
                                                        <p class="map-popup__key">2 комнатная</p>
                                                        <p class="map-popup__value">
                                                            ${item.twoRoom} кв.
                                                        </p>
                                                    </li>
                                                    <li class="map-popup__item">
                                                        <p class="map-popup__key">3 комнатная</p>
                                                        <p class="map-popup__value">
                                                            ${item.threeRoom} кв.
                                                        </p>
                                                    </li>
                                                    <li class="map-popup__item">
                                                        <p class="map-popup__key">4 комнатная</p>
                                                        <p class="map-popup__value">
                                                            ${item.fourRoom} кв.
                                                        </p>
                                                    </li>
                                                </ul>

                                                <a href="${item.link}" target="_blank" class="main-btn main-btn--red main-btn--smaller">
                                                    Выбрать квартиру
                                                </a>
                                            </div>
                                        </div>
                                    </div>'
                                </div>
                            `
                        }
                    };

                    objectManager.add(objectToAdd);
                });
            }

            renderPlaces();

            objectManager.objects.events.add('click', function (e) {
                const objectId = e.get('objectId'),
                    object = objectManager.objects.getById(objectId),
                    text = object.properties.balloonContent;

                panel.setContent(text);
                mapInstance.panTo(object.geometry.coordinates, {useMapMargin: false});

                const popups = document.querySelectorAll('.js-map-popup');
                popups.forEach((popup) => {
                    popup.addEventListener('click', (e) => {
                        if(e.target.closest('#closeButton')) {
                            panel._onClose();
                        }
                    })
                })

                mapInstance.events.add('click', function() {
                    panel._onClose();
                });
            });
        }
    });
}
