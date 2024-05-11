import 'parsleyjs';

window.Parsley.addValidator('requiredIfChecked', {
    requirementType: 'string',
    validateString: function (value, requirement) {
        const checkbox = document.querySelector(requirement);

        if (!checkbox) {
            return false;
        }

        if (checkbox.checked && !value.trim()) {
            return false;
        }

        return true;
    },
    messages: {
        en: 'Error',
        ru: 'Ошибка',
    },
    priority: 33,
});

window.Parsley.addValidator('phone', {
    requirementType: 'string',
    validateString: function (value) {
        if (value.trim() === '') return true;
        return /^(\+7|7|8)?[\s\-]?\(?[123456789][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(value);
    },
    messages: {
        en: 'Error',
        ru: 'Ошибка',
    },
});

window.Parsley.addValidator('email', {
    requirementType: 'string',
    validateString: function (value) {
      if (value.trim() === '') return true;
      return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    },
    messages: {
      en: 'Error',
      ru: 'Ошибка',
    },
});

window.Parsley.addValidator('reqtext', {
    requirementType: 'string',
    validateString: function (value) {
      if (value.trim() === '') return true;
      return /^[А-Яа-яЁёA-Za-z]+$/.test(value);
    },
    messages: {
      en: 'Error',
      ru: 'Ошибка',
    },
});


Parsley.addMessages('ru', {
    defaultMessage: 'Некорректное значение.',
    type: {
        email: 'В данном поле может быть только E-mail',
        url: 'Адрес сайта введен неверно.',
        number: 'Введите число.',
        integer: 'Введите целое число.',
        digits: 'Введите только цифры.',
        alphanum: 'Введите буквенно-цифровое значение.',
    },
    notblank: 'Это поле должно быть заполнено.',
    required: 'Обязательное поле',
    pattern: 'Это значение некорректно.',
    min: 'Это значение должно быть не менее чем %s.',
    max: 'Это значение должно быть не более чем %s.',
    range: 'Это значение должно быть от %s до %s.',
    minlength: 'Это значение должно содержать не менее %s символов.',
    maxlength: 'Это значение должно содержать не более %s символов.',
    length: 'Это значение должно содержать от %s до %s символов.',
    mincheck: 'Выберите не менее %s значений.',
    maxcheck: 'Выберите не более %s значений.',
    check: 'Выберите от %s до %s значений.',
    equalto: 'Это значение должно совпадать.',
});

Parsley.setLocale('ru');

export default function validation() {
    const formsToValidate = Array.from(document.querySelectorAll('form[data-need-validation]'));

    formsToValidate.forEach((form) => {
        $(form).parsley();
    });
}
