import { closestEdge } from "./utils";

export default () => {
    const bodies = document.querySelectorAll('.js-home-slider-body');
    const leftSide = document.querySelector('.js-left-side');
    const rightSide = document.querySelector('.js-right-side');


    bodies.forEach((b) => {
        const cursor = b.querySelector('.cursor');

        b.addEventListener('mousemove', function(e) {
            const pos = getMousePos(b, e);
            let dir = closestEdge(e, b);

            cursor.classList.remove('home-slider__swiper-btn--pos');

            cursor.style.left = (pos.x) + 'px';
            cursor.style.top = (pos.y) + 'px';

            if(dir === 'left') {
                cursor.classList.add('cursor--turn');
            } else {
                cursor.classList.remove('cursor--turn');
            }
        });


        b.addEventListener('mouseleave', function(e) {
            cursor.classList.add('home-slider__swiper-btn--pos');
            cursor.classList.remove('cursor--turn');

            cursor.style.left = 'auto';
            cursor.style.top = 'auto';
        });

    })

    function getMousePos( div, evt ) {
        var rect = div.getBoundingClientRect();

        return {
            x: Math.round( ( evt.clientX - rect.left ) / ( rect.right - rect.left ) * rect.width ),
            y: Math.round( ( evt.clientY - rect.top ) / ( rect.bottom - rect.top ) * rect.height )
        };
    }

}
