export default class Api {
  constructor(
    apiLink,
    userToken,
    userInfoExtension,
    cardsExtension,
    avatarExtension
  ) {
    this._apiLink = apiLink;
    this._userToken = userToken;
    this._userInfoExtension = userInfoExtension;
    this._cardsExtension = cardsExtension;
    this._avatarExtension = avatarExtension;
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error ${res.status}: ${res.statusText}`);
    }
    return res.json();
  }

  loadUserInfo() {
    return fetch(`${this._apiLink}${this._userInfoExtension}`, {
      headers: { authorization: this._userToken },
    })
      .then(this._handleResponse)
      .catch((error) => {
        console.error("Error al cargar la informacion del usuario:", error);
        throw error;
      });
  }

  loadInitiaCards() {
    return fetch(`${this._apiLink}${this._cardsExtension}`, {
      headers: { authorization: this._userToken },
    })
      .then(this._handleResponse)
      .catch((error) => {
        console.error("Error al cargar las tarjetas del servidor:", error);
        throw error;
      });
  }

  editProfile({ personName, personJob }) {
    return fetch(`${this._apiLink}${this._userInfoExtension}`, {
      method: "PATCH",
      headers: {
        authorization: this._userToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: personName,
        about: personJob,
      }),
    })
      .then(this._handleResponse)
      .catch((error) => {
        console.error("Error al editar el perfil del usuario:", error);
        throw error;
      });
  }

  addNewCard({ name, link }) {
    return fetch(`${this._apiLink}${this._cardsExtension}`, {
      method: "POST",
      headers: {
        authorization: this._userToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(this._handleResponse)
      .catch((error) => {
        console.error("Error al añadir tarjeta:", error);
        throw error;
      });
  }

  toggleLikeCardState(cardId, currentLikeStatus) {
    const method = currentLikeStatus ? "DELETE" : "PUT";

    return fetch(`${this._apiLink}${this._cardsExtension}${cardId}/likes/`, {
      method: method,
      headers: {
        authorization: this._userToken,
        "Content-Type": "application/json",
      },
      body: currentLikeStatus
        ? undefined
        : JSON.stringify({ isLiked: currentLikeStatus }),
    })
      .then(this._handleResponse)
      .catch((error) => {
        console.error("Error en cambio de estado de me gusta:", error);
        throw error;
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._apiLink}${this._cardsExtension}${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._userToken,
        "Content-Type": "application/json",
      },
    })
      .then(this._handleResponse)
      .catch((error) => {
        console.error("Error al eliminar tarjeta:", error);
        throw error;
      });
  }

  updateAvatar(avatar) {
    return fetch(
      `${this._apiLink}${this._userInfoExtension}${this._avatarExtension}`,
      {
        method: "PATCH",
        headers: {
          authorization: this._userToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatar }),
      }
    )
      .then(this._handleResponse)
      .catch((error) => {
        console.error("Error al actualizar el avatar:", error);
        throw error;
      });
  }
}
