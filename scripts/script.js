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
const popupTypeShow = document.querySelector('.popup_type_show');
// Кнопка закрытия попапа показа места
const popupTypeShowCloseButton = popupTypeShow.querySelector('.popup__close-button');

// Имя и описание пользователя в блоке profile
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__description');

// Кнопка редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
// Кнопка добавления карточки
const addButton = document.querySelector('.profile__add-button');

// Кнопка отправки формы добавления карточки
const formPlaceSubmitButton = formPlace.querySelector('.form__submit-button');

// Секция с карточками
const photoGrid = document.querySelector('.photo-grid');
// Шаблон карточки
const cardTemplate = document.querySelector('#card').content;

// *** ФУНКЦИИ ***

// Функция закрытия попапа при нажатии на esc
function escapeListener(evt) {
    // Находим открытый попап
    const popup = document.querySelector('.popup_opened');
    // Если нажата клавиша esc, то...
    if (evt.key === 'Escape') {
        // 1) закрываем попап
        popup.classList.remove('popup_opened');
        // 2) снимаем слушатель
        document.removeEventListener('keydown', escapeListener);
    };
}

// Открытие попапа
function openPopup(popup) {
    // Добавляем соответствующий класс
    popup.classList.add('popup_opened');
    // Добавляем попапу слушатель для закрытия нажатием на esc
    document.addEventListener('keydown', escapeListener);
}

// Закрытие попапа
function closePopup(popup) {
    // Удаляем соответствующий класс
    popup.classList.remove('popup_opened');
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

// Подготовка карточки со слушателями событий
// Аргументы -- название места и ссылка на картинку
function generateCard(imageName, imageLink) {
    // Клонируем DOM-узел (непосредственно карточку) из шаблона
    const cardItem = cardTemplate.cloneNode(true);
    // Задаём картинке атрибуты src и alt
    const cardImage = cardItem.querySelector('.photo-grid__img');
    cardImage.src = imageLink;
    cardImage.alt = imageName;
    // Задаём название места
    cardItem.querySelector('.photo-grid__caption-text').textContent = imageName;
    // Выносим кнопку-лайк в переменную
    const likeButton = cardItem.querySelector('.photo-grid__like-button');
    // Вешаем на кнопку-лайк слушатель событий,
    // который будет приписывать ей соответствующий класс при нажатии
    likeButton.addEventListener('click', (evt) => {
        evt.target.classList.toggle('photo-grid__like-button_active');
    });
    // Выносим кнопку для удаления карточки в переменную
    const deleteButton = cardItem.querySelector('.photo-grid__delete-button');
    // Вешаем на эту кнопку слушатель событий,
    // который будет удалять родительский узел (саму карточку)
    deleteButton.addEventListener('click', () => {
       const parentItem = deleteButton.closest('.photo-grid__item');
       parentItem.remove();
    });
    // Делаем изображение на карточке интерактивным:
    // 1) Выносим картинку в переменную
    const imageElement = cardItem.querySelector('.photo-grid__img');
    // 2) Вешаем на неё слушатель событий, который при нажатии на неё...
    imageElement.addEventListener('click', () => {
        // 2.1) Задаёт путь до этой картинки и альт
        const popupImage = popupTypeShow.querySelector('.popup__image');
        popupImage.src = imageLink;
        popupImage.alt = imageName;
        // 2.2) Задаёт подпись для этой картинки
        popupTypeShow.querySelector('.popup__description').textContent = imageName;
        // 2.3) Открывает попап показа картинки
        openPopup(popupTypeShow);
    });
    // Возвращаем подготовленную карточку как результат выполнения функции
    return cardItem;
}

// Добавление карточки в начало секции на странице
// Аргументы -- название места и ссылка на картинку
function addCard(imageName, imageLink) {
    // Непосредственно добавляем карточку на страницу
    photoGrid.prepend(generateCard(imageName, imageLink));
    // Деактивируем кнопку отправки формы на случай следующего вызова формы
    formPlaceSubmitButton.classList.add('form__submit-button_disabled');
    formPlaceSubmitButton.disabled = true;
}

// Добавление на страницу всех карточек из исходного массива
function addInitialCards() {
    initialCards.forEach(item => photoGrid.append(generateCard(item.name, item.link)));
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

// *** СЛУШАТЕЛИ СОБЫТИЙ ***

// Вызов функции открытия попапа редактирования профиля
editButton.addEventListener('click', () => {
    // Заполняем форму данными из профиля
    autoFillFormProfile();
    // Открываем попап
    openPopup(popupTypeEdit);
})
// Вызов функции закрытия попапа редактирования профиля
// Используем делегирование события. Если таргет -- кнопка закрытия или оверлей, то закрываем попап
popupTypeEdit.addEventListener('click', evt => {
    if (evt.target === popupTypeEditCloseButton || evt.target === popupTypeEdit) closePopup(popupTypeEdit);
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