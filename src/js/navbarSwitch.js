import Swiper from 'swiper/bundle';
import { IS_MOBILE } from "./utils";

export default () => {
    const navbars = document.querySelectorAll('.navbar');

    navbars.forEach((navbar) => {
        navbar.addEventListener('click', (e) => {
            if(e.target.closest('.navbar__button')) {
                const btn = e.target.closest('.navbar__button');
                const ELEMENT_CLASS = 'js-navbar-button';
                const ACTIVE_CLASS = 'navbar__button--active';
                const activeItem = navbar.querySelector(`.${ELEMENT_CLASS}.${ACTIVE_CLASS}`);

                if (activeItem !== btn) activeItem?.classList.remove(ACTIVE_CLASS);

                btn.classList.toggle(ACTIVE_CLASS);

                const wrapper = navbar.closest('.js-switchable-window');
                const wrapper2 = navbar.closest('.js-mortgage-window');

                if(wrapper) {
                    const id = btn.dataset.switchId;
                    const findedEl = document.getElementById(id);
                    const windows = wrapper.querySelectorAll('[data-switch-window]');

                    if(id && findedEl) {
                        windows.forEach((window) => {
                            window.classList.add('display-none');
                        })

                        findedEl.classList.remove('display-none');
                    } else {
                        return;
                    }
                } else if (wrapper2) {
                    const id = btn.dataset.switchId;
                    const findedEl = wrapper2.querySelectorAll(`[data-mortgage-window=${id}]`);
                    const windows = wrapper2.querySelectorAll('[data-mortgage-window]');

                    if(id && (findedEl.length > 0)) {
                        windows.forEach((window) => {
                            window.classList.add('display-none');
                        })

                        findedEl.forEach((el) => {
                            el.classList.remove('display-none');
                        })
                    } else {
                        return;
                    }
                } else {
                    return;
                }

            }
        })

        if(IS_MOBILE && navbar.classList.contains('js-navbar-swiper')) {
            const navbarsSwiper = new Swiper(navbar, {
                slidesPerView: 'auto',
                spaceBetween: 0,

                slideClass: 'navbar__item',
                wrapperClass: 'navbar__list',
            })
        }
    })
}
