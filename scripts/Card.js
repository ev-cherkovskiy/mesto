// Импорт попапа для показа мест и функции его открытия
import { popupTypeShow as popup, openPopup } from "./index.js";

// Класс Card, экземпляры которого используются в качестве карточек с фотографиями
// Аргументы: название места, ссылка на картинку и селектор шаблона карточки
export class Card {
    constructor(name, link, templateSelector) {
        this.name = name;
        this.link = link;
        this.cardItem = document.querySelector(templateSelector).content.cloneNode(true);
    }

    // Функция заполнения карточки информацией
    _fillInCard() {
        // Задаём картинке атрибуты src и alt
        const cardImage = this.cardItem.querySelector('.photo-grid__img');
        cardImage.src = this.link;
        cardImage.alt = this.name;
        // Задаём название места
        this.cardItem.querySelector('.photo-grid__caption-text').textContent = this.name;
    }

    // Функция, которая подготавливает кнопку-лайк
    _activateLikeButton() {
        // Выносим кнопку-лайк в переменную
        const likeButton = this.cardItem.querySelector('.photo-grid__like-button');
        // Вешаем на кнопку-лайк слушатель событий,
        // который будет приписывать ей соответствующий класс при нажатии
        likeButton.addEventListener('click', (evt) => {
            evt.target.classList.toggle('photo-grid__like-button_active');
        });
    }

    // Функция, которая подготавливает кнопку удаления карточки
    _activateDeleteButton() {
        // Выносим кнопку для удаления карточки в переменную
        const deleteButton = this.cardItem.querySelector('.photo-grid__delete-button');
        // Вешаем на эту кнопку слушатель событий,
        // который будет удалять родительский узел (саму карточку)
        deleteButton.addEventListener('click', () => {
            const parentItem = deleteButton.closest('.photo-grid__item');
            parentItem.remove();
        });
    }

    // Функция, которая подготавливает открытие попапа при нажатии на картинку
    _makeImageInteractive() {
        // Делаем изображение на карточке интерактивным:
        // 1) Выносим картинку в переменную
        const imageElement = this.cardItem.querySelector('.photo-grid__img');
        // 2) Вешаем на неё слушатель событий, который при нажатии на неё...
        imageElement.addEventListener('click', () => {
            // 2.1) Задаёт путь до этой картинки и альт
            const popupImage = popup.querySelector('.popup__image');
            popupImage.src = this.link;
            popupImage.alt = this.name;
            // 2.2) Задаёт подпись для этой картинки
            popup.querySelector('.popup__description').textContent = this.name;
            // 2.3) Открывает попап показа картинки
            openPopup(popup);
        });
    }

    // Функция, которая собирает карточку со всеми функциями и возвращает её
    generateCard() {
        this._fillInCard();
        this._activateLikeButton();
        this._activateDeleteButton();
        this._makeImageInteractive();
        return this.cardItem;
    }

}