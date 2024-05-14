export default () => {
    const hoveredLinks = document.querySelectorAll('.js-dropdown-menu-link');
    const body = document.body;
    const header = document.querySelector('.page-header');


    hoveredLinks.forEach((link) => {
        const dropdown = link.nextElementSibling;

        link.addEventListener('mouseenter', () => {
            body.classList.add('is-dark-block');

            link.addEventListener('mouseleave', (e) => {
                if(!e.relatedTarget.closest('.menu__item--dropdown')) {
                    body.classList.remove('is-dark-block');
                }
            })

            dropdown.addEventListener('mouseleave', (e) => {
                if(!e.relatedTarget.closest('.menu__item--dropdown')) {
                    body.classList.remove('is-dark-block');
                }
            })
        })
    })
}
