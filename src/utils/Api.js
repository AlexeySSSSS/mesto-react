class Api {
    constructor(item) {
        this._baseUrl = item.baseUrl;
        this._headers = item.headers;
    }

    _responseAnalysis(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getData() {
        return Promise.all([this.createInitialCards(), this.uploadUserInformation()]);
    }

    uploadUserInformation() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => this._responseAnalysis(res));
    }

    createInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(res => this._responseAnalysis(res));
    }

    deleteImageCard(item) {
        return fetch(`${this._baseUrl}/cards/${item}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._responseAnalysis(res));
    }

    changeLikeCardStatus(item, isLiked) {
        return fetch(`${this._baseUrl}/cards/${item}/likes`, {
            method: `${!isLiked ? 'DELETE' : 'PUT'}`,
            headers: this._headers
        })
            .then(res => this._responseAnalysis(res));
    }

    changeAvatar(item) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: item.link
            })
        })
            .then(res => this._responseAnalysis(res));
    }

    changeUserInformation(item) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: item.name,
                about: item.info
            })
        })
            .then(res => this._responseAnalysis(res));
    }

    newImageCard(item) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: item.text,
                link: item.url
            })
        })
            .then(res => this._responseAnalysis(res));
    }

}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
    headers: {
        authorization: '987b56da-64a8-4aef-b87c-689882054ee4',
        'Content-Type': 'application/json'
    }
});

export default api;