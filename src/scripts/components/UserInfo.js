// Класс UserInfo, экземпляр которого используется для работы с информацией о профиле
// Аргументы: селектор имени профиля, селектор описания профиля
export class UserInfo {
    constructor(userNameSelector, userJobSelector) {
        this._name = document.querySelector(userNameSelector);
        this._job = document.querySelector(userJobSelector);
    }

    // Публичный метод, который позволяет получить объект с информацией о профиле
    getUserInfo() {
        // Создаём пустой объект
        const info = {};
        // Заполняем его текущими значениями
        info.name = this._name.textContent.trim();
        info.job = this._job.textContent.trim();
        // Возвращаем объект с информацией
        return info;
    }

    // Публичный метод, который позволяет изменить информацию о профиле на новую
    // Аргументы: новое имя профиля, новое описание профиля
    setUserInfo(newName, newJob) {
        this._name.textContent = newName;
        this._job.textContent = newJob;
    }
}