const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupForms = [document.forms.profileForm, document.forms.newPlaceForm];
const closeButtons = document.querySelectorAll(".popup__close-button");
const saveButtons = document.querySelectorAll(".form__save-button");
let userName = document.querySelector(".profile__user-name");
let userOccupation = document.querySelector(".profile__user-occupation");
let elements = document.querySelector(".elements");
const elementTemplate = document.querySelector("#element-template").content;

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
  initialCards.forEach(function (card) {
    let elementSingle = elementTemplate
      .querySelector(".element__single")
      .cloneNode(true);

    elementSingle.querySelector(".element__image").src = card.link;
    elementSingle.querySelector(".element__image").alt = card.name;
    elementSingle.querySelector(".element__name").textContent = card.name;

    elements.append(elementSingle);

    let elementOpened = elementTemplate
      .querySelector(".element__opened")
      .cloneNode(true);

    elementOpened.querySelector(".element__image-expanded").src = card.link;
    elementOpened.querySelector(".element__image-expanded").alt = card.name;
    elementOpened.querySelector(".element__image-caption").textContent =
      card.name;
    elementOpened.id = card.name.replace(/[^a-zA-Z0-9]/g, "-");

    elements.append(elementOpened);

    /*deleteElementButtons(elementSingle);
    likeElementButtons(elementSingle);
    openElementButtons(elementSingle);
    closeElementButtons(elementOpened);*/
  });
}

setInitialCards();

// AGREGA LAS FUNCIONES PARA CERRAR LOS POPUPS
function closePopup(form) {
  let currentPopup = form.closest(".popup");
  if (currentPopup) {
    currentPopup.classList.remove("popup_opened");
  }
}

popupForms.forEach((popup) => closePopup(popup));

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
        form.closest(".popup").classList.remove("popup_opened");
      }
    });
  }
});

document.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup")) {
    const form = evt.target.querySelector("form");
    closePopup(form);
  }
});

//AGREGA LAS FUNCIONES PARA ABRIR LOS POPUPS

function openPopup(form) {
  resetErrorMessages(form.querySelectorAll(".form__error_visible"));
  cleanErrorBorder(form.querySelectorAll(".form__popup-input"));

  let currentPopup = form.closest(".popup");
  if (!currentPopup) return;

  currentPopup.classList.toggle("popup_opened");
  if (form.name === "profileForm") {
    form.elements.personName.value = userName.textContent;
    form.elements.personJob.value = userOccupation.textContent;
  } else {
    form.reset();
    form.reset();
  }
}

editButton.addEventListener("click", function () {
  openPopup(popupForms[0]);
});

addButton.addEventListener("click", function () {
  openPopup(popupForms[1]);
});

const resetErrorMessages = (errorMessagesArr) => {
  errorMessagesArr.forEach((message) => {
    message.style.display = "none";
  });
};

const cleanErrorBorder = (inputsArr) => {
  inputsArr.forEach((input) => {
    input.classList.remove("form__input_type_error");
  });
};

//EJECUTA LA VALIDACION DE LOS FORMULARIOS

function addDetectors(formsArray) {
  formsArray.forEach((form) => {
    const inputsList = form.querySelectorAll(".form__popup-input");
    inputsList.forEach((input) => {
      input.addEventListener("input", function () {
        checkValidity(form, input);
      });
    });
  });
}

addDetectors(popupForms);

const checkValidity = (form, element) => {
  if (!element.validity.valid) {
    showInputError(form, element, element.validationMessage);
  } else {
    hideInputError(form, element);
  }
};

function showInputError(form, element, errorMessage) {
  const errorElement = element;
  errorElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input_type_error");
}

/*let currentSaveButton = form.querySelector(".form__save-button");
if (currentSaveButton) {
  currentSaveButton.setAttribute("disabled", "");
}*/

//REALIZA LA VALIDACION DE LOS INPUTS DE LOS POPUPS

/*popupInputs.forEach((inputField) => {
  inputField.addEventListener("keyup", function (evt) {
    let form = evt.target.closest(".form");
    if (!form) return;

    let currentButton = form.querySelector(".form__save-button");
    if (!currentButton) return;

    let currentFormInputs = form.querySelectorAll(".form__popup-input");

    if (
      currentFormInputs[0].value !== "" ||
      currentFormInputs[1].value !== ""
    ) {
      currentButton.removeAttribute("disabled");
    } else {
      currentButton.setAttribute("disabled", "");
    }
  });
});*/

/*saveButtons.forEach((saveButton) => {
  saveButton.addEventListener("click", function (evt) {
    let form = evt.target.closest(".form");
    if (!form) return;

    let currentButton = form.querySelector(".form__save-button");
    if (!currentButton) return;

    let currentFormInputs = form.querySelectorAll(".form__popup-input");
    let popup = form.closest(".popup");

    if (evt.target.id === "guarda") {
      if (
        currentFormInputs[0].value !== "" &&
        currentFormInputs[1].value !== ""
      ) {
        userName.textContent = currentFormInputs[0].value;
        userOccupation.textContent = currentFormInputs[1].value;
      } else if (currentFormInputs[0].value !== "") {
        userName.textContent = currentFormInputs[0].value;
      } else {
        userOccupation.textContent = currentFormInputs[1].value;
      }

      if (popup) {
        closePopup(popup);
      }
    } else {
      if (
        currentFormInputs[0].value !== "" &&
        currentFormInputs[1].value !== ""
      ) {
        let elementSingle = elementTemplate
          .querySelector(".element__single")
          .cloneNode(true);

        elementSingle.querySelector(".element__image").src =
          currentFormInputs[1].value;
        elementSingle.querySelector(".element__image").alt =
          currentFormInputs[0].value;
        elementSingle.querySelector(".element__name").textContent =
          currentFormInputs[0].value;

        elements.prepend(elementSingle);

        let elementOpened = elementTemplate
          .querySelector(".element__opened")
          .cloneNode(true);

        elementOpened.querySelector(".element__image-expanded").src =
          currentFormInputs[1].value;
        elementOpened.querySelector(".element__image-expanded").alt =
          currentFormInputs[0].value;
        elementOpened.querySelector(".element__image-caption").textContent =
          currentFormInputs[0].value;
        elementOpened.id = currentFormInputs[0].value.replace(
          /[^a-zA-Z0-9]/g,
          "-"
        );

        elements.append(elementOpened);

        /*deleteElementButtons(elementSingle);
        likeElementButtons(elementSingle);
        openElementButtons(elementSingle);
        closeElementButtons(elementOpened);*/
/*} else if (currentFormInputs[0].value == "") {
        alert("Falta la URL de la imagen");
      } else {
        alert("Falta el nombre de la imagen");
      }
    }

    if (popup) {
      closePopup(popups[1]);
    }
  });
});*/

// AGREGAR FUNCIONES PARA LOS DISTINTOS BOTONES DE LOS ELEMENTOS SINGLE Y OPENED
/*const openElementButtons = (toOpenElement) => {
  let imageButton = toOpenElement.querySelector(".element__image-button");

  imageButton.addEventListener("click", function (evt) {
    let selectedElement = evt.target.closest(".element__single");
    let elementId = selectedElement.querySelector(".element__image").alt;
    let normalizedId = elementId.replace(/[^a-zA-Z0-9]/g, "-");

    let openElement = elements.querySelector(`#${normalizedId}`);

    if (openElement) {
      openElement.style.display = "block";
    } else {
      console.error("Elemento no encontrado");
    }
  });
};

const closeElementButtons = (toCloseElement) => {
  let closeElementButton = toCloseElement.querySelector(
    ".element__close-button"
  );

  closeElementButton.addEventListener("click", function (evt) {
    let currentElement = evt.target.closest(".element__opened");
    if (!currentElement) return;

    currentElement.style.display = "none";
  });
};

const deleteElementButtons = (toDeleteElement) => {
  const deleteButton = toDeleteElement.querySelector(".element__delete-button");

  deleteButton.addEventListener("click", function (evt) {
    let elementSelected = evt.target.closest(".element__single");
    if (!elementSelected) return;

    elementSelected.remove();
  });
};

elements.addEventListener("click", function (evt) {
  if (evt.target.closest(".element__like-button")) {
    let likeButton = evt.target.closest(".element__like-button");
    let likeIcon = likeButton.querySelector(".element__like-button-icon");

    if (likeIcon.textContent === "🤍") {
      likeIcon.textContent = "🖤";
    } else {
      likeIcon.textContent = "🤍";
    }
  }
});*/
