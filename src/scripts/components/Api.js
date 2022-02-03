// Класс Api, экземпляр которого используется для организации работы с сервером
// В конструкторе один аргумент -- объект, содержащий общую для всех HTTP-запросов часть
export class Api {
    constructor(options) {
        // Путь до сервера
        this._baseUrl = options.baseUrl;
        // Объект заголовков
        this._headers = new Object(options.headers);
    }

// Все приватные методы названы по методам HTTP-запросов. Они представляют собой шаблоны и
// необходимы для отправки более конкретных запросов, которые являются уже публичными методами.

    _get(dir) {
        return fetch(this._baseUrl + dir, {
            headers: this._headers })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    _patch(dir, bodyObject) {
        return fetch(this._baseUrl + dir, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(bodyObject)
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    _post(dir, bodyObject) {
        return fetch(this._baseUrl + dir, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(bodyObject)
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    _delete(dir1, id, dir2) {
        return fetch(this._baseUrl + dir1 + id + dir2, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    _put(dir1, id, dir2) {
        return fetch(this._baseUrl + dir1 + id + dir2, {
            method: 'PUT',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    // Публичные методы используют шаблоны, приведённые выше:
    // дополняют URL и тело запросов

    getUserInfo() {
        return this._get('/users/me');
    }

    getInitialCards() {
        return this._get('/cards');
    }

    changeUserInfo(info) {
        const body = {
            name: info.name,
            about: info.about
        };
        return this._patch('/users/me', body);
    }

    changeAvatar(info) {
        const body = {
            avatar: info.avatar
        };
        return this._patch('/users/me/avatar', body);
    }

    addCard(info) {
        const body = {
            name: info.name,
            link: info.link
        };
        return this._post('/cards', body);
    }

    deleteCard(id) {
        return this._delete('/cards/', id, '');
    }

    likeCard(id) {
        return this._put('/cards/', id, '/likes');
    }

    unlikeCard(id) {
        return this._delete('/cards/', id, '/likes');
    }
}
