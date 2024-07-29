import Swiper from 'swiper/bundle';

export default () => {
    const carouselsWrappers = document.querySelectorAll('.js-triple-carousel-wrapper');

    carouselsWrappers.forEach((carouselsWrapper) => {
        const swiperBlock = carouselsWrapper.querySelector('.similar__swiper.swiper');

        const nav = {
            speed: 700,

            navigation: {
                nextEl: carouselsWrapper.querySelector('.carousel-btn__next'),
                prevEl: carouselsWrapper.querySelector('.carousel-btn__prev'),
            },
        };

        const options = {
            slidesPerVeiw: 1,
            spaceBetween: 12,

            ...nav,

            breakpoints: {
                768: {
                    slidesPerView: 3,
                    spaceBetween: 24
                }
            }
        };

        const options5 = {
            slidesPerVeiw: 1.2,
            spaceBetween: 16,

            ...nav,

            breakpoints: {
                768: {
                    slidesPerView: 5,
                    spaceBetween: 24
                }
            }
        }

        if(swiperBlock.dataset.slides === '5') {
            new Swiper(swiperBlock, {
                ...options5,
            });
        } else {
            new Swiper(swiperBlock, {
                ...options,
            })
        }
    })
}
