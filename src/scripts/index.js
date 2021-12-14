// Импорт главного css-файла
import '../pages/index.css';

// Импорт классов
import { UserInfo } from './UserInfo.js';
import { Section } from './Section.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';

// Импорт констант
import { initialCards } from './utils/cards.js';
import {
    formValidationConfig as config,
    editButton,
    addButton,
    formProfileName,
    formProfileJob
} from './utils/constants.js';

// *** КОНСТАНТЫ ***

// Информация о пользователе
const userInfo = new UserInfo('.profile__name', '.profile__description');

// Секция с карточками
const photoGrid = new Section({
    items: initialCards,
    renderer: (item) => {
        // Подготавливаем экземпляр класса карточки
        const card = new Card(item.name, item.link, '#card', () => {
            popupTypeShow.open(item.name, item.link);
        });
        // Создаём элемент карточки
        const cardElement = card.generateCard();
        // Добавляем карточку в секцию
        photoGrid.addItem(cardElement);
    }
}, '.photo-grid');

// Попап редактирования профиля
const popupTypeEdit = new PopupWithForm('.popup_type_edit', (evt) => {
    // Отменяем стандартную отправку формы
    evt.preventDefault();
    // Собираем нужные значения полей формы
    const info = popupTypeEdit.getInputValues();
    const name = info['profile-name'];
    const job = info['profile-job'];
    // Заполняем информацию о профиле
    userInfo.setUserInfo(name, job);
    // Закрываем попап
    popupTypeEdit.close();
});

// Попап добавления карточки
const popupTypeAdd = new PopupWithForm('.popup_type_add', (evt) => {
    // Отменяем стандартную отправку формы
    evt.preventDefault();
    // Собираем нужные значения полей формы
    const info = popupTypeAdd.getInputValues();
    const name = info['place-name'];
    const link = info['place-link'];
    // Подготавливаем экземпляр класса карточки
    const card = new Card(name, link, '#card', () => {
        popupTypeShow.open(name, link);
    });
    // Создаём элемент карточки
    const cardElement = card.generateCard();
    // Добавляем карточку в секцию
    photoGrid.addItem(cardElement);
    // Закрываем попап
    popupTypeAdd.close();
});

// Попап показа места
const popupTypeShow = new PopupWithImage('.popup_type_show');

// Экземпляры класса-валидатора для разных форм
const formProfileValidator = new FormValidator(config, '.form_type_profile');
const formPlaceValidator = new FormValidator(config, '.form_type_place');

// *** ФУНКЦИИ ***

// Запись в форму для редактирования профиля данных из блока profile
function autoFillFormProfile() {
    const info = userInfo.getUserInfo();
    // Вводим в поле имени значение из профиля
    formProfileName.value = info.name;
    // Вводим в поле с описанием значение из профиля
    formProfileJob.value = info.job;
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