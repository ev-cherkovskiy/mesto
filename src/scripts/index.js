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
        })
        // Обработка ошибки
        .catch(err => {
            // Вывод в консоль
            console.log(err);
        })
        // Меняем надпись на кнопке на исходную
        .finally(() => {
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
        })
        // Обработка ошибки
        .catch(err => {
            // Вывод в консоль
            console.log(err);
        })
        // Меняем надпись на кнопке на исходную
        .finally(() => {
            popupTypeAvatar.changeButtonCaption('Сохранить');
        });
});

// Попап удаления карточки
const popupTypeDelete = new PopupWithConfirmation('.popup_type_delete', () => {
    // Выносим карточку и её разметку в отдельные переменные
    const card = popupTypeDelete.getElement();
    const cardDOM = popupTypeDelete.getDOMElement();
    // Меняем надпись на кнопке
    popupTypeDelete.changeButtonCaption('Удаление...');
    // Отправляем промис на удаление карточки
    api.deleteCard(card.getId())
        .then(() => {
            // Если карточка удалена на сервере, то удаляем её из разметки
            cardDOM.remove();
            // Вывод в консоль (опционально)
            console.log('Карточка удалена.');
            // Закрываем попап
            popupTypeDelete.close();
        })
        // Обработка ошибки
        .catch(err => {
            // Вывод в консоль
            console.log(err);
        })
        // Меняем надпись на кнопке на исходную
        .finally(() => {
            popupTypeDelete.changeButtonCaption('Да');
        });
});

// Попап показа места
const popupTypeShow = new PopupWithImage(config.popupTypeShowSelector);

// Экземпляры класса-валидатора для разных форм
const formProfileValidator = new FormValidator(formValidationConfig, config.formProfileSelector);
const formPlaceValidator = new FormValidator(formValidationConfig, config.formPlaceSelector);
const formAvatarValidator = new FormValidator(formValidationConfig, config.formAvatarSelector);

// *** ФУНКЦИИ ***

// Функция создания карточки
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
                    })
                    // Обработка ошибки
                    .catch(err => {
                        // Вывод в консоль
                        console.log(err);
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
                    // Обработка ошибки
                    .catch(err => {
                        // Вывод в консоль
                        console.log(err);
                    });
            }
        });
    // Возвращаем карточку
    return card;
}

// Запись в форму для редактирования профиля данных из блока profile
function autoFillFormProfile() {
    const info = userInfo.getUserInfo();
    // Вводим в поле имени значение из профиля
    formProfileName.value = info.name;
    // Вводим в поле с описанием значение из профиля
    formProfileJob.value = info.job;
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

// Отправляем промисы на получение данных о пользователе и массива карточек,
// и выполняем код только при получении ответов на оба промиса
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCardsArray]) => {
        // Заполняем информацию о пользователе
        userInfo.setUserInfo(userData);
        // Вывод в консоль (опционально)
        console.log('Исходные данные о пользователе: ', userData);
        console.log('Заполнена информация о пользователе: ', userInfo.getUserInfo());

        console.log('Начало заполнения секции исходными карточками...')
        // Создаём секцию с карточками
        const photoGrid = new Section({
            items: initialCardsArray,
            renderer: (cardData) => {
                // Создаём карточку по данным
                const card = createCard(cardData);
                // Создаём DOM-элемент карточки
                const cardElement = card.createCardElement(userInfo.getUserInfo().id);
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
                    const cardElement = card.createCardElement(userInfo.getUserInfo().id);
                    // Добавляем карточку в секцию
                    photoGrid.addItem(cardElement);
                    // Закрываем попап
                    popupTypeAdd.close();

                })
                // Обработка ошибки
                .catch(err => {
                    // Вывод в консоль
                    console.log(err);
                })
                // Меняем надпись на кнопке на исходную
                .finally(() => {
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
    })

    // Обработка ошибки
    .catch(err => {
        // Вывод в консоль
        console.log(err);
    });