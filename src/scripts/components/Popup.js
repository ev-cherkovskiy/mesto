// Импорт кода клавиши esc
import { ESCAPE_CODE } from "../utils/constants.js";

// Класс Popup -- родительский для классов попапов
// Аргумент: селектор попапа
export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        // Привязываем контекст к методу _handleEscClose()
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    // Публичный метод -- открытие попапа
    open() {
        // Добавляем соответствующий класс
        this._popup.classList.add('popup_opened');
        // Добавляем слушатель для закрытия нажатием на esc
        document.addEventListener('keydown', this._handleEscClose);
    }

    // Публичный метод -- закрытие попапа
    close() {
        // Удаляем соответствующий класс
        this._popup.classList.remove('popup_opened');
        // Снимаем слушатель для закрытия нажатием на esc
        document.removeEventListener('keydown', this._handleEscClose);
    }

    // Приватный метод, который используется для закрытия попапа нажатием на esc
    _handleEscClose(evt) {
        // Если нажата клавиша esc, то вызываем функцию закрытия попапа
        if (evt.keyCode === ESCAPE_CODE) this.close();
    }

    // Публичный метод -- добавление слушателей событий
    setEventListeners() {
        // Находим кнопку закрытия попапа
        const closeButton = this._popup.querySelector('.popup__close-button');
        // Добавляем слушатель на обычное закрытие попапа. Используем делегирование события. 
        // Если таргет -- кнопка закрытия или оверлей, то закрываем попап
        this._popup.addEventListener('click', evt => {
            if (evt.target === this._popup || evt.target === closeButton) this.close();
        });
    }
}