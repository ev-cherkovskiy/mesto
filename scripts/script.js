// *** ФУНКЦИИ ***

// Открытие попапа
function openPopup() {
    // Добавляем класс с display: flex;
    let popup = document.querySelector('.popup');
    popup.classList.add('popup_opened');

    // Вводим в поле имени значение из профиля
    let userName = document.querySelector('.profile__name').textContent.trim();
    let formName = popup.querySelector('.form-profile__input_type_name');
    formName.value = userName;

    // Вводим в поле с описанием значение из профиля
    let userJob = document.querySelector('.profile__description').textContent.trim();
    let formJob = popup.querySelector('.form-profile__input_type_description');
    formJob.value = userJob;
}

// Закрытие попапа
function closePopup() {
    // Удаляем класс с display: flex;
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
}

// Запись в профиль значений из формы редактирования профиля
function formSubmitHandler(evt) {
    // Отменяем стандартную отправку формы
    evt.preventDefault();

    // Записываем в имя профиля значение из формы
    let nameInput = formElement.querySelector('.form-profile__input_type_name');
    let userName = document.querySelector('.profile__name');
    userName.textContent = nameInput.value;

    // Записываем в описание профиля значение из формы
    let jobInput = formElement.querySelector('.form-profile__input_type_description');
    let userJob = document.querySelector('.profile__description');
    userJob.textContent = jobInput.value;

    // Закрываем попап после сохранения всех значений
    closePopup();
}

// *** КОД ***

// Вызываем функцию открытия попапа при нажатии кнопки редактирования профиля
let editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', openPopup);

// Вызываем функцию закрытия попапа при нажатии кнопки закрытия формы редактирования профиля
let closeButton = document.querySelector('.popup__close-button');
closeButton.addEventListener('click', closePopup);

// Вызываем функцию изменения значений имени и описания профиля при отправке формы
let formElement = document.querySelector('.popup__container');
formElement.addEventListener('submit', formSubmitHandler);
