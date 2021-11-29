// Импорт всех модулей
import {FormValidator} from './FormValidator.js';
import {initialCards} from './cards.js';
import {Card} from './Card.js';

// *** КОНСТАНТЫ ***

// Код клавиши Escape
const ESCAPE_CODE = 27;

// Объект настроек для валидации форм
const config = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active',
}

// *** ПЕРЕМЕННЫЕ -- DOM-ЭЛЕМЕНТЫ ***

// Попап для редактирования данных профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');
// Форма внутри попапа для редактирования профиля
const formProfile = document.querySelector('.form_type_profile');
// Поля формы редактирования профиля
const formProfileName = formProfile.querySelector('.form__input_type_name');
const formProfileJob = formProfile.querySelector('.form__input_type_description');
// Кнопка закрытия попапа редактирования профиля
const popupTypeEditCloseButton = popupTypeEdit.querySelector('.popup__close-button');

// Попап для добавления карточки
const popupTypeAdd = document.querySelector('.popup_type_add');
// Форма внутри попапа добавления карточки
const formPlace = document.querySelector('.form_type_place');
// Поля формы добавления карточки
const formPlaceName = formPlace.querySelector('.form__input_type_place-name');
const formPlaceLink = formPlace.querySelector('.form__input_type_place-link');
// Кнопка закрытия попапа добавления карточки
const popupTypeAddCloseButton = popupTypeAdd.querySelector('.popup__close-button');

// Попап для показа места
export const popupTypeShow = document.querySelector('.popup_type_show');
// Кнопка закрытия попапа показа места
const popupTypeShowCloseButton = popupTypeShow.querySelector('.popup__close-button');

// Имя и описание пользователя в блоке profile
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__description');

// Кнопка редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
// Кнопка добавления карточки
const addButton = document.querySelector('.profile__add-button');

// Секция с карточками
const photoGrid = document.querySelector('.photo-grid');

// *** ФУНКЦИИ ***

// Функция закрытия попапа при нажатии на esc
function escapeListener(evt) {
    // Находим открытый попап
    const popup = document.querySelector('.popup_opened');
    // Если нажата клавиша esc, то вызываем функцию закрытия попапа
    if (evt.which === ESCAPE_CODE) closePopup(popup);
}

// Открытие попапа
export function openPopup(popup) {
    // Добавляем соответствующий класс
    popup.classList.add('popup_opened');
    // Добавляем попапу слушатель для закрытия нажатием на esc
    document.addEventListener('keydown', escapeListener);
}

// Закрытие попапа
function closePopup(popup) {
    // Удаляем соответствующий класс
    popup.classList.remove('popup_opened');
    // Снимаем слушатель для закрытия нажатием на esc
    document.removeEventListener('keydown', escapeListener);
}

// Запись в форму для редактирования профиля данных из блока profile
function autoFillFormProfile() {
    // Вводим в поле имени значение из профиля
    formProfileName.value = userName.textContent.trim();
    // Вводим в поле с описанием значение из профиля
    formProfileJob.value = userJob.textContent.trim();
}

// Запись в профиль значений из формы редактирования профиля
function formProfileSubmit() {
    // Записываем в имя профиля значение из формы
    userName.textContent = formProfileName.value;
    // Записываем в описание профиля значение из формы
    userJob.textContent = formProfileJob.value;
    // Закрываем попап после сохранения всех значений
    closePopup(popupTypeEdit);
}

// Добавление карточки в начало секции на странице
// Аргументы -- название места и ссылка на картинку
function addCard(imageName, imageLink) {
    // Создаём экземпляр класса
    const cardElement = new Card(imageName, imageLink, '#card');
    // Добавляем в секцию на странице
    photoGrid.prepend(cardElement.generateCard());
}

// Добавление на страницу всех карточек из исходного массива
function addInitialCards() {
    initialCards.forEach(item => {
        // Для каждого элемента массива создаём экземляр карточки...
        const cardElement = new Card(item.name, item.link, '#card');
        // и добавляем его в секцию на страницу
        photoGrid.append(cardElement.generateCard());
    });
}

// Добавление карточки при отправке формы
function formPlaceSubmit() {
    // Добавляем карточку
    addCard(formPlaceName.value, formPlaceLink.value);
    // Очищаем поля формы
    formPlace.reset();
    // Закрываем попап после сохранения всех значений
    closePopup(popupTypeAdd);
}

// *** КОД (ПРИ ЗАГРУЗКЕ СТРАНИЦЫ) ***

// Наполняем секцию карточками из исходного массива
addInitialCards();
// Создаём экземпляры класса-валидатора
const formProfileValidator = new FormValidator(config, '.form_type_profile');
const formPlaceValidator = new FormValidator(config, '.form_type_place');
// Включаем валидацию обеих форм
formProfileValidator.enableValidation();
formPlaceValidator.enableValidation();

// *** СЛУШАТЕЛИ СОБЫТИЙ ***

// Вызов функции открытия попапа редактирования профиля
editButton.addEventListener('click', () => {
    // Заполняем форму данными из профиля
    autoFillFormProfile();
    // Открываем попап
    openPopup(popupTypeEdit);
})
// Вызов функции закрытия попапа редактирования профиля
// Используем делегирование события. Если таргет -- кнопка закрытия или оверлей, то закрываем попап,
// а также убираем все предупреждения об ошибках, поскольку при след. вызове форма вновь заполнится 
// из профиля (т.е. валидными значениями)
popupTypeEdit.addEventListener('click', evt => {
    if (evt.target === popupTypeEditCloseButton || evt.target === popupTypeEdit) {
        closePopup(popupTypeEdit);
        formProfileValidator.hideAllInputErrors();
    };
});
// Вызов функции изменения значений имени и описания профиля при отправке формы
formProfile.addEventListener('submit', formProfileSubmit);

// Вызов функции открытия попапа добавления карточки
addButton.addEventListener('click', () => {
    openPopup(popupTypeAdd);
});
// Вызов функции закрытия попапа добавления карточки
// Используем делегирование события. Если таргет -- кнопка закрытия или оверлей, то закрываем попап
popupTypeAdd.addEventListener('click', evt => {
    if (evt.target === popupTypeAddCloseButton || evt.target === popupTypeAdd) closePopup(popupTypeAdd);
});
// Вызов функции добавления карточки при отправке формы
formPlace.addEventListener('submit', formPlaceSubmit);

// Вызов функции закрытия попапа показа места
// Используем делегирование события. Если таргет -- кнопка закрытия или оверлей, то закрываем попап
popupTypeShow.addEventListener('click', evt => {
    if (evt.target === popupTypeShowCloseButton || evt.target === popupTypeShow) closePopup(popupTypeShow);
});
