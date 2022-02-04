// Класс Card, экземпляры которого используются в качестве карточек с фотографиями
// Аргументы: название места, ссылка на картинку, селектор шаблона карточки, 
// колбэк открытия попапа нажатием на картинку, колбэк нажатия на кнопку удаления,
// колбэк нажатия на кнопку лайка
export class Card {
    constructor(data, templateSelector, handleCardClick, handleDeleteButtonClick, handleLikeButtonClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        this._handleLikeButtonClick = handleLikeButtonClick;
        this._id = data._id;
        this._ownerId = data.owner._id;
    }

    // Приватный метод, который возвращает шаблон карточки
    _getTemplate() {
        return document.querySelector(this._templateSelector).content.cloneNode(true);
    }

    // Приватный метод, который реализует заполнение карточки информацией
    _fillInCard() {
        // Задаём картинке атрибуты src и alt
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        // Задаём название места
        this._captionElement.textContent = this._name;
        // Задаём количество лайков
        this._likesCounter.textContent = this._likes.length;
    }

    // Приватный метод, который навешивает все обработчики события на карточку
    _setEventListeners() {
        this._likeButton.addEventListener('click', this._handleLikeButtonClick);
        this._deleteButton.addEventListener('click', this._handleDeleteButtonClick);
        this._imageElement.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    // Приватный метод, который возвращает true, если карточка лайкнута пользователем с данным id
    _isLikedByUser(userId) {
        for (let key in this._likes) {
            if (this._likes[key]._id === userId) {
                return true;
            }
        }
        return false;
    }

    // Приватный метод, который возвращает true, если карточка создана пользователем с данным id
    _isCreatedByUser(userId) {
        return (this._ownerId === userId);
    }

    // Приватный метод, который собирает карточку со всеми функциями и возвращает её
    // Аргументы: логические переменные, которые указывают на те или иные особенности разметки
    // карточки (отсутствие кнопки удаления, закрашенная кнопка лайка)
    _generateCard(isCreatedByUser, isLikedByUser) {
        // Получаем элемент карточки по шаблону
        this._cardItem = this._getTemplate();
        // Определяем свойства карточки, которые используются при выполнении следующих функций
        this._imageElement = this._cardItem.querySelector('.photo-grid__img');
        this._captionElement = this._cardItem.querySelector('.photo-grid__caption-text');
        this._likeButton = this._cardItem.querySelector('.photo-grid__like-button');
        this._deleteButton = this._cardItem.querySelector('.photo-grid__delete-button');
        this._likesCounter = this._cardItem.querySelector('.photo-grid__likes-counter');
        // Заполняем карточку информацией
        this._fillInCard();
        // Навешиваем все слушатели событий
        this._setEventListeners();
        // Если карточка не создана пользователем, но убираем кнопку удаления
        if (!isCreatedByUser) {
            this._deleteButton.removeEventListener('click', this._handleDeleteButtonClick);
            this._deleteButton.remove();
        }
        // Если карточка лайкнута пользователем, то меняем состояние кнопки лайка
        if (isLikedByUser) {
            this._likeButton.classList.toggle('photo-grid__like-button_active');
        }
        // Возвращаем карточку
        return this._cardItem;
    }

    // Публичный метод -- создание элемента карточки. Этот метод рассчитывет две вспомогательные 
    // логические переменные и вызывает создание DOM-узла карточки: в зависимости от этих переменных
    // карточка может не иметь кнопки удаления или отображаться сразу с закрашенной кропкой лайка.
    createCardElement(userId) {
        // Записываем в логическую переменную, создана ли карточка пользователем
        const isCreatedByUser = this._isCreatedByUser(userId);
        // Записываем в логическую переменную, лайкнута ли карточка пользователем
        const isLikedByUser = this._isLikedByUser(userId);
        // Вывод в консоль (опционально)
        if (isCreatedByUser) {
            console.log('Подготовлена карточка (создана пользователем):', this)
        } else {
            console.log('Подготовлена карточка:', this)
        };
        // Создаём DOM-элемент карточки
        const cardElement = this._generateCard(isCreatedByUser, isLikedByUser);
        // Возвращаем разметку
        return cardElement;
    }

    // Публичный метод, который меняет состояние кнопки лайка и обновляет счётчик
    renderLikeButton(dataUpdated) {
        // Cохраняем в переменную обновлённое количество лайков
        const numberOfLikes = dataUpdated.likes.length;
        // Обновляем количество лайков в подписе под кнопкой
        this._likesCounter.textContent = numberOfLikes;
        // Меняем состояние кнопки
        this._likeButton.classList.toggle('photo-grid__like-button_active');
   }

    // Публичный метод, который возвращает id карточки
    getId() {
        return this._id;
    }
}
