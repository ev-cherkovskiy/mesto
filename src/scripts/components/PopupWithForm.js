// Импорт родительского класса
import { Popup } from "./Popup.js";

// Класс PopupWithForm (дочерний для Popup), экземпляры которого используется для показа форм
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        // Дополняем конструктор: добавляем поля с обработчиком сабмита формы, 
        // самой формой и списком инпутов
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.form__input');

        this._submitButton = this._popup.querySelector('.form__submit-button');
    }

    // Добавляем новый приватный метод, который позволяет получить объект со значениями полей формы
    _getInputValues() {
        // Создаём пустой объект
        const formValues = {};
        // Для каждого инпута из списка полей формы добавляем соответствующую строку в объекте
        this._inputList.forEach(input => {
           formValues[input.name] = input.value;
        });
        // Возвращаем объект с данными
        return formValues;
    }

    // Дополняем метод, добавляющий слушатели событий
    setEventListeners() {
        // Вызываем родительский метод
        super.setEventListeners();
        // Добавляем обработчик сабмита формы
        this._form.addEventListener('submit', (evt) => {
            this._handleFormSubmit(evt, this._getInputValues());
        });
    }

    // Дополняем метод, закрывающий попап
    close() {
        // Вызываем родительский метод
        super.close();
        // Сбрасываем значения полей формы
        this._form.reset();
    }

    // Новый публичный метод, который позволяет менять надпись на кнопке
    // Аргумент -- новая надпись
    changeButtonCaption(caption) {
        this._submitButton.textContent = caption;
    }
}