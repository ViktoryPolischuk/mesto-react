import {apiConfig} from "./constants";

class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _fetch(url, {method, body}) {
    return fetch(`${this._baseUrl}${url}`, {
      method,
      body,
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserInfo() {
    return this._fetch('/users/me', {
      method: 'GET'
    });
  }

  editUserInfo({name, about}) {
    return this._fetch('/users/me', {
      method: 'PATCH',
      body: JSON.stringify({name, about})
    });
  }

  editUserAvatar(avatar) {
    return this._fetch('/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({avatar})
    });
  }

  getInitialCards() {
    return this._fetch('/cards', {
      method: 'GET'
    });
  }

  addCard({name, link}) {
    return this._fetch('/cards', {
      method: 'POST',
      body: JSON.stringify({name, link})
    });
  }

  deleteCard(cardId) {
    return this._fetch(`/cards/${cardId}`, {
      method: 'DELETE'
    });
  }

  toggleLike(cardId, isLiked) {
    return this._fetch(`/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT'
    });
  }
}

const api = new Api(apiConfig);
export default api;
