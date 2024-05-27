import Swiper from 'swiper/bundle';

export default () => {
    const wrappers = document.querySelectorAll('.js-plans-sliders-wrapper');
    const singleWrappers = document.querySelectorAll('.js-plans-slider-wrapper');

    wrappers.forEach((wrapper) => {
        const innerSliders = wrapper.querySelectorAll('.plans__swiper.swiper');
        const toggleWindowsBtns = wrapper.querySelectorAll('.plans__link[data-plan-link]');
        const toggledSliders = wrapper.querySelectorAll('.plans__slider[data-plan-slider]');
        const toggledInfoCols = wrapper.querySelectorAll('.plans__info-wrapper[data-plan-info]');

        toggleWindowsBtns[0].classList.add('plans__link--active');
        toggledSliders[0].classList.remove('display-none');
        toggledInfoCols[0].classList.remove('display-none');

        toggleWindowsBtns.forEach((btn) => {

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const dataPlan = btn.dataset.planLink;

                toggleWindowsBtns.forEach((toggleWindowsBtn) => {
                    toggleWindowsBtn.classList.remove('plans__link--active');
                })

                btn.classList.add('plans__link--active');

                toggledSliders.forEach((toggledSlider) => {
                    toggledSlider.classList.add('display-none');
                })

                toggledInfoCols.forEach((toggledInfoCol) => {
                    toggledInfoCol.classList.add('display-none');
                })

                const slider = wrapper.querySelector(`.plans__slider[data-plan-slider="${dataPlan}"]`);
                const info = wrapper.querySelector(`.plans__info-wrapper[data-plan-info="${dataPlan}"]`);

                slider.classList.remove('display-none');
                info.classList.remove('display-none');
            })

        })

        innerSliders.forEach((innerSlider) => {
            const sliderSwiper = new Swiper(innerSlider, {
                slidesPerView: 1,
                speed: 400,

                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },

                pagination: {
                    el: ".swiper-pagination",
                    type: "bullets",
                },

                on: {
                    init: function () {
                        const parentSlider = innerSlider.closest('.plans__slider');
                        const navBtns = parentSlider.querySelectorAll('.navbar__item > button[data-plan-thumb]');

                        navBtns.forEach((btn) => {
                            btn.addEventListener('click', () => {
                                sliderSwiper.slideTo(btn.dataset.planThumb);
                            })
                        });
                    },
                }
            })
        })
    })

    singleWrappers.forEach((singleWrapper) => {
        const sliderSwiper = new Swiper('.plans__swiper.swiper', {
            slidesPerView: 1,
            speed: 400,

            effect: 'fade',
            fadeEffect: {
              crossFade: true
            },

            pagination: {
                el: ".swiper-pagination",
                type: "bullets",
            },

            on: {
                init: function () {
                    const navBtns = singleWrapper.querySelectorAll('.navbar__item > button[data-plan-thumb]');

                    navBtns.forEach((btn) => {
                        btn.addEventListener('click', () => {
                            sliderSwiper.slideTo(btn.dataset.planThumb);
                        })
                    });
                },
            }
        })
    })
}
