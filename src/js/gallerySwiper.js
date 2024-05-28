import Swiper from 'swiper/bundle';

export default () => {
    const galleries = document.querySelectorAll('.js-gallery-swiper-wrapper');

    galleries.forEach((gallery) => {
        const ACTIVE_CLASS = 'gallery__thumb--active';
        const imageSlider = new Swiper('.gallery__main-swiper.swiper', {
            speed: 700,

            autoplay: {
                delay: 3000,
            },

            navigation: {
                nextEl: gallery.querySelector('.carousel-btn__next'),
                prevEl: gallery.querySelector('.carousel-btn__prev'),
            },

            pagination: {
                el: ".swiper-pagination",
                type: "fraction",
            },

            on: {
                init: function () {
                    const galleryThumbs = gallery.querySelectorAll('.gallery__thumb');

                    galleryThumbs.forEach((galleryThumb, index) => {
                        galleryThumb.addEventListener('click', (e) => {
                            e.preventDefault();

                            if((index + 1) > imageSlider.slides.length) return;
                            imageSlider.slideTo(index);
                        })
                    })
                },

                activeIndexChange: function () {
                    const galleryThumbs = gallery.querySelectorAll('.gallery__thumb');
                    const index = imageSlider.realIndex;

                    galleryThumbs.forEach((galleryThumb) => {
                        galleryThumb.classList.remove(ACTIVE_CLASS);
                    })

                    galleryThumbs[index].classList.add(ACTIVE_CLASS);
                }
            }
        });

        const thumbs = new Swiper('.gallery__thumbs-swiper.swiper', {
            direction: 'vertical',
            spaceBetween: 8,
            slidesPerView: 7.4,
            // slidesPerView: "auto",
            speed: 600,
            allowTouchMove: false,
            mousewheel: true,
        })
    })
}
