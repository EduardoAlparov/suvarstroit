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
            }
        })
    })
}
