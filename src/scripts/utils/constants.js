// Код клавиши Escape
export const ESCAPE_CODE = 27;

// Объект настроек для валидации форм
export const formValidationConfig = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active',
}

// *** DOM-ЭЛЕМЕНТЫ ***

// Форма внутри попапа для редактирования профиля
const formProfile = document.querySelector('.form_type_profile');
// Поля формы редактирования профиля
export const formProfileName = formProfile.querySelector('.form__input_type_name');
export const formProfileJob = formProfile.querySelector('.form__input_type_description');
// Кнопка редактирования профиля
export const editButton = document.querySelector('.profile__edit-button');
// Кнопка добавления карточки
export const addButton = document.querySelector('.profile__add-button');