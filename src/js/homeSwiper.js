import Swiper from 'swiper/bundle';
import { closestEdge } from "./utils";

export default () => {
    const homeSwiperWrappers = document.querySelectorAll('.js-home-swiper-wrapper');

    homeSwiperWrappers.forEach((homeSwiperWrapper) => {
        const homeImageSwiperBox = homeSwiperWrapper.querySelector('.home-slider__image-swiper.swiper');
        const homeInfoSwiperBox = homeSwiperWrapper.querySelector('.home-slider__info-swiper.swiper');
        const isFullSlider = homeSwiperWrapper.classList.contains('home--fillscreen-project');

        const swiperImage = new Swiper(homeImageSwiperBox, {
            pagination: {
                el: isFullSlider ? ".number-pagination" : ".swiper-pagination",
                dynamicBullets: !isFullSlider,
                type: isFullSlider ? "fraction" : "bullets",
            },

            on: {
                init: function () {
                    const body = homeSwiperWrapper.querySelector('.js-home-slider-body');

                    body.addEventListener("click", function(e) {
                        let dir = closestEdge(e, body);

                        if(dir === 'left') {
                            swiperImage.slidePrev(600);
                        } else {
                            swiperImage.slideNext(600);
                        }
                    });
                },
            },
        })

        const swiperInfo = new Swiper(homeInfoSwiperBox, {
            effect: 'fade',
            fadeEffect: {
              crossFade: true
            }
        })

        swiperInfo.controller.control = swiperImage;
        swiperImage.controller.control = swiperInfo;
    })
}
