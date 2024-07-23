export default () => {
    const labelBtns = document.querySelectorAll('.js-card-dropdown-button');

    labelBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.classList.toggle('searched-card__dropdown-button--active');

            window.addEventListener('click', (e) => {
                if(!e.target.closest('.js-card-dropdown-button')) {
                    labelBtns.forEach((btn) => {
                        btn.classList.remove('searched-card__dropdown-button--active');
                    })
                }
            })
        })
    })
}
