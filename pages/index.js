import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import PopupWithImages from "../scripts/PopupWithImages.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import PopupWithConfirmation from "../scripts/PopupWithConfirmation.js";
import Api from "../scripts/Api.js";

import {
  popupWithImageSelector,
  popupImageSelectors,
  openedElementClass,
  closedElementClass,
  elementCloseButtonSelector,
} from "../scripts/utils.js";

import {
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

import { editButton, addButton, changeButton } from "../scripts/utils.js";

import { errorMesageClass, userData } from "../scripts/utils.js";

import {
  apiLink,
  userToken,
  userInfoExtension,
  cardsExtension,
  avatarExtension,
} from "../scripts/utils.js";

import {
  profilePopupElement,
  placePopupElement,
  avatarPopupElement,
} from "../scripts/utils.js";

//DOES MISCELANEOUS ACTIONS

const api = new Api(
  apiLink,
  userToken,
  userInfoExtension,
  cardsExtension,
  avatarExtension
);
const userDataRequest = api.loadUserInfo();

const userInfo = new UserInfo(userData);
userInfo.loadUserInfo(userDataRequest);

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

const avatarValidator = new FormValidator(
  getValidatorConfig(avatarPopupElement),
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

avatarValidator._confObjt.inputs.forEach((input) => {
  input.addEventListener("input", (evt) => {
    avatarValidator.EnableValidation(evt);
  });
});

function renderLoading(isLoading, currentPopup) {
  if (isLoading) {
    currentPopup.querySelector(saveButtonSelector).textContent = "Guardando...";
  } else {
    if (currentPopup.id == "placeModal") {
      currentPopup.querySelector(saveButtonSelector).textContent = "Crear";
    } else {
      currentPopup.querySelector(saveButtonSelector).textContent = "Guardar";
    }
  }
}

//CREATES HANDLE FUNCTIONS FOR DIFFERENT POPUPS EVTS.

function handleSaveSubmitEvt(valuesObj, currentPopup) {
  renderLoading(true, currentPopup);
  api
    .editProfile(valuesObj)
    .then(() => {
      userInfo.setUserInfo(valuesObj);
      profilePopup.close();
    })
    .catch((error) => {
      console.error("Error al guardar el perfil del usuario:", error);
    })
    .finally(() => {
      renderLoading(false, currentPopup);
    });
}

function handleCreateSubmitEvt(valuesObj, currentPopup) {
  renderLoading(true, currentPopup);
  api
    .addNewCard(valuesObj)
    .then((serverCardData) => {
      const newCard = new Card(
        serverCardData,
        elementTemplate,
        singleElementSelector,
        handleCardClick,
        handleDeleteClick,
        handleLikeClick
      );
      const newCardElement = newCard.CreateCard(
        cardDataSelectors,
        cardButtonsSelectors,
        likeIconSelector
      );
      cards.addItem(newCardElement);
      placePopup.close();
    })
    .catch((error) => {
      console.error("Error al crar tarjeta:", error);
    })
    .finally(() => {
      renderLoading(false, currentPopup);
    });
}

function handleDeleteSubmitEvt(cardId, element) {
  api.deleteCard(cardId);
  element.remove();
}

function handleChangeSubmitEvt(avatarLink, currentPopup) {
  renderLoading(true, currentPopup);
  userInfo.setUserAvatar(avatarLink.link);
  api.updateAvatar(avatarLink.link).finally(() => {
    renderLoading(false, currentPopup);
  });
  avatarPopup.close();
}

//CREATES ALL POPUP CLASSES

const imagePopup = new PopupWithImages(
  popupWithImageSelector,
  popupImageSelectors
);

const popupWithDeleteConfirmation = new PopupWithConfirmation(
  "#confirmationPopup",
  handleDeleteSubmitEvt
);

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

const avatarPopup = new PopupWithForm(
  "#avatarModal",
  handleChangeSubmitEvt,
  formSelector,
  avatarValidator
);

//SET EVENT LISTENERS FOR EACH POPUP
//REFACTORIZAR DESPUES LOS SET-LISTENERS PARA POPUP WITH FORM

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

avatarPopup.setEventListeners(
  popupCloseButtonSelector,
  formSelector,
  inputSelector
);

popupWithDeleteConfirmation.setEventListeners(
  popupCloseButtonSelector,
  ".form__confirmation-button"
);

imagePopup.setEventListeners(elementCloseButtonSelector);

//CREATES HANDLE EVENTS FOR DIFFERENT CARD EVTS.

function handleCardClick(imObj) {
  imagePopup.open(openedElementClass, closedElementClass, imObj);
}

function handleDeleteClick(openedElementClass, cardId, element) {
  popupWithDeleteConfirmation.open(openedElementClass, cardId, element);
}

function handleLikeClick(likeIcon, cardId, likeStatus) {
  api.toggleLikeCardState(cardId, likeStatus);
  if (likeIcon.textContent === "🤍") {
    likeIcon.textContent = "🖤";
  } else {
    likeIcon.textContent = "🤍";
  }
}

//CREATES CARDS SECTION

let cards = null;

function inicializarCards() {
  api
    .loadInitiaCards()
    .then((cardsData) => {
      cards = new Section(
        {
          items: cardsData,
          renderer: function (imObj, elementTemplate, singleElementSelector) {
            const card = new Card(
              imObj,
              elementTemplate,
              singleElementSelector,
              handleCardClick,
              handleDeleteClick,
              handleLikeClick
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
    })
    .catch((error) => {
      console.error("Error al cargar las tarjetas del servidor:", error);
    });
}

//INITIALIZES THE PAGE

editButton.addEventListener("click", () => {
  profilePopup.open();
});

addButton.addEventListener("click", () => {
  placePopup.open();
});

changeButton.addEventListener("click", () => {
  avatarPopup.open();
});

inicializarCards();
profilePopup.close();
placePopup.close();
imagePopup.close();
popupWithDeleteConfirmation.close();
avatarPopup.close();
