export default () => {
    const breadcrumbs = document.querySelector('.breadcrumbs');

    if(!breadcrumbs) return;

    let setBreadcrumbsHeightVar = () => {
        document.documentElement.style.setProperty('--breadcrumbs-height', breadcrumbs.clientHeight + 'px');
    }

    setBreadcrumbsHeightVar();

    window.addEventListener('resize', setBreadcrumbsHeightVar);
}
