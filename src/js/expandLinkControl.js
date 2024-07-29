export default () => {
    const expLinks = document.querySelectorAll('.expand-link.js-expand-link');

    expLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            if(link.classList.contains('plans__expand')) {
                e.target.closest('.plans__info-wrapper').querySelector('.plans__table').classList.remove('plans__table--collapsed');
                e.target.closest('.plans__info-wrapper').querySelector('.plans__labels').classList.remove('plans__labels--collapsed');
            }
        })
    })
}
