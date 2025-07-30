const popupWithImageSelector = "#popup-with-image";
const popupImageSelectors = {
  imageSelector: ".element__image-expanded",
  captionSelector: ".element__image-caption",
};
const openedElementClass = "element_opened";

const closedElementClass = "element_closed";
const elementCloseButtonSelector = ".element__close-button";

const initialCards = [
  {
    name: "Mill Valley, CA",
    link: "./images/mill-valley-ca.jpg",
  },
  {
    name: "Niagara Falls, NY",
    link: "./images/niagara-falls-ny.jpg",
  },
  {
    name: "Grand Canyon, AZ",
    link: "./images/page-az.jpg",
  },
  {
    name: "Yellowstone, Wy",
    link: "./images/yellowstone-wy.jpg",
  },
  {
    name: "Lincoln, Nh",
    link: "./images/lincoln-nh.jpg",
  },
  {
    name: "Traper Creek, Ak",
    link: "./images/trapper-creek-ak.jpg",
  },
];

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

const userData = {
  userNameSelector: ".profile__user-name",
  userJobSelector: ".profile__user-occupation",
};
const errorMesageClass = "form__input_type_error";

export {
  popupWithImageSelector,
  popupImageSelectors,
  openedElementClass,
  closedElementClass,
  elementCloseButtonSelector,
};

export {
  initialCards,
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

export { editButton, addButton };

export { errorMesageClass, userData };
