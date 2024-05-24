export default () => {
    const tourWindows = document.querySelectorAll(".js-tour-gallery");

    tourWindows.forEach((tourWindow) => {
        tourWindow.addEventListener('click', (e) => {
            if(e.target.closest('.js-tour-gallery-expand')) {
                tourWindow.classList.add('tour-gallery--fullscreen')
            }

            if(e.target.closest('.js-tour-gallery-close')) {
                tourWindow.classList.remove('tour-gallery--fullscreen')
            }
        })
    })
}
