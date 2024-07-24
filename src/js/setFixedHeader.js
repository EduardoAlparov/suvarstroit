import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default () => {
    const header = document.querySelector('.page-header');

    if(!header) return;
    const vh = (coef) => window.innerHeight * (coef/100);

    if(header.classList.contains('page-header--main')) {
        const strHeader = ScrollTrigger.create({
            trigger : document.querySelector('.page-content'),
            start: vh(15) + ' top',
            onUpdate: (self) => {
                header.classList.add('page-header--fixed');
            },
            onLeaveBack: () => {
                header.classList.remove('page-header--fixed');
            },
            // markers: true,
        });
    } else {
        const strHeader = ScrollTrigger.create({
            trigger : document.querySelector('.page-content'),
            start: vh(20) + ' top',
            onUpdate: (self) => {
                if(self.direction < 0) {
                    header.classList.add('page-header--fixed');
                } else {
                    header.classList.remove('page-header--fixed');
                    header.classList.add('page-header--second-visible');
                }
            },
            onLeaveBack: () => {
                header.classList.remove('page-header--fixed');
                header.classList.remove('page-header--second-visible');
            },
            // markers: true,
        });
    }
}
