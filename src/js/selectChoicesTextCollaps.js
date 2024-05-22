export default () => {
    const choicesItems = document.querySelectorAll('.choices__item');

    choicesItems.forEach((choicesItem) => {
        let text = choicesItem.textContent;

        if (!choicesItem.closest('.select').classList.contains('select--blue') && (text.length > 17)) {

            choicesItem.textContent = text.slice(0, 20) + '...';

        }
    })
}
