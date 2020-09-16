export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers
    }

    getUserInfo() {
        return fetch(this._url.userInfo, {
                headers: {
                    authorization: this._headers.token
                }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(res.status);
                }
            })
            .catch((err) => {
                alert(`Ошибка: ${err}`);
            })
    }

    getCards() {
        return fetch(this._url.cards, {
                headers: {
                    authorization: this._headers.token
                }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(res.status);
                }
            })
            .catch((err) => {
                alert(`Ошибка: ${err}`);
            })
    }

    updateUserInfo(nameInfo, jobInfo) {
        return fetch(this._url.userInfo, {
                method: 'PATCH',
                headers: {
                    authorization: this._headers.token,
                    'Content-Type': 'application/json'
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
                    return Promise.reject(res.status);
                }
            })
            .catch((err) => {
                alert(`Ошибка: ${err}`);
            })
    }

    addCard(cardName, cardLink) {
        return fetch(this._url.cards, {
                method: 'POST',
                headers: {
                    authorization: this._headers.token,
                    'Content-Type': 'application/json'
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
                    return Promise.reject(res.status);
                }
            })
            .catch((err) => {
                alert(`Ошибка: ${err}`);
            })
    }

    deleteCard(cardId) {
        return fetch(this._url.cards + '/' + cardId, {
                method: 'DELETE',
                headers: {
                    authorization: this._headers.token,
                }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(res.status);
                }
            })
            .catch((err) => {
                alert(`
                    Ошибка: $ { err }
                    `);
            })
    }
}
