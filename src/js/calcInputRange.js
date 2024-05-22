export default () => {
    const calc = document.querySelector('.js-form-calc');

    if(!calc) return;

    const inputs = document.querySelector('.form-calc__inputs').querySelectorAll('input[type=range]');
    const rangePercentege = document.querySelectorAll('.simple-range__input-percentege');
    const costInput = document.querySelector('.simple-range--cost').querySelector('input[type=range]');
    const prepaymentInput = document.querySelector('.simple-range--prepayment').querySelector('input[type=range]');
    const monthlyPayment = document.querySelector('.form-calc__final-sum');

    const termInput = document.querySelector('.simple-range--term').querySelector('input[type=range]');

    for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
      e.style.setProperty('--value', e.value);
      e.style.setProperty('--min', e.min == '' ? '0' : e.min);
      e.style.setProperty('--max', e.max == '' ? '100' : e.max);
      e.addEventListener('input', () => e.style.setProperty('--value', e.value));
    }

    termInput.addEventListener('input', (e) => {
        const yearText = termInput.closest('.simple-range').querySelector('.js-year-text');
        yearText.textContent = selectDesiredCase(e.target.value);
    })

    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            e.target.closest('.simple-range__wrapper').querySelector('output').value =
              e.target.value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
        });

        input.addEventListener('input', (e) => {
            const prepaymentInput2 = document.querySelector('.simple-range--prepayment').querySelector('input[type=range]');

            if(e.target.closest('.simple-range--cost')) {
                prepaymentInput2.setAttribute('max', e.target.value);
                prepaymentInput2.setAttribute('value', prepaymentInput2.value);
                prepaymentInput2.style.setProperty('--max', e.target.value);
                prepaymentInput2.style.setProperty('--value', prepaymentInput2.value);
            }

            prepaymentInput2.closest('.simple-range__wrapper').querySelector('output').value =
                prepaymentInput2.value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');

                let onePercent = (prepaymentInput2.max / 100).toFixed(2);
                prepaymentInput2.closest('.simple-range__wrapper').querySelector('.simple-range__percentege-value').textContent = '';
                prepaymentInput2.closest('.simple-range__wrapper').querySelector('.simple-range__percentege-value').textContent =
                    (prepaymentInput2.value / onePercent).toFixed(0);

            if(costInput.value < prepaymentInput2.value) {
                let monthlyPaymentValue = (costInput.value - prepaymentInput2.value) / (termInput.value * 12);

                monthlyPayment.textContent = '';
                monthlyPayment.textContent = monthlyPaymentValue.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            } else {
                let monthlyPaymentValue = (costInput.value - prepaymentInput2.value) / (termInput.value * 12);

                monthlyPayment.textContent = '';
                monthlyPayment.textContent = monthlyPaymentValue.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }
        })

        rangePercentege.forEach(el => {
            let inputRange = el.closest('.simple-range__wrapper').querySelector('input[type=range]');

            inputRange.addEventListener('input', (e) => {
              let onePercent = (e.target.max / 100).toFixed(2);
              el.closest('.simple-range__wrapper').querySelector('.simple-range__percentege-value').textContent = '';
              el.closest('.simple-range__wrapper').querySelector('.simple-range__percentege-value').textContent = (e.target.value / onePercent).toFixed(0);
            })
        })
    })

    function selectDesiredCase(count) {
        const lastNumber = Number(count.split('').pop());

        if(lastNumber === 1) {
            return 'год';
        } else if(count >= 11 && count <= 14) {
            return 'лет';
        } else if(lastNumber > 1 && lastNumber <= 4) {
            return 'года';
        } else {
            return 'лет';
        }
    }
}
