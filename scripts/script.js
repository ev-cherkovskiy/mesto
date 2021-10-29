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

// Секция с карточками
const photoGrid = document.querySelector('.photo-grid');
// Шаблон карточки
const cardTemplate = document.querySelector('#card').content;

// *** МАССИВ С ИСХОДНЫМИ ИЗОБРАЖЕНИЯМИ ***

const initialCards = [
    {
        name: 'Бермамыт',
        link: './images/photos/mesto_bermamyt_sqr.jpg',
    },
    {
        name: 'Домбай',
        link: './images/photos/mesto_dombay_sqr.jpg',
    },
    {
        name: 'Куршская Коса',
        link: './images/photos/mesto_kurshskaya-kosa_sqr.jpg',
    },
    {
        name: 'Нижневартовск',
        link: './images/photos/mesto_nizhnevartovsk_sqr.jpg',
    },
    {
        name: 'Плёс',
        link: './images/photos/mesto_plyos_sqr.jpg',
    },
    {
        name: 'Роза Хутор',
        link: './images/photos/mesto_roza-khutor_sqr.jpg',
    }
]

// *** ФУНКЦИИ ***

// Открытие попапа
function openPopup(popup) {
    // Добавляем соответствующий класс
    popup.classList.add('popup_opened');
}

// Закрытие попапа
function closePopup(popup) {
    // Удаляем соответствующий класс
    popup.classList.remove('popup_opened');
}

// Запись в форму для редактирования профиля данных из блока profile
function autoFillForm() {
    // Вводим в поле имени значение из профиля
    formProfileName.value = userName.textContent.trim();
    // Вводим в поле с описанием значение из профиля
    formProfileJob.value = userJob.textContent.trim();
}

// Запись в профиль значений из формы редактирования профиля
function formProfileSubmit(evt) {
    // Отменяем стандартную отправку формы
    evt.preventDefault();
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
    photoGrid.prepend(generateCard(imageName, imageLink));
}

// Добавление карточки при отправке формы
function formPlaceSubmit(evt) {
    // Отменяем стандартную отправку формы
    evt.preventDefault();
    // Добавляем карточку со слушателями событий, если поля формы заполнены
    if (!checkFormPlace(formPlaceName.value, formPlaceLink.value)) {
        alert('Необходимо заполнить все поля.');
    } else {
        addCard(formPlaceName.value, formPlaceLink.value);
        // Очищаем поля формы
        formPlaceName.value = '';
        formPlaceLink.value = '';
        // Закрываем попап после сохранения всех значений
        closePopup(popupTypeAdd);
    }
}

// Эта функция сбрасывает классы .popup_closed для всех попапов.
// Без неё, если не вводить класс .popup_closed, при загрузке страницы на мгновенье появляются все попапы.
function preparePopups() {
    popupTypeEdit.classList.remove('popup_closed');
    popupTypeAdd.classList.remove('popup_closed');
    popupTypeShow.classList.remove('popup_closed');
};

// Проверка, заполнены ли все поля формы при добавлении карточки
function checkFormPlace(name, link) {
    return Boolean(name) && Boolean(link); 
};

// *** КОД (ПРИ ЗАГРУЗКЕ СТРАНИЦЫ) ***

// Наполняем секцию карточками из исходного массива
initialCards.forEach( (item) => {
    addCard(item.name, item.link);
});
// Подготавливаем попапы до нажатия на кнопки, чтоб трансформация отображалась корректно
preparePopups();

// *** СЛУШАТЕЛИ СОБЫТИЙ ***

// Вызов функции открытия попапа редактирования профиля
editButton.addEventListener('click', () => {
    // Заполняем форму данными из профиля
    autoFillForm();
    // Открываем попап
    openPopup(popupTypeEdit);
})
// Вызов функции закрытия попапа редактирования профиля
popupTypeEditCloseButton.addEventListener('click', () => {
    closePopup(popupTypeEdit);
});
// Вызов функции изменения значений имени и описания профиля при отправке формы
formProfile.addEventListener('submit', formProfileSubmit);

// Вызов функции открытия попапа добавления карточки
addButton.addEventListener('click', () => {
    openPopup(popupTypeAdd);
});
// Вызов функции закрытия попапа добавления карточки
popupTypeAddCloseButton.addEventListener('click', () => {
    closePopup(popupTypeAdd);
});
// Вызов функции добавления карточки при отправке формы
formPlace.addEventListener('submit', formPlaceSubmit);

// Вызов функции закрытия попапа показа места
popupTypeShowCloseButton.addEventListener('click', () => {
    closePopup(popupTypeShow);
});
