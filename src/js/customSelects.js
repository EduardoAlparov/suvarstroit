import Choices from 'choices.js';

export default function customSelects() {
    function initializeSelects() {
        const customSelects = Array.from(document.querySelectorAll('.js-custom-select'));
        customSelects.forEach(select => {
            const parentForm = select.closest('form');
            const instance = new Choices(select, {
                searchEnabled: false,
                itemSelectText: '',
                shouldSort: false
            });

            const defaultValue = instance.getValue(true);

            instance.passedElement.element.addEventListener(
                'choice',
                () => {
                    setTimeout(() => {
                        $(instance.passedElement.element)
                            .parsley()
                            .validate();
                    }, 100);
                },
                false
            );

            if (parentForm) {
                parentForm.addEventListener('reset', () => {
                    instance.setChoiceByValue(defaultValue);
                });
            }
        });
    }

    initializeSelects();

    window.initializeSelects = initializeSelects;
}
