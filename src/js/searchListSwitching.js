export default () => {
    const btns = document.querySelectorAll('.js-switching-btn');

    btns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const dataView = btn.dataset.view;
            const catalog = document.querySelector('.list-section__catalog')
            const ACTIVE_CLASS = 'switching__btn--active';
            const ELEMENT_CLASS = 'js-switching-btn';
            const activeItem = document.querySelector(`.${ELEMENT_CLASS}.${ACTIVE_CLASS}`);

            if (activeItem !== btn) activeItem?.classList.remove(ACTIVE_CLASS);

            btn.classList.toggle(ACTIVE_CLASS);

            if(catalog && dataView && (dataView === 'list')) {
                catalog.classList.add('list-section__catalog--list');
                catalog.classList.remove('list-section__catalog--tiles');
            } else if(catalog && dataView && (dataView === 'tile')) {
                catalog.classList.remove('list-section__catalog--list');
                catalog.classList.add('list-section__catalog--tiles');
            }
        })
    })
}
