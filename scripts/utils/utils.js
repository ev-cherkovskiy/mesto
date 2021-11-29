// Импорт необходимых констант
import { ESCAPE_CODE } from "./constants.js";

// Открытие попапа
export function openPopup(popup) {
    // Добавляем соответствующий класс
    popup.classList.add('popup_opened');
    // Добавляем попапу слушатель для закрытия нажатием на esc
    document.addEventListener('keydown', escapeListener);
}

// Закрытие попапа
export function closePopup(popup) {
    // Удаляем соответствующий класс
    popup.classList.remove('popup_opened');
    // Снимаем слушатель для закрытия нажатием на esc
    document.removeEventListener('keydown', escapeListener);
}

// Функция закрытия попапа при нажатии на esc
function escapeListener(evt) {
    // Находим открытый попап
    const popup = document.querySelector('.popup_opened');
    // Если нажата клавиша esc, то вызываем функцию закрытия попапа
    if (evt.keyCode === ESCAPE_CODE) closePopup(popup);
}