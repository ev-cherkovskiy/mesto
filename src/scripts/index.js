// *** ИМПОРТЫ ***

// Импорт главного css-файла
import '../pages/index.css';

// Импорт классов
import { Api } from './components/Api.js';
import { UserInfo } from './components/UserInfo.js';
import { Section } from './components/Section.js';
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithConfirmation } from './components/PopupWithConfirmation';

// Импорт констант
import {
    config,
    formValidationConfig,
    editButton,
    avatarButton,
    addButton,
    formProfileName,
    formProfileJob
} from './utils/constants.js';

// *** КОНСТАНТЫ ***

// Экземпляр API-класса
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-35',
    headers: {
        authorization: 'db30a410-2ab7-4138-8ef8-6a0a01ce5d6f',
        'Content-Type': 'application/json',
        // Дополнительный заголовок, без которого периодически возникают ошибки
        'Access-Control-Allow-Origin': '*',
    }
});

// Информация о пользователе
const userInfo = new UserInfo(config.userNameSelector, config.userInfoSelector);

// Попап редактирования профиля
const popupTypeEdit = new PopupWithForm(config.popupTypeEditSelector, (evt, info) => {
    // Отменяем стандартную отправку формы
    evt.preventDefault();
    // Готовим объект с информацией о пользователе
    const infoObject = {
        name: info[config.userNameInputName],
        about: info[config.userInfoInputName]
    };
    // Меняем надпись на кнопке
    popupTypeEdit.changeButtonCaption('Сохранение...');
    // Отправляем промис на изменение данных пользователя
    api.changeUserInfo(infoObject)
        .then(() => {
            // Если сервер принял данные, то заполняем информацию о профиле на странице
            userInfo.setUserInfo(infoObject);
            // Вывод в консоль (опционально)
            console.log('Данные пользователя изменены:', userInfo.getUserInfo());
            // Закрываем попап
            popupTypeEdit.close();
            // Меняем надпись на кнопке на исходную
            popupTypeEdit.changeButtonCaption('Сохранить');
        });
});

// Попап изменения аватара
const popupTypeAvatar = new PopupWithForm(config.popupTypeAvatarSelector, (evt, info) => {
    // Отменяем стандартную отправку формы
    evt.preventDefault();
    // Меняем надпись на кнопке
    popupTypeAvatar.changeButtonCaption('Сохранение...');
    // Готовим объект с информацией о пользователе
    const infoObject = {
        avatar: info[config.avatarInputName]
    };
    // Отправляем промис на изменение данных пользователя 
    api.changeAvatar(infoObject)
        .then(() => {
            // Если сервер принял данные, то заполняем информацию о профиле на странице
            userInfo.setUserInfo(infoObject);
            // Вывод в консоль (опционально)
            console.log('Данные пользователя изменены:', userInfo.getUserInfo());
            // Закрываем попап
            popupTypeAvatar.close();
            // Меняем надпись на кнопке на исходную
            popupTypeAvatar.changeButtonCaption('Сохранить');
        });
});

// Попап удаления карточки (ПОДУМАТЬ ЕЩЁ)
const popupTypeDelete = new PopupWithConfirmation('.popup_type_delete', () => {
    //
    const card = popupTypeDelete.getElement();
    const cardDOM = popupTypeDelete.getDOMElement();

    // Меняем надпись на кнопке
    popupTypeDelete.changeButtonCaption('Удаление...');
    // 
    api.deleteCard(card.getId())
        .then(() => {
            //
            cardDOM.remove();
            // Вывод в консоль (опционально)
            console.log('Карточка удалена.');
            //
            popupTypeDelete.close();
            // Меняем надпись на кнопке на исходную
            popupTypeDelete.changeButtonCaption('Да');
        })
});

// Попап показа места
const popupTypeShow = new PopupWithImage(config.popupTypeShowSelector);

// Экземпляры класса-валидатора для разных форм
const formProfileValidator = new FormValidator(formValidationConfig, config.formProfileSelector);
const formPlaceValidator = new FormValidator(formValidationConfig, config.formPlaceSelector);
const formAvatarValidator = new FormValidator(formValidationConfig, config.formAvatarSelector);

// *** ФУНКЦИИ ***

// Функция создания карточки (В РАБОТЕ: мб исправить удаление)
function createCard(cardData) {
    // Подготавливаем экземпляр класса карточки
    const card = new Card(cardData, config.cardTemplateId,
        // Коллбэк открытия попапа с картинкой
        () => popupTypeShow.open(cardData.name, cardData.link),
        // Коллбэк открытия попапа удаления
        (evt) => {
            popupTypeDelete.open(card, evt.target.closest('.photo-grid__item'));
            // Вывод в консоль (опционально)
            console.log('Карточка для удаления: ', card);
            console.log('Её DOM-элемент: ', evt.target.closest('.photo-grid__item'));
        },
        // Коллбэк нажатия на кнопку лайка
        (evt) => {
            // Если лайка нет, то надо отправить промис на его проставление
            if (!evt.target.classList.contains('photo-grid__like-button_active')) {
                api.likeCard(card.getId())
                    .then((cardDataUpdated) => {
                        // Обновляем кнопку лайка
                        card.renderLikeButton(cardDataUpdated);
                        // Вывод в консоль (опционально)
                        console.log('Поставлен лайк карточке:', card.getId());
                    });
            // Иначе отправляем промис для того, чтоб его убрать
            } else {
                api.unlikeCard(card.getId())
                    .then((cardDataUpdated) => {
                        // Обновляем кнопку лайка
                        card.renderLikeButton(cardDataUpdated);
                        // Вывод в консоль (опционально)
                        console.log('Убран лайк у карточки:', card.getId());
                    })
            }
        });
    // Возвращаем карточку
    return card;
}

// Функция создания элемента карточки. Эта функция рассчитывет две вспомогательные 
// логические переменные и вызывает создание DOM-узла карточки: в зависимости от этих переменных
// карточка может не иметь кнопки удаления или отображаться сразу с закрашенной кропкой лайка.
function createCardElement(card, userId) {
    // Записываем результат сравнения id создателя карточки и пользователя в логическую переменную
    const isCreatedByUser = compareId(card.getOwnerId(), userId);
    // Записываем в логическую переменную, лайкнута ли карточка пользователем
    const isLikedByUser = card.isLikedByUser(userId);
    // Вывод в консоль (опционально)
    if (isCreatedByUser) {
        console.log('Подготовлена карточка (создана пользователем):', card)
    } else {
        console.log('Подготовлена карточка:', card)
    };
    // Создаём DOM-элемент карточки
    const cardElement = card.generateCard(isCreatedByUser, isLikedByUser);
    // Возвращаем разметку
    return cardElement;
}

// Запись в форму для редактирования профиля данных из блока profile
function autoFillFormProfile() {
    const info = userInfo.getUserInfo();
    // Вводим в поле имени значение из профиля
    formProfileName.value = info.name;
    // Вводим в поле с описанием значение из профиля
    formProfileJob.value = info.job;
}

// Функция, которая сравнивает два id и возвращает true в случае, если они равны
function compareId(id1, id2) {
    return (id1 === id2);
}

// *** КОД ПРИ ЗАГРУЗКЕ ***

// Добавляем слушатели попапам
popupTypeEdit.setEventListeners();
popupTypeShow.setEventListeners();
popupTypeAvatar.setEventListeners();
popupTypeDelete.setEventListeners();

// Включаем валидацию форм
formProfileValidator.enableValidation();
formPlaceValidator.enableValidation();
formAvatarValidator.enableValidation();

// Открытие попапа при нажатии на кнопку редактирования профиля
editButton.addEventListener('click', () => {
    // Заполняем форму данными из профиля
    autoFillFormProfile();
    // Убираем все предупреждения об ошибках, поскольку при вызове форма заполняется из профиля 
    // (т.е. валидными значениями)
    formProfileValidator.hideAllInputErrors();
    // Открываем попап
    popupTypeEdit.open();
})

// Открытие попапа при нажатии на кнопку обновления аватара
avatarButton.addEventListener('click', () => {
    // Убираем все предупреждения об ошибках
    formAvatarValidator.hideAllInputErrors();
    // Открываем попап
    popupTypeAvatar.open();
})

// *** АСИНХРОННАЯ ЧАСТЬ ***

// Отправляем промис на получения информации о профиле
api.getUserInfo()
    // Заполняем информацию о пользователе
    .then(userData => {
        userInfo.setUserInfo(userData);
        // Вывод в консоль (опционально)
        console.log('Исходные данные о пользователе: ', userData);
        console.log('Заполнена информация о пользователе: ', userInfo.getUserInfo());
    })

    // Заполняем секцию с карточками
    .then(() => {
        // Отправляем промис на получение массива карточек с сервера
        api.getInitialCards()
            .then(initialCardsArray => {
                // Вывод в консоль (опционально)
                console.log('Начало заполнения секции исходными карточками...')
                // Создаём секцию с карточками
                const photoGrid = new Section({
                    items: initialCardsArray,
                    renderer: (cardData) => {
                        // Создаём карточку по данным
                        const card = createCard(cardData);
                        // Создаём DOM-элемент карточки
                        const cardElement = createCardElement(card, userInfo.getUserInfo().id);
                        // Добавляем карточку в секцию
                        photoGrid.addItem(cardElement);
                    }
                }, config.photoGridSelector);
                // Отрисовываем все элементы секции
                photoGrid.renderItems();
                // Вывод в консоль (опционально)
                console.log('Конец заполнения секции исходными карточками.')

                // Объявляем попап добавления карточки
                const popupTypeAdd = new PopupWithForm(config.popupTypeAddSelector, (evt, info) => {
                    // Отменяем стандартную отправку формы
                    evt.preventDefault();
                    // Готовим объект с информацией о карточке
                    const cardInfo = {
                        name: info[config.placeNameInputName],
                        link: info[config.placeLinkInputName],
                    };
                    // Меняем надпись на кнопке
                    popupTypeAdd.changeButtonCaption('Добавление...');

                    // Отправляем промис на добавление карточки
                    api.addCard(cardInfo)
                        .then(cardData => {
                            // Создаём карточку по данным
                            const card = createCard(cardData);
                            // Создаём DOM-элемент карточки
                            const cardElement = createCardElement(card, userInfo.getUserInfo().id);
                            // Добавляем карточку в секцию
                            photoGrid.addItem(cardElement);
                            // Закрываем попап
                            popupTypeAdd.close();
                            // Меняем надпись на кнопке на исходную
                            popupTypeAdd.changeButtonCaption('Создать');
                        });
                });

                // Добавляем слушатели попапу добавления карточки
                popupTypeAdd.setEventListeners();
                // Добавляем слушатель кнопке открытия попапа добавления карточки
                addButton.addEventListener('click', () => {
                    // Убираем все предупреждения об ошибках
                    formPlaceValidator.hideAllInputErrors();
                    // Открываем попап
                    popupTypeAdd.open();
                });
            });
    });