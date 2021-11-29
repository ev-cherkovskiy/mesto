// Класс FormValidator, экземпляры которого используются для валидации той или иной формы
// Аргументы: объект настроек (селекторы и классы элементов формы), селектор валидируемой формы
export class FormValidator {
    constructor(config, formSelector) {
        this._formElement = document.querySelector(formSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
        this._buttonElement = this._formElement.querySelector(config.submitButtonSelector);
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
    }

    // Функция, определяющая, есть ли в форме хотя бы один невалидный инпут
    // Аргумент: список инпутов формы
    _hasInvalidInput() {
        return this._inputList.some(inputElement => {
            return !inputElement.validity.valid;
        });
    };

    // Функция, которая делает кнопку неактивной
    // Аргумент: кнопка формы
    _makeButtonInactive () {
        // Добавляем кнопке класс с неактивным стилем
        this._buttonElement.classList.add(this._inactiveButtonClass);
        // Добавляем кнопке свойство disabled
        this._buttonElement.disabled = true;
    };

    // Функция, которая делает кнопку активной
    // Аргумент: кнопка формы
    _makeButtonActive() {
        // Удаляем у кнопки неактивный стиль
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        // Удаляем у неё свойство disabled
        this._buttonElement.disabled = false;
    }

    // Функция, меняющая состояние кнопки отправки формы
    // Аргументы: список полей формы, кнопка отправки формы
    _toggleButtonState() {
        // Проверяем, есть ли в форме невалидные поля. Если есть, то сделать кнопку неактивной
        if (this._hasInvalidInput(this._inputList)) {
            this._makeButtonInactive(this._buttonElement);
            // Иначе сделать её активной
        } else {
            this._makeButtonActive(this._buttonElement);
        };
    };

    // Функция показа сообщения с ошибкой
    // Аргументы: форма, её поле, соответствующее сообщение с ошибкой
    _showInputError(inputElement, errorMessage) {
        // Находим поле ошибки
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        // Добавляем проблемному инпуту класс с красной границей
        inputElement.classList.add(this._inputErrorClass);
        // Записываем в поле ошибки сообщение с пояснением ошибки
        errorElement.textContent = errorMessage;
        // Добавляем полю ошибки класс, отменяющий display: none;
        errorElement.classList.add(this._errorClass);
    };

    // Функция скрытия сообщения с ошибкой
    // Аргументы: форма, её поле
    _hideInputError(inputElement) {
        // Находим поле ошибки
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        // Удаляем у инпута класс с красной границей
        inputElement.classList.remove(this._inputErrorClass);
        // Удаляем у поля ошибки класс, отменяющий display: none;
        errorElement.classList.remove(this._errorClass);
        // Очищаем текстовое содержимое поля ошибки
        errorElement.textContent = '';
    };

    // Функция проверки инпута формы
    // Аргументы: форма, её поле
    _isValid(inputElement) {
        // Если инпут не проходит валидацию, то показываем сообщение с ошибкой
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
            // Иначе убираем сообщение с ошибкой
        } else {
            this._hideInputError(inputElement);
        };
    };

    // Функция, которая навешивает слушатели событий на все поля формы
    // Аргумент: форма
    _setEventListenersForForm() {
        // Проходим по каждому элементу массива инпутов, навешивая каждому слушатель:
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                // 1) функция проверки
                this._isValid(inputElement);
                // 2) функция изменения состояния кнопки
                this._toggleButtonState();
            });
        });
    };

    // Функция, которая удаляет все предупреждения об ошибках
    // Это публичный метод, который вызывается при закрытии попапа редактирования профиля.
    hideAllInputErrors() {
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
        });
        // Ошибок больше нет, поэтому кнопку делаем активной
        this._makeButtonActive();
    };

    // Функция, которая включает валидацию формы
    enableValidation() {
        // По умолчанию при вызове формы она невалидна (не заполнена), поэтому делаем кнопку неактивной, 
        // при этом сообщения об ошибках выводить не следует, т.к. пользователь ещё не начал заполнять поля
        this._makeButtonInactive();
        // Навешиваем слушатель, который...
        this._formElement.addEventListener('submit', evt => {
            // 1) отменяет стандартную отправку формы;
            evt.preventDefault();
            // 2) меняет состояние кнопки при отправке формы на неактивное (по умолчанию)
            this._makeButtonInactive();
        });
        // Навешиваем слушатели на поля формы
        this._setEventListenersForForm();
    }
}
