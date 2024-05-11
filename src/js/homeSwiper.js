import Swiper from 'swiper/bundle';

export default () => {
    const homeSwiperWrappers = document.querySelectorAll('.js-home-swiper-wrapper');

    homeSwiperWrappers.forEach((homeSwiperWrapper) => {
        const homeImageSwiperBox = homeSwiperWrapper.querySelector('.home-slider__image-swiper.swiper');
        const homeInfoSwiperBox = homeSwiperWrapper.querySelector('.home-slider__info-swiper.swiper');

        const swiperImage = new Swiper(homeImageSwiperBox, {

        })

        const swiperInfo = new Swiper(homeInfoSwiperBox, {
            effect: 'fade',
            fadeEffect: {
              crossFade: true
            },

            navigation: {
                nextEl: homeInfoSwiperBox.querySelector('.home-slider__swiper-btn'),
            },

            on: {
                init: function () {
                    console.log('swiper initialized');
                },
            },
        })

        swiperInfo.controller.control = swiperImage;
    })
}
