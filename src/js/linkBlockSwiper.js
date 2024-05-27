import Swiper from 'swiper/bundle';

export default () => {
    const linkBlocks = document.querySelectorAll('.js-link-block-swiper');

    linkBlocks.forEach((linkBlock) => {
        const linkBlocksSwiper = new Swiper('.link-block__swiper.swiper', {
            slidesPerView: 1,
            speed: 600,

            pagination: {
                el: ".swiper-pagination",
                type: "bullets",
            },
        })
    })
}
