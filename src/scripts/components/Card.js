// Класс Card, экземпляры которого используются в качестве карточек с фотографиями
// Аргументы: название места, ссылка на картинку, селектор шаблона карточки, 
// колбэк открытия попапа нажатием на картинку
export class Card {
    constructor(name, link, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    // Функция, которая возвращает шаблон карточки
    _getTemplate() {
        return document.querySelector(this._templateSelector).content.cloneNode(true);
    }

    // Функция заполнения карточки информацией
    _fillInCard() {
        // Задаём картинке атрибуты src и alt
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        // Задаём название места
        this._captionElement.textContent = this._name;
    }

    // Обработчик клика на лайк
    _likeButtonHandler(evt) {
        evt.target.classList.toggle('photo-grid__like-button_active');
    }

    // Обработчик клика на кнопку удаления карточки
    _deleteButtonHandler() {
        const parentItem = this.closest('.photo-grid__item');
        parentItem.remove();
        this._cardItem = null;
    }

    // Функция, которая навешивает все обработчики события на карточку
    _setEventListeners() {
        this._likeButton.addEventListener('click', this._likeButtonHandler);
        this._deleteButton.addEventListener('click', this._deleteButtonHandler);
        this._imageElement.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    // Функция, которая собирает карточку со всеми функциями и возвращает её
    generateCard() {
        // Получаем элемент карточки по шаблону
        this._cardItem = this._getTemplate();
        // Определяем свойства карточки, которые используются при выполнении следующих функций
        this._imageElement = this._cardItem.querySelector('.photo-grid__img');
        this._captionElement = this._cardItem.querySelector('.photo-grid__caption-text');
        this._likeButton = this._cardItem.querySelector('.photo-grid__like-button');
        this._deleteButton = this._cardItem.querySelector('.photo-grid__delete-button');
        // Заполняем карточку информацией
        this._fillInCard();
        // Навешиваем все слушатели событий
        this._setEventListeners();
        // Возвращаем карточку
        return this._cardItem;
    }
}