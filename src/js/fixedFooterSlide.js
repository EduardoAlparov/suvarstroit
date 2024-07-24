import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default () => {
    const trs = document.querySelectorAll('.js-filters-trigger');
    const tgts = document.querySelectorAll('.js-filters-target');

    trs.forEach((t) => {

        const strFooter = ScrollTrigger.create({
            start: 0,
            onUpdate: (self) => {
                if(ScrollTrigger.isInViewport(t)) {
                    tgts.forEach((tgt) => {
                        tgt.classList.remove('_visible')
                    })
                } else {
                    tgts.forEach((tgt) => {
                        tgt.classList.add('_visible')
                    })
                }
            }
        });

    })
}
