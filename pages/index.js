import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import PopupWithImages from "../scripts/PopupWithImages.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";

import {
  popupWithImageSelector,
  popupImageSelectors,
  openedElementClass,
  closedElementClass,
  elementCloseButtonSelector,
} from "../scripts/utils.js";

import {
  initialCards,
  cardDataSelectors,
  cardButtonsSelectors,
  likeIconSelector,
  elements,
  elementTemplate,
  singleElementSelector,
} from "../scripts/utils.js";

import {
  popupCloseButtonSelector,
  formSelector,
  inputSelector,
  saveButtonSelector,
} from "../scripts/utils.js";

import { editButton, addButton } from "../scripts/utils.js";

import { errorMesageClass, userData } from "../scripts/utils.js";

const userInfo = new UserInfo(userData);

const imagePopup = new PopupWithImages(
  popupWithImageSelector,
  popupImageSelectors
);

imagePopup.setEventListeners(elementCloseButtonSelector);

function handleCardClick(imObj) {
  imagePopup.open(openedElementClass, closedElementClass, imObj);
}

imagePopup.close(openedElementClass, closedElementClass);

function handleDeleteClick(element) {
  element.remove();
}

const cards = new Section(
  {
    items: initialCards,
    renderer: function (imObj, elementTemplate, singleElementSelector) {
      const card = new Card(
        imObj,
        elementTemplate,
        singleElementSelector,
        handleCardClick,
        handleDeleteClick
      );
      const newElement = card.CreateCard(
        cardDataSelectors,
        cardButtonsSelectors,
        likeIconSelector
      );
      cards.addItem(newElement);
    },
  },
  elements
);

cards.renderer(elementTemplate, singleElementSelector);

function handleSaveSubmitEvt(valuesObj) {
  userInfo.setUserInfo(valuesObj);
  profilePopup.close();
}

function handleCreateSubmitEvt(valuesObj) {
  const newCard = new Card(
    valuesObj,
    elementTemplate,
    singleElementSelector,
    handleCardClick,
    handleDeleteClick
  );
  const newCardElement = newCard.CreateCard(
    cardDataSelectors,
    cardButtonsSelectors,
    likeIconSelector
  );
  cards.addItem(newCardElement);
  placePopup.close();
}

const profilePopupElement = document.querySelector("#profileModal");
const placePopupElement = document.querySelector("#placeModal");

const getValidatorConfig = (popupElement) => {
  const inputs = Array.from(popupElement.querySelectorAll(inputSelector));
  const spanErrors = new Map();

  inputs.forEach((input) => {
    const errorSpan = popupElement.querySelector(`#${input.id}-error`);
    if (errorSpan) spanErrors.set(input.id, errorSpan);
  });

  return {
    crntForm: popupElement.querySelector(formSelector),
    inputs,
    crntBtn: popupElement.querySelector(saveButtonSelector),
    spanErrors,
  };
};

const profileValidator = new FormValidator(
  getValidatorConfig(profilePopupElement),
  null,
  errorMesageClass
);
const placeValidator = new FormValidator(
  getValidatorConfig(placePopupElement),
  null,
  errorMesageClass
);

profileValidator._confObjt.inputs.forEach((input) => {
  input.addEventListener("input", (evt) => {
    profileValidator.EnableValidation(evt);
  });
});
placeValidator._confObjt.inputs.forEach((input) => {
  input.addEventListener("input", (evt) => {
    placeValidator.EnableValidation(evt);
  });
});

const profilePopup = new PopupWithForm(
  "#profileModal",
  handleSaveSubmitEvt,
  formSelector,
  profileValidator
);
const placePopup = new PopupWithForm(
  "#placeModal",
  handleCreateSubmitEvt,
  formSelector,
  placeValidator
);

profilePopup.setEventListeners(
  popupCloseButtonSelector,
  formSelector,
  inputSelector
);
placePopup.setEventListeners(
  popupCloseButtonSelector,
  formSelector,
  inputSelector
);

editButton.addEventListener("click", function () {
  profilePopup.open();
});
addButton.addEventListener("click", function () {
  placePopup.open();
});

profilePopup.close();
placePopup.close();
