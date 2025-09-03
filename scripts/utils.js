const popupWithImageSelector = "#popup-with-image";
const popupImageSelectors = {
  imageSelector: ".element__image-expanded",
  captionSelector: ".element__image-caption",
};
const openedElementClass = "element_opened";

const closedElementClass = "element_closed";
const elementCloseButtonSelector = ".element__close-button";

const elements = ".elements";
const elementTemplate = document.querySelector("#element-template").content;
const singleElementSelector = ".element__single";

const cardDataSelectors = {
  cardImageSelector: ".element__image",
  cardCaptionSelector: ".element__name",
};

const cardButtonsSelectors = {
  likeButtonSelector: ".element__like-button",
  deleteButtonSelector: ".element__delete-button",
  imageButtonSelector: ".element__image-button",
};
const likeIconSelector = ".element__like-button-icon";

const popupCloseButtonSelector = ".popup__close-button";
const formSelector = ".form";
const inputSelector = ".form__popup-input";
const saveButtonSelector = ".form__save-button";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const changeButton = document.querySelector(".profile__avatar-button");

const userData = {
  userNameSelector: ".profile__user-name",
  userJobSelector: ".profile__user-occupation",
  userAvatarSelector: ".profile__avatar-image",
};
const errorMesageClass = "form__input_type_error";

const profilePopupElement = document.querySelector("#profileModal");
const placePopupElement = document.querySelector("#placeModal");
const avatarPopupElement = document.querySelector("#avatarModal");

//CREDENCIALES PARA LA API

const apiLink = "https://around-api.es.tripleten-services.com/v1/";
const userToken = "938695b0-a584-4f6b-9f03-293945887999";
const userInfoExtension = "users/me/";
const cardsExtension = "cards/";
const avatarExtension = "avatar/";

//GRUPO DE EXPORTACIONES

export {
  popupWithImageSelector,
  popupImageSelectors,
  openedElementClass,
  closedElementClass,
  elementCloseButtonSelector,
};

export {
  cardDataSelectors,
  cardButtonsSelectors,
  likeIconSelector,
  elements,
  elementTemplate,
  singleElementSelector,
};

export {
  popupCloseButtonSelector,
  formSelector,
  inputSelector,
  saveButtonSelector,
};

export { editButton, addButton, changeButton };

export { errorMesageClass, userData };

export {
  apiLink,
  userToken,
  userInfoExtension,
  cardsExtension,
  avatarExtension,
};

export { profilePopupElement, placePopupElement, avatarPopupElement };
