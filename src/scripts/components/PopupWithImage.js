// Импорт родительского класса
import { Popup } from "./Popup.js";

// Класс PopupWithImage (дочерний для Popup), экземпляр которого используется для показа изображения
export class PopupWithImage extends Popup {
    // Дополняем конструктор: добавляем поля с изображением и описанием
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image');
        this._description = this._popup.querySelector('.popup__description');
    }
    
    // Дополняем метод открытия попапа
    // Передаём аргументы: название места и ссылку на картинку
    open(imageName, imageLink) {
        // Заполняем свойства в соответствии с переданными аргументами
        this._image.src = imageLink;
        this._image.alt = imageName;
        this._description.textContent = imageName;
        // Вызываем родительский метод открытия попапа
        super.open();
    }
}