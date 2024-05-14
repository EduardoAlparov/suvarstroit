import noUiSlider from 'noUiSlider';
import { debounce } from 'lodash';

export default function rangeSlidersDouble() {
    const elements = Array.from(document.querySelectorAll('.js-range-slider-double'));

    elements.forEach(element => {
        const inputs = Array.from(element.querySelectorAll('input'));
        const rangeSliderElement = element.querySelector('.range-slider__element');
        const minValue = element.hasAttribute('data-min') ? Number(element.getAttribute('data-min')) : 10;
        const maxValue = element.hasAttribute('data-max') ? Number(element.getAttribute('data-max')) : 15;
        const stepValue = element.hasAttribute('data-step') ? Number(element.getAttribute('data-step')) : 1;
        const form = element.closest('form');
        const startValue = inputs[0].value.replace(/\s/g, '').trim() ? parseFloat(inputs[0].value.replace(/\s/g, '').trim()) : '';
        const endValue = inputs[1].value.replace(/\s/g, '').trim() ? parseFloat(inputs[1].value.replace(/\s/g, '').trim()) : '';

        noUiSlider.create(rangeSliderElement, {
            start: [startValue ? startValue : minValue, endValue ? endValue : maxValue],
            connect: true,
            orientation: 'horizontal',
            step: stepValue,
            range: {
                min: minValue,
                max: maxValue
            },
            format: {
                to: v => Number(parseFloat(v).toFixed(0)).toLocaleString(),
                from: v => parseFloat(v).toFixed(0)
            }
        });

        // rangeSliderElement.noUiSlider.on('update', () => {
        //     input.value = rangeSliderElement.noUiSlider.get();
        // });

        rangeSliderElement.noUiSlider.on('update', () => {
            const newValue = rangeSliderElement.noUiSlider.get();
            inputs[0].value = newValue[0];
            inputs[1].value = newValue[1];
        });


        inputs[0].addEventListener('change', (event) => {
            rangeSliderElement.noUiSlider.set(event.target.value.replace(/[^\d]+/g, ''));
        })
        inputs[1].addEventListener('change', (event) => {
            rangeSliderElement.noUiSlider.set([null, event.target.value.replace(/[^\d]+/g, '')]);
        })

        if (form) {
            form.addEventListener('reset', () => {
                console.log('Parent form has been reset')

                rangeSliderElement.noUiSlider.reset();
                setTimeout(() => {
                    const newValue = rangeSliderElement.noUiSlider.get();
                    inputs[0].value = newValue[0];
                    inputs[1].value = newValue[1];
                }, 10)

                // rangeSliderElement.noUiSlider.set([minValue, maxValue]);
            })
        }
    });
}
