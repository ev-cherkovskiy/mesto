// Функция, определяющая, есть ли в форме хотя бы один невалидный инпут
// Аргумент: список инпутов формы
const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
};

// Функция, которая делает кнопку неактивной
// Аргументы: кнопка формы, объект настроек
const makeButtonInactive = (buttonElement, config) => {
    // Добавляем кнопке класс с неактивным стилем
    buttonElement.classList.add(config.inactiveButtonClass);
    // Добавляем кнопке свойство disabled
    buttonElement.disabled = true;
};

// Функция, которая делает кнопку активной
// Аргументы: кнопка формы, объект настроек
const makeButtonActive = (buttonElement, config) => {
    // Удаляем у кнопки неактивный стиль
    buttonElement.classList.remove(config.inactiveButtonClass);
    // Удаляем у неё свойство disabled
    buttonElement.disabled = false;
}

// Функция, меняющая состояние кнопки отправки формы
// Аргументы: список полей формы, кнопка отправки формы, объект настроек
const toggleButtonState = (inputList, buttonElement, config) => {
    // Проверяем, есть ли в форме невалидные поля. Если есть, то сделать кнопку неактивной
    if (hasInvalidInput(inputList)) {
        makeButtonInactive(buttonElement, config);
    // Иначе сделать её активной
    } else {
        makeButtonActive(buttonElement, config);
    };
  }; 

// Функция показа сообщения с ошибкой
// Аргументы: форма, её поле, соответствующее сообщение с ошибкой, объект настроек
const showInputError = (formElement, inputElement, errorMessage, config) => {
    // Находим поле ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Добавляем проблемному инпуту класс с красной границей
    inputElement.classList.add(config.inputErrorClass);
    // Записываем в поле ошибки сообщение с пояснением ошибки
    errorElement.textContent = errorMessage;
    // Добавляем полю ошибки класс, отменяющий display: none;
    errorElement.classList.add(config.errorClass);
};

// Функция скрытия сообщения с ошибкой
// Аргументы: форма, её поле, объект настроек
const hideInputError = (formElement, inputElement, config) => {
    // Находим поле ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Удаляем у инпута класс с красной границей
    inputElement.classList.remove(config.inputErrorClass);
    // Удаляем у поля ошибки класс, отменяющий display: none;
    errorElement.classList.remove(config.errorClass);
    // Очищаем текстовое содержимое поля ошибки
    errorElement.textContent = '';
};

// Функция проверки инпута формы
// Аргументы: форма, её поле, объект настроек
const isValid = (formElement, inputElement, config) => {
    // Если инпут не проходит валидацию, то показываем сообщение с ошибкой
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    // Иначе убираем сообщение с ошибкой
    } else {
        hideInputError(formElement, inputElement, config); 
    };
};

// Функция, которая навешивает слушатели событий на все поля формы
// Аргументы: форма, объект настроек
const setEventListenersForForm = (formElement, config) => {
    // Собираем массив инпутов
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    // Находим кнопку отправки формы
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    // Вызываем функцию изменения состояния кнопки, чтобы кнопка становилась неактивной до начала ввода данных.
    // Это делаем для всех форм (их пока всего две, но всё же), кроме формы редактирования информации о профиле,
    // поскольу эта форма изначально заполнена всегда вследствие автозаполнения
    if (!formElement.classList.contains(config.initiallyValidFormClass)) toggleButtonState(inputList, buttonElement, config);
    //toggleButtonState(inputList, buttonElement, config);
    // Проходим по каждому элементу этого массива, навешивая каждому слушатель:
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            // 1) функция проверки
            isValid(formElement, inputElement, config);
            // 2) функция изменения состояния кнопки
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

// Функция, которая включает валидацию всех форм
// Аргумент: объект настроек
const enableValidation = (config) => {
    // Собираем массив форм
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    // Проходим по каждому элементу этого массива, выполняя следующие действия для каждого:
    formList.forEach(formElement => {
        // 1) навешиваем на форму слушатель на сабмит, который...
        formElement.addEventListener('submit', evt => {
            // 1.1) отменяет стандартную отправку формы
            evt.preventDefault();
            // 1.2) если известно, что форма после отправки всегда невалидна, 
            // то делает кнопку неактивной при следующем вызове
            if (formElement.classList.contains(config.initiallyInvalidFormClass)) {
                buttonElement = formElement.querySelector(config.submitButtonSelector);
                makeButtonInactive(buttonElement, config);
            };
        });
        // 2) вешаем слушатели на каждый инпут формы
        setEventListenersForForm(formElement, config);
    });
};

// Включаем валидацию с заданным объектом настроек
enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active',
    // Здесь добавил две строчки:
    // Класс формы, которая всегда при вызове валидная (профиль, т.к. значения берутся из секции,
    // куда попадают только валидные значения)
    initiallyValidFormClass: 'form_type_profile',
    // Класс формы, которая всегда при вызове невалидна (добавления места -- пустые значения)
    initiallyInvalidFormClass: 'form_type_place'
    // Это сделал, чтоб переписать код без использования конкретных классов в строке 87,
    // а также чтобы повесить изначально невалидной форме слушатель на деактивацию кнопки
    // при отправке формы (строки 113-116)
}); 