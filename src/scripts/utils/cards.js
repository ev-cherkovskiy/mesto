// Константы путей до изображений
const bermamytImage = new URL('../../images/photos/mesto_bermamyt_sqr.jpg', import.meta.url);
const dombayImage = new URL('../../images/photos/mesto_dombay_sqr.jpg', import.meta.url);
const kurshskayaKosaImage = new URL('../../images/photos/mesto_kurshskaya-kosa_sqr.jpg', import.meta.url);
const nizhnevartovskImage = new URL('../../images/photos/mesto_nizhnevartovsk_sqr.jpg', import.meta.url);
const plyosImage = new URL('../../images/photos/mesto_plyos_sqr.jpg', import.meta.url);
const rozaKhutorImage = new URL('../../images/photos/mesto_roza-khutor_sqr.jpg', import.meta.url);

// Массив с исходными карточками
export const initialCards = [
    { name: 'Бермамыт', link: bermamytImage },
    { name: 'Домбай', link: dombayImage },
    { name: 'Куршская Коса', link: kurshskayaKosaImage },
    { name: 'Нижневартовск', link: nizhnevartovskImage },
    { name: 'Плёс', link: plyosImage },
    { name: 'Роза Хутор', link: rozaKhutorImage },
]