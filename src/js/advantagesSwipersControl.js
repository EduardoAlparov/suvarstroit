import Swiper from 'swiper/bundle';

export default () => {
    const items = document.querySelectorAll('.js-advantages-item-swiper');

    items.forEach((item) => {

        const imagesSwiper = new Swiper('.advantages__image-swiper.swiper', {
            slidesPerView: 1.1,
            spaceBetween: 8,
            speed: 700,

            navigation: {
                nextEl: item.querySelector('.carousel-btn__next'),
                prevEl: item.querySelector('.carousel-btn__prev'),
            },

            breakpoints: {
                769: {
                    slidesPerView: 1,
                    spaceBetween: 0,

                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    },
                }
            },

            on: {
                init: function () {
                    const thumbs = document.querySelectorAll('.js-info-thumb[data-thumb-index]');

                    thumbs.forEach((thumb) => {
                        thumb.addEventListener('click', (e) => {
                            e.preventDefault();

                            const wrapper = thumb.closest('.advantages__info-thumbs');
                            const ELEMENT_CLASS = 'js-info-thumb';
                            const ACTIVE_CLASS = 'advantages__info-thumb--active';
                            const activeItem = wrapper.querySelector(`.${ELEMENT_CLASS}.${ACTIVE_CLASS}`);

                            if (activeItem !== thumb) activeItem?.classList.remove(ACTIVE_CLASS);
                            thumb.classList.toggle(ACTIVE_CLASS);

                            imagesSwiper.slideTo(thumb.dataset.thumbIndex, 600);
                        })
                    });
                },

                activeIndexChange: function () {
                    const idx = imagesSwiper.activeIndex;
                    const thumbs = document.querySelectorAll('.js-info-thumb[data-thumb-index]');
                    const wrapper = item.querySelector('.advantages__info-thumbs');
                    const activeItem = wrapper.querySelector(`[data-thumb-index="${idx}"]`);

                    thumbs.forEach((thumb) => {
                        thumb.classList.remove('advantages__info-thumb--active');
                    })

                    activeItem.classList.add('advantages__info-thumb--active');
                }
            }
        })
    })
}
