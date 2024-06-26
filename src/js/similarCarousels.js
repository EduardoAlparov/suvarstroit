import Swiper from 'swiper/bundle';

export default () => {
    const carouselsWrappers = document.querySelectorAll('.js-triple-carousel-wrapper');

    carouselsWrappers.forEach((carouselsWrapper) => {
        const swiperBlock = carouselsWrapper.querySelector('.similar__swiper.swiper');

        const carouselSwiper = new Swiper(swiperBlock, {
            slidesPerVeiw: 1,
            spaceBetween: 12,
            speed: 700,

            navigation: {
                nextEl: carouselsWrapper.querySelector('.carousel-btn__next'),
                prevEl: carouselsWrapper.querySelector('.carousel-btn__prev'),
            },

            breakpoints: {
                768: {
                  slidesPerView: 3,
                  spaceBetween: 24
                }
            }
        })
    })
}
