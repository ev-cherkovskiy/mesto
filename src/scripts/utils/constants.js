// Код клавиши Escape
export const ESCAPE_CODE = 27;

// Конфиг с селекторами
export const config = {
    userNameSelector: '.profile__name',
    userInfoSelector: '.profile__description',
    photoGridSelector: '.photo-grid',
    cardTemplateId: '#card',
    editButtonSelector: '.profile__edit-button',
    addButtonSelector: '.profile__add-button',
    popupTypeEditSelector: '.popup_type_edit',
    formProfileSelector: '.form_type_profile',
    userNameInputName: 'profile-name',
    userInfoInputName: 'profile-job',
    popupTypeAddSelector: '.popup_type_add',
    formPlaceSelector: '.form_type_place',
    placeNameInputName: 'place-name',
    placeLinkInputName: 'place-link',
    popupTypeShowSelector: '.popup_type_show',
}

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
const formProfile = document.querySelector(config.formProfileSelector);
// Поля формы редактирования профиля
export const formProfileName = formProfile.querySelector('.form__input_type_name');
export const formProfileJob = formProfile.querySelector('.form__input_type_description');
// Кнопка редактирования профиля
export const editButton = document.querySelector(config.editButtonSelector);
// Кнопка добавления карточки
export const addButton = document.querySelector(config.addButtonSelector);