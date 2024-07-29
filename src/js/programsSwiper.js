import Swiper from 'swiper/bundle';

export default () => {
    const programsLists = document.querySelectorAll('.js-programs-mobile-swiper');

    programsLists.forEach((programsList) => {
        if(window.matchMedia('(max-width: 768px)').matches) {
            new Swiper(programsList, {
                width: '304',
                spaceBetween: 16,
                wrapperClass: 'programs__list',
                slideClass: 'programs__item'
            })
        }
    })
}
