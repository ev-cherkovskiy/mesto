// Импорт родительского класса
import { Popup } from "./Popup.js";

// Класс PopupWithConfirmation (дочерний для Popup), экземпляры которого 
// используется для показа подтверждений
export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirmation) {
        super(popupSelector);
        // Дополняем конструктор: добавляем колбэк, который надо выполнить при подтверждении
        this._handleConfirmation = handleConfirmation;
        // Кнопка подтверждения
        this._confirmButton = this._popup.querySelector('.form__submit-button');
    }

    // Дополняем метод открытия попапа
    open(element, DOMElement) {
        super.open();
        // Связываем с попапом элемент, над которым проводится подтверждаемое действие
        this._element = element;
        this._DOMElement = DOMElement;
    }
    
    // Дополняем метод добавления слушателей
    setEventListeners() {
        super.setEventListeners();
        this._confirmButton.addEventListener('click', this._handleConfirmation);
    }

    // Публичный метод, который позволяет менять надпись на кнопке
    // Аргумент -- новая надпись
    changeButtonCaption(caption) {
        this._confirmButton.textContent = caption;
    }

    // Публичный метод -- достаём элемент
    getElement() {
        return this._element;
    }

    // Публичный метод -- достаём разметку элемента
    getDOMElement() {
        return this._DOMElement;
    }
}