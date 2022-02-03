// Класс UserInfo, экземпляр которого используется для работы с информацией о профиле
// Аргументы: селектор имени профиля, селектор описания профиля
export class UserInfo {
    constructor(userNameSelector, userJobSelector) {
        this._name = document.querySelector(userNameSelector);
        this._job = document.querySelector(userJobSelector);
        this._avatar = document.querySelector('.profile__avatar');
        this._id;
    }

    // Публичный метод, который позволяет получить объект с информацией о профиле
    getUserInfo() {
        // Создаём пустой объект
        const info = {};
        // Заполняем его текущими значениями
        info.name = this._name.textContent.trim();
        info.job = this._job.textContent.trim();
        info.avatar = this._avatar.src;
        info.id = this._id;
        // Возвращаем объект с информацией
        return info;
    }

    // Публичный метод, который заполняет информацию о пользователе на странице
    setUserInfo(data) {
        // Принцип в том, чтоб создать универсальный метод для заполнения любых данных.
        // Если в метод передан объект, содержащий то или иное поле, то соответствующее свойство
        // заполняется новым значением.
        if (data.name) this._name.textContent = data.name;
        if (data.about) this._job.textContent = data.about;
        if (data.avatar) this._avatar.src = data.avatar;
        if (data._id) this._id = data._id;
    }
}