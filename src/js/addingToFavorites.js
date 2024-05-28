export default () => {
    const header = document.querySelector('.page-header');
    const inputs = document.querySelectorAll('input[type="checkbox"].js-flying-heart');

    if(!header) return;

    inputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            if(e.target.checked === true) {
                const parent = e.target.closest('.favorite-checkbox--button');
                const heartIcon = parent.querySelector('.js-flying-heart-icon');
                const target = header.querySelector('.js-flying-target');

                const rectTarget = target.getBoundingClientRect();
                const heartIconTarget = heartIcon.getBoundingClientRect();
                const cloneIcon = heartIcon.cloneNode(true);
                cloneIcon.classList.add('flying-heart');
                cloneIcon.style.top = heartIconTarget.top;
                cloneIcon.style.left = heartIconTarget.left;
                document.body.append(cloneIcon);

                setTimeout(() => {
                    cloneIcon.style.transform = 'translateY(-6rem)';
                }, 100);

                setTimeout(() => {
                    cloneIcon.style.transform = 'translateY(0)';
                    cloneIcon.style.transitionDuration = "1s";
                }, 700);

                setTimeout(() => {
                    cloneIcon.style.top = rectTarget.top;
                    cloneIcon.style.left = rectTarget.left;
                }, 800);

                setTimeout(() => {
                    cloneIcon.remove();
                }, 2000);
            }
        })
    })
}
