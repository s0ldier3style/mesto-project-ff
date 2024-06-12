const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-15",
  headers: {
    authorization: "3b7b0448-e8c7-4bbf-9454-09812c494e38",
    "Content-Type": "application/json",
  },
};

// Функция проверки ответа сервера

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

// Получение данных информации о пользователе
export function getProfileData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      return getResponseData(res);
    })
    .then((data) => {
      return data;
    });
}

// Получение данных о карточках
export function getCardsData() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      return getResponseData(res);
    })
    .then((data) => {
      return data;
    });
}

// Обновление данных пользователя
export function patchProfileData(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  })
    .then((res) => {
      return getResponseData(res);
    })
    .then((data) => {
      return data;
    });
}

// Добавление новой карточки
export function postCardsData(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  })
    .then((res) => {
      return getResponseData(res);
    })
    .then((data) => {
      return data;
    });
}

// Удаление карточки
export function deleteCardData(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      return getResponseData(res);
    })
    .then((data) => {
      return data;
    });
}

// Поставить лайк на карточку по ее id
export function putLikeById(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      return getResponseData(res);
    })
    .then((data) => {
      return data;
    });
}

// Удалить лайк с карточки по ее id
export function deleteLikeById(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      return getResponseData(res);
    })
    .then((data) => {
      return data;
    });
}

// Обновление аватара пользователя
export function changeProfileAvatar(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  })
    .then((res) => {
      return getResponseData(res);
    })
    .then((data) => {
      return data;
    });
}
