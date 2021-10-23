// *** ПЕРЕМЕННЫЕ -- DOM-ЭЛЕМЕНТЫ ***

// Попап
let popup = document.querySelector('.popup');
// Форма внутри попапа
let formElement = document.querySelector('.form-profile');
// Поля формы
let formName = formElement.querySelector('.form-profile__input_type_name');
let formJob = formElement.querySelector('.form-profile__input_type_description');
// Имя и описание пользователя в блоке profile
let userName = document.querySelector('.profile__name');
let userJob = document.querySelector('.profile__description');
// Кнопка редактирования профиля
let editButton = document.querySelector('.profile__edit-button');
// Кнопка закрытия попапа
let closeButton = popup.querySelector('.popup__close-button');

// *** ФУНКЦИИ ***

// Открытие попапа
function openPopup() {
    // Добавляем класс с display: flex;
    popup.classList.add('popup_opened');
    // Вводим в поле имени значение из профиля
    formName.value = userName.textContent.trim();
    // Вводим в поле с описанием значение из профиля
    formJob.value = userJob.textContent.trim();
}

// Закрытие попапа: удаляем класс с display: flex;
function closePopup() {
    popup.classList.remove('popup_opened');
}

// Запись в профиль значений из формы редактирования профиля
function formSubmitHandler(evt) {
    // Отменяем стандартную отправку формы
    evt.preventDefault();
    // Записываем в имя профиля значение из формы
    userName.textContent = formName.value;
    // Записываем в описание профиля значение из формы
    userJob.textContent = formJob.value;
    // Закрываем попап после сохранения всех значений
    closePopup();
}

// *** СЛУШАТЕЛИ СОБЫТИЙ ***

// Вызов функции открытия попапа при нажатии кнопки редактирования профиля
editButton.addEventListener('click', openPopup);
// Вызов функции закрытия попапа при нажатии кнопки закрытия формы редактирования профиля
closeButton.addEventListener('click', closePopup);
// Вызов функции изменения значений имени и описания профиля при отправке формы
formElement.addEventListener('submit', formSubmitHandler);
