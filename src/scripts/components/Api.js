export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers
    }

    getUserInfo() {
        return fetch(this._url + '/users/me', {
                headers: {
                    authorization: this._headers.authorization,
                }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .catch((err) => {
                alert(`Ошибка: ${err}`);
            })
    }

    getCards() {
        return fetch(this._url + '/cards', {
                headers: {
                    authorization: this._headers.authorization,
                }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .catch((err) => {
                alert(`Ошибка: ${err}`);
            })
    }

    updateUserInfo(nameInfo, jobInfo) {
        return fetch(this._url + '/users/me', {
                method: 'PATCH',
                headers: {
                    authorization: this._headers.authorization,
                    'Content-Type': this._headers.contentType
                },
                body: JSON.stringify({
                    name: nameInfo,
                    about: jobInfo
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .catch((err) => {
                alert(`Ошибка: ${err}`);
            })
    }

    addCard(cardName, cardLink) {
        return fetch(this._url + '/cards', {
                method: 'POST',
                headers: {
                    authorization: this._headers.authorization,
                    'Content-Type': this._headers.contentType
                },
                body: JSON.stringify({
                    name: cardName,
                    link: cardLink
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .catch((err) => {
                alert(`Ошибка: ${err}`);
            })
    }

    deleteCard(cardId) {
        return fetch(this._url + '/cards/' + cardId, {
                method: 'DELETE',
                headers: {
                    authorization: this._headers.authorization,
                }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .catch((err) => {
                alert(`Ошибка: ${err}`);
            })
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (!isLiked) {
            return fetch(this._url + '/cards/likes/' + cardId, {
                    method: 'PUT',
                    headers: {
                        authorization: this._headers.authorization,
                    }
                })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        return Promise.reject(`Ошибка: ${res.status}`);
                    }
                })
                .catch((err) => {
                    alert(`Ошибка: ${err}`);
                })
        } else {
            return fetch(this._url + '/cards/likes/' + cardId, {
                    method: 'DELETE',
                    headers: {
                        authorization: this._headers.authorization,
                    }
                })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        return Promise.reject(`Ошибка: ${res.status}`);
                    }
                })
                .catch((err) => {
                    alert(`Ошибка: ${err}`);
                })
        }
    }

    updateUserAvatar(imageLink) {
        return fetch(this._url + '/users/me/avatar', {
                method: 'PATCH',
                headers: {
                    authorization: this._headers.authorization,
                    'Content-Type': this._headers.contentType
                },
                body: JSON.stringify({
                    avatar: imageLink
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .catch((err) => {
                alert(`Ошибка: ${err}`);
            })
    }

}
