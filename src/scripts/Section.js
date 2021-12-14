// Класс section, экземпляр которого используются в качестве секции с карточками
// Аргументы: массив карточек, колбэк для отрисовки карточки, селектор контейнера
export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    // Публичный метод, который готовит отрисовку всех элементов в секции
    renderItems() {
        // Для каждого элемента применяем функцию renderer(), переданную как колбэк
        this._items.forEach(item => {
            this._renderer(item);
        })
    }

    // Публичный метод, который добавляет элемент в контейнер
    addItem(item) {
        this._container.prepend(item);
    }
}