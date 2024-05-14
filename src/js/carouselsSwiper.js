import Swiper from 'swiper/bundle';

export default () => {
    const carouselsWrappers = document.querySelectorAll('.js-carousel-swiper-section');

    carouselsWrappers.forEach((carouselsWrapper) => {
        const swiperBlock = carouselsWrapper.querySelector('.carousel__swiper.swiper');

        const carouselSwiper = new Swiper(swiperBlock, {
            slidesPerVeiw: 1,
            speed: 700,

            navigation: {
                nextEl: carouselsWrapper.querySelector('.carousel-btn__next'),
                prevEl: carouselsWrapper.querySelector('.carousel-btn__prev'),
            },

            breakpoints: {
                768: {
                  slidesPerView: 2.5,
                  spaceBetween: 24
                }
            }
        })
    })
}
