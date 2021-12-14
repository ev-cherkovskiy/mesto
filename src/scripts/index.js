// Импорт главного css-файла
import '../pages/index.css';

// Импорт классов
import { UserInfo } from './components/UserInfo.js';
import { Section } from './components/Section.js';
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';

// Импорт констант
import { initialCards } from './utils/cards.js';
import {
    config,
    formValidationConfig,
    editButton,
    addButton,
    formProfileName,
    formProfileJob
} from './utils/constants.js';

// *** КОНСТАНТЫ ***

// Информация о пользователе
const userInfo = new UserInfo(config.userNameSelector, config.userInfoSelector);

// Секция с карточками
const photoGrid = new Section({
    items: initialCards,
    renderer: (item) => {
        // Создаём карточку
        createCard(item.name, item.link);
    }
}, config.photoGridSelector);

// Попап редактирования профиля
const popupTypeEdit = new PopupWithForm(config.popupTypeEditSelector, (evt, info) => {
    // Отменяем стандартную отправку формы
    evt.preventDefault();
    // Собираем нужные значения полей формы
    const name = info[config.userNameInputName];
    const job = info[config.userInfoInputName];
    // Заполняем информацию о профиле
    userInfo.setUserInfo(name, job);
    // Закрываем попап
    popupTypeEdit.close();
});

// Попап добавления карточки
const popupTypeAdd = new PopupWithForm(config.popupTypeAddSelector, (evt, info) => {
    // Отменяем стандартную отправку формы
    evt.preventDefault();
    // Собираем нужные значения полей формы
    const name = info[config.placeNameInputName];
    const link = info[config.placeLinkInputName];
    // Создаём карточку
    createCard(name, link);
    // Закрываем попап
    popupTypeAdd.close();
});

// Попап показа места
const popupTypeShow = new PopupWithImage(config.popupTypeShowSelector);

// Экземпляры класса-валидатора для разных форм
const formProfileValidator = new FormValidator(formValidationConfig, config.formProfileSelector);
const formPlaceValidator = new FormValidator(formValidationConfig, config.formPlaceSelector);

// *** ФУНКЦИИ ***

// Запись в форму для редактирования профиля данных из блока profile
function autoFillFormProfile() {
    const info = userInfo.getUserInfo();
    // Вводим в поле имени значение из профиля
    formProfileName.value = info.name;
    // Вводим в поле с описанием значение из профиля
    formProfileJob.value = info.job;
}

// Создание карточки
function createCard(name, link) {
     // Подготавливаем экземпляр класса карточки
     const card = new Card(name, link, config.cardTemplateId, () => {
        popupTypeShow.open(name, link);
    });
    // Создаём элемент карточки
    const cardElement = card.generateCard();
    // Добавляем карточку в секцию
    photoGrid.addItem(cardElement);
}

// *** КОД (ПРИ ЗАГРУЗКЕ СТРАНИЦЫ) ***

// Отрисовываем все элементы секции
photoGrid.renderItems();

// Добавляем слушатели попапам
popupTypeEdit.setEventListeners();
popupTypeAdd.setEventListeners();
popupTypeShow.setEventListeners();

// Включаем валидацию обеих форм
formProfileValidator.enableValidation();
formPlaceValidator.enableValidation();

// *** СЛУШАТЕЛИ СОБЫТИЙ ***

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

// Открытие попапа при нажатии на кнопку добавления карточк
addButton.addEventListener('click', () => {
    // Убираем все предупреждения об ошибках
    formPlaceValidator.hideAllInputErrors();
    // Открываем попап
    popupTypeAdd.open();
});