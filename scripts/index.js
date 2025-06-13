const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupForms = [document.forms.profileForm, document.forms.newPlaceForm];
const closeButtons = document.querySelectorAll(".popup__close-button");
const saveButtons = document.querySelectorAll(".form__save-button");
const userName = document.querySelector(".profile__user-name");
const userOccupation = document.querySelector(".profile__user-occupation");
const elements = document.querySelector(".elements");
const elmntTemplate = document.querySelector("#element-template").content;
export { userName, userOccupation, elmntTemplate, elements };

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { closePopup, closeOpndElmnt, openPopup, btnFunction } from "./utils.js";

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

// ESTABLECE LAS CARTAS INICIALES JUNTO CON SUS BOTONES
function setInitialCards() {
  initialCards.forEach(function (tarjeta) {
    new Card(tarjeta.name, tarjeta.link, elmntTemplate, elements);
  });
}

setInitialCards();

// ESTABLECE LOS DETECTORES PARA LOS FORMULARIOS

function addDetectors(formsArray) {
  formsArray.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(".form__popup-input"));
    const spanErrors = new Map();

    inputs.forEach((input) => {
      const errorSpan = form.querySelector(`#${input.id}-error`);
      if (errorSpan) {
        spanErrors.set(input.id, errorSpan);
      }
    });

    const selectorObjt = {
      crntForm: form,
      inputs,
      crntBtn: form.querySelector(".form__save-button"),
      spanErrors,
    };
    const validator = new FormValidator(selectorObjt, null);

    selectorObjt.inputs.forEach((input) => {
      input.addEventListener("input", (evt) => {
        validator.EnableValidation(evt);
      });
    });
  });
}

addDetectors(popupForms);

// AGREGA LOS LISTENERS PARA CERRAR VENTANAS MODALES Y ELEMENTOS ABIERTOS

closeButtons.forEach((button) => {
  button.addEventListener("click", function (evt) {
    let currentPopup = evt.target.closest(".popup");
    if (currentPopup) {
      closePopup(currentPopup);
    }
  });
});

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    popupForms.forEach((form) => {
      if (form.closest(".popup").classList.contains("popup_opened")) {
        const crntPopup = form.closest(".popup");
        closePopup(crntPopup);
      }
    });

    const slctnArr = Array.from(document.querySelectorAll(".element__opened"));

    closeOpndElmnt(slctnArr);
  }
});

document.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }

  if (evt.target.classList.contains("element__opened")) {
    const slctnArr = Array.from(document.querySelectorAll(".element__opened"));

    closeOpndElmnt(slctnArr);
  }
});

// AGREGA LOS DETECTORES PARA ABRIR LOS POPPUPS

editButton.addEventListener("click", function () {
  openPopup(popupForms[0]);
});

addButton.addEventListener("click", function () {
  openPopup(popupForms[1]);
});

const saveBtnList = () => {
  saveButtons.forEach((saveButton) => {
    saveButton.addEventListener("click", btnFunction);
  });
};

saveBtnList();

function initializePopups() {
  const popupForms = [document.forms.profileForm, document.forms.newPlaceForm];
  popupForms.forEach((popup) => {
    if (popup) {
      closePopup(popup.closest(".popup"));
    }
  });
}

// CIERRA POR PRIMERA VEZ LAS VENTANAS MODALES
document.addEventListener("DOMContentLoaded", initializePopups);
window.addEventListener("load", initializePopups);
