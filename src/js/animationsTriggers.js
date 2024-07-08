import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default () => {
    const triggers = document.querySelectorAll('.js-animation-trigger');
    const pins = document.querySelectorAll('.js-pin-trigger');
    const isMobile = window.matchMedia('(max-width: 992px)').matches;
    let startPercent;

    isMobile ? (startPercent = 20) : (startPercent = 0);

    triggers.forEach((trigger) => {
        ScrollTrigger.create({
            trigger: trigger,
            start: `top center-=${startPercent}%`,
            once: true,
            markers: false,
            onToggle: () => {
                trigger.classList.remove('js-animation-trigger');
            },
        });
    })

    pins.forEach((pin, index) => {
        if( index === 0 ) {
            const prevSibling = pin.previousElementSibling;
            if(!prevSibling) return;

            ScrollTrigger.create({
                trigger: prevSibling,
                start: 'bottom bottom-=100px',
                markers: false,
                pin: true
            });
        }

        ScrollTrigger.create({
            trigger: pin,
            start: `top top`,
            markers: false,
            pin: true,
            anticipatePin: 0.5,
        });
    })
}
