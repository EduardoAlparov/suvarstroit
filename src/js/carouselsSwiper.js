import Swiper from 'swiper/bundle';

export default () => {
    const carouselsWrappers = document.querySelectorAll('.js-carousel-swiper-section');

    carouselsWrappers.forEach((carouselsWrapper) => {
        const swiperBlock = carouselsWrapper.querySelector('.carousel__swiper.swiper');
        const isTriple = swiperBlock.classList.contains('carousel__swiper--triple');
        const isQuarter= swiperBlock.classList.contains('carousel__swiper--quarter');

        let mobileOptions = {
            spaceBetween: 8,
            slidesPerView: 1.1,
            speed: 600
        };

        let destopOptions = {
            slidesPerView: 2.65,
            spaceBetween: 24,
            speed: 600
        };

        switch (isTriple) {
            case true:
                mobileOptions = {
                    spaceBetween: 8,
                    slidesPerView: 1.1,
                    speed: 700
                };
                destopOptions = {
                    spaceBetween: 24,
                    slidesPerView: 3,
                    speed: 700
                };

                break;

            default:
                break;
        }

        switch (isQuarter) {
            case true:
                mobileOptions = {
                    spaceBetween: 8,
                    slidesPerView: 1.1,
                    speed: 500
                };
                destopOptions = {
                    spaceBetween: 24,
                    slidesPerView: 4,
                    speed: 500
                };

                break;

            default:
                break;
        }

        const carouselSwiper = new Swiper(swiperBlock, {
            ...mobileOptions,

            navigation: {
                nextEl: carouselsWrapper.querySelector('.carousel-btn__next'),
                prevEl: carouselsWrapper.querySelector('.carousel-btn__prev'),
            },

            breakpoints: {
                768: {
                    ...destopOptions
                }
            }
        })
    })
}
