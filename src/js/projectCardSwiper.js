import Swiper from 'swiper/bundle';

export default () => {
    const projectCardSwiperBoxes = document.querySelectorAll('.js-card-swiper-wrapper');

    projectCardSwiperBoxes.forEach((projectCardSwiperBox) => {
        const imageSwiper = projectCardSwiperBox.querySelector('.project-card__swiper.swiper');
        const transparentThumbs = projectCardSwiperBox.querySelector('.transparent-thumbs.swiper');

        const projectCardSwiper = new Swiper(imageSwiper, {
            init: false,
            speed: 400,
            effect: 'fade',
            fadeEffect: {
              crossFade: true
            },

            pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true,
            },
        });

        projectCardSwiper.on('init', function () {
            const s = 4;
            const projectCardThumbs = new Swiper(transparentThumbs, {
                slidesPerView: projectCardSwiper.slides.length,

                virtual: {
                    slides: (function () {
                        const slides = [];
                        for (var i = 0; i < s; i += 1) {
                            slides.push(i + 1);
                        }
                        return slides;
                    })(),
                },

                thumbs: {
                    swiper: projectCardSwiper,
                },

                on: {
                    init: function () {
                        const thumbs = this.slides;

                        thumbs.forEach((thumb) => {
                            thumb.addEventListener('mouseenter', () => {
                                const index = thumbs.indexOf(thumb);
                                projectCardSwiper.slideTo(index);
                            })
                        })
                    },
                }
            });
        });

        projectCardSwiper.init();
    })
}
