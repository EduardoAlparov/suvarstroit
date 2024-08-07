export default () => {
    const header = document.querySelector('.page-header');

    if(!header) return;

    let setHeaderHeightVar = () => {
      document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
    }

    setHeaderHeightVar();

    window.addEventListener('resize', setHeaderHeightVar);
}
