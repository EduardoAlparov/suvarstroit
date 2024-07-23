export default () => {
    const sortings = document.querySelectorAll('.js-sorting');

    sortings.forEach((sorting) => {
        const inputs = sorting.querySelectorAll('input[type="radio"]');
        const current = sorting.querySelector('.sorting__current');
        const currentText = sorting.querySelector('.sorting__current-text');

        current.addEventListener('click', () => {
            current.classList.toggle('sorting__current--open');

            window.addEventListener('click', (e) => {
                if((e.target !== current) && (!e.target.closest('.sorting__item'))) {
                    current.classList.remove('sorting__current--open');
                }

                if(e.target.closest('.sorting__reset')) {
                    current.classList.remove('sorting__current--open');

                    e.target.closest('.sorting').querySelectorAll('input[type="checkbox"]').forEach((input) => {
                        input.checked = false;
                    })
                }
            })
        })

        inputs.forEach((input) => {
            input.addEventListener('input', (e) => {
                const text = e.target.nextElementSibling.textContent;
                currentText.textContent = text;
            })
        })
    })
}
