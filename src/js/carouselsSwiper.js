import Swiper from 'swiper/bundle';

export default () => {
    const carouselsWrappers = document.querySelectorAll('.js-carousel-swiper-section');

    carouselsWrappers.forEach((carouselsWrapper) => {
        const swiperBlock = carouselsWrapper.querySelector('.carousel__swiper.swiper');
        const isTriple = swiperBlock.classList.contains('carousel__swiper--triple');

        const carouselSwiper = new Swiper(swiperBlock, {
            spaceBetween: isTriple ? 8 : 0,
            slidesPerView: isTriple ? 1.1 : 1,
            speed: 700,

            navigation: {
                nextEl: carouselsWrapper.querySelector('.carousel-btn__next'),
                prevEl: carouselsWrapper.querySelector('.carousel-btn__prev'),
            },

            breakpoints: {
                768: {
                    slidesPerView: isTriple ? 3 : 2.4,
                    spaceBetween: 24
                }
            }
        })
    })
}
