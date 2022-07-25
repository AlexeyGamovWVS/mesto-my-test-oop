export default class Api {
  constructor({ url, urlLikes, headers }) {
    this._url = url;
    this._urlLikes = urlLikes;
    this._headers = headers;
  }

  _getResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._getResponse);
  }

  editProfileInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then(this._getResponse);
  }

  editProfilePic(picture) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(picture),
    }).then(this._getResponse);
  }

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._getResponse);
  }

  addCardToServer(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._getResponse);
  }

  removeCardFromServer(dataId) {
    return fetch(`${this._url}/cards/${dataId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponse);
  }

  changeLikeButton(dataId, isLiked) {
    return fetch(`${this._urlLikes}/${dataId}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._getResponse);
  }
}

/*//
const apiConfig = {
  url: "https://mesto.nomoreparties.co/plus-cohort-13",
  urlLikes: "https://nomoreparties.co/v1/plus-cohort-13/cards/likes",
  headers: {
    "Content-Type": "application/json",
    Authorization: "5f5f6516-2c69-4593-ad66-9a5c627fc536",
  },
};
//
const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};
//
function getProfile() {
  return fetch(`${apiConfig.url}/users/me`, {
    headers: apiConfig.headers,
  }).then(onResponse);
}
//
function editProfileInfo(data) {
  return fetch(`${apiConfig.url}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify(data),
  }).then(onResponse);
}
//
function editProfilePic(data) {
  return fetch(`${apiConfig.url}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify(data),
  }).then(onResponse);
}
//
function getAllCards() {
  return fetch(`${apiConfig.url}/cards`, {
    headers: apiConfig.headers,
  }).then(onResponse);
}
//
function addCardToServer(data) {
  return fetch(`${apiConfig.url}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify(data),
  }).then(onResponse);
}

function removeCardFromServer(dataId) {
  return fetch(`${apiConfig.url}/cards/${dataId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(onResponse);
}

function changeLikeButton(dataId, isLiked) {
  return fetch(`${apiConfig.urlLikes}/${dataId}`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: apiConfig.headers,
  }).then(onResponse);
}
*/
