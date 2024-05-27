export default () => {
    const elements = document.querySelectorAll('.js-footer-map');
    const btns = document.querySelectorAll('.map-section__button.map-button[data-coords]');

    btns.forEach((btn, index) => {
        const ELEMENT_CLASS = 'map-button[data-coords]';
        const ACTIVE_CLASS = 'map-button--active';

        btn.dataset.idx = index;

        btn.addEventListener('click', () => {
            const activeItem = document.querySelector(`.${ELEMENT_CLASS}.${ACTIVE_CLASS}`);

            if (activeItem !== btn) activeItem?.classList.remove(ACTIVE_CLASS);

            btn.classList.toggle(ACTIVE_CLASS);
        })
    });

    elements.forEach(element => {
        ymaps.ready(initContactsMap);

        function initContactsMap() {
            const btns = document.querySelectorAll('.map-section__button.map-button[data-idx]');

            const mapData = window.mapData ?? null;
            if (!mapData) return;

            const zoom = window.mapZoom ?? 14,

                center = window.mapCenter,

                mapInstance = new ymaps.Map(element, {
                    center: center,
                    zoom: zoom,
                    controls: []
                }),

                MainMarkerLayout = ymaps.templateLayoutFactory.createClass([
                    '<div class="ya-main-placemark">',
                        '<div>$[properties.iconContent]</div>',
                    '</div>'
                ].join('')),

                MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="popover">' +
                    `<a class="close" href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 329 329"><path fill="#fff" d="M194.64,164.77,322.75,36.66A21.31,21.31,0,0,0,292.61,6.52L164.5,134.63,36.39,6.52A21.31,21.31,0,0,0,6.25,36.66L134.36,164.77,6.25,292.88A21.31,21.31,0,0,0,36.39,323L164.5,194.91,292.61,323a21.31,21.31,0,0,0,30.14-30.14Z" /></svg></a>` +
                    '<div class="arrow"></div>' +
                    '<div class="popover-inner">' +
                        '$[[options.contentLayout observeSize minWidth=420 maxWidth=480]]' +
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

                MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass([
                    '<h3 class="popover-title">$[properties.balloonHeader]',
                        '<div class="popover-content">$[properties.balloonContent]',
                        '</div>',
                    '</h3>'
                ].join('')),

                objectManager = new ymaps.ObjectManager({
                    clusterize: false,
                    clusterHasBalloon: false,
                    geoObjectOpenBalloonOnClick: true,
                    visible: false
                });

            mapInstance.geoObjects.add(objectManager);

            // mapInstance.behaviors.disable('scrollZoom');

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
                            balloonShadow: false,
                            balloonLayout: MyBalloonLayout,
                            balloonContentLayout: MyBalloonContentLayout,
                            balloonPanelMaxMapArea: 0,
                            hideIconOnBalloonOpen: false,
                            balloonOffset: [140, 0],
                        },
                        properties: {
                            iconContent: `
                                <img src="${item.image}" alt="" />
                            `,
                            balloonContent: `
                                <div class="popover-column"">
                                    <div class="popover-info">
                                        <h4 class="popover-title popover-title--text-18">${item.title}</h4>
                                        <div class="popover-name popover-name--h5-text">${item.name}</div>
                                    </div>
                                    <ul class="popover-list">
                                        <li>
                                            <span class="popover-icon pin"></span>
                                            <div class="popover-item popover-item--text-18">
                                                ${item.address}
                                            </div>
                                        </li>
                                        <li>
                                            <span class="popover-icon phone"></span>
                                            <div class="popover-item popover-item--text-18">
                                                ${item.phone}
                                            </div>
                                        </li>
                                        <li>
                                            <span class="popover-icon email"></span>
                                            <div class="popover-item popover-item--text-18">
                                                ${item.email}
                                            </div>
                                        </li>
                                        <li>
                                            <span class="popover-icon time"></span>
                                            <div class="popover-item popover-item--text-18">
                                                ${item.timeStart}<br>
                                                ${item.timeEnd}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            `
                        }
                    };

                    objectManager.add(objectToAdd);
                });
            }

            renderPlaces();

            btns.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const idx = btn.dataset.idx;

                    objectManager.setFilter(function (objects) {
                        return objects.id == idx;
                    });
                })
            })

            btns[0].click();
        }
    });
}
