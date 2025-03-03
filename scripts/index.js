const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
let popups = document.querySelectorAll(".popup");
let closeButtons = document.querySelectorAll(".popup__close-button");
let saveButtons = document.querySelectorAll(".form__save-button");
let popupInputs = document.querySelectorAll(".form__popup-input");
let userName = document.querySelector(".profile__user-name");
let userOccupation = document.querySelector(".profile__user-occupation");
let elements = document.querySelector(".elements");

const intialCards = [
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

function setInitialCards() {
  intialCards.forEach(function (card) {
    const elementTemplate = document.querySelector("#element-template").content;
    const elementSingle = elementTemplate
      .querySelector(".element__single")
      .cloneNode(true);

    elementSingle.querySelector(".element__image").src = card.link;
    elementSingle.querySelector(".element__image").alt = card.name;
    elementSingle.querySelector(".element__name").textContent = card.name;

    elements.append(elementSingle);

    const elementOpened = elementTemplate
      .querySelector(".element__opened")
      .cloneNode(true);

    elementOpened.querySelector(".element__image-expanded").src = card.link;
    elementOpened.querySelector(".element__image-expanded").alt = card.name;
    elementOpened.querySelector(".element__image-caption").textContent =
      card.name;
    elementOpened.id = card.name.replace(/[^a-zA-Z0-9]/g, "-");

    elements.append(elementOpened);
  });

  let imageButtons = document.querySelectorAll(".element__image-button");

  imageButtons.forEach((imageButton) => {
    imageButton.addEventListener("click", function (evt) {
      let pressedButton = evt.currentTarget;

      let elementId = pressedButton.querySelector(".element__image").alt;
      const normalizedId = elementId.replace(/[^a-zA-Z0-9]/g, "-");

      let selectedElement = elements.querySelector(`#${normalizedId}`);

      if (selectedElement) {
        selectedElement.style.display = "block";
      } else {
        console.error("Elemento no encontrado");
      }
    });
  });

  let closeElementButtons = document.querySelectorAll(".element__close-button");

  closeElementButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", function (evt) {
      let currentElement = evt.target.closest(".element__opened");
      if (!currentElement) return;

      currentElement.style.display = "none";
    });
  });
}

setInitialCards();

let deleteButtons = document.querySelectorAll(".element__delete-button");

deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", function (evt) {
    let elementSingle = evt.target.closest(".element__single");
    if (!elementSingle) return;

    elementSingle.remove();
  });
});

function closePopup(popup) {
  popup.classList.remove("popup_opened");

  let inputs = popup.querySelectorAll(".form__popup-input");
  inputs.forEach((item) => (item.value = ""));

  let saveButton = popup.querySelector(".form__save-button");
  saveButton.setAttribute("disabled", "");
}

closePopup(popups[0]);
closePopup(popups[1]);

function openPopup(popup) {
  popup.classList.toggle("popup_opened");
}

editButton.addEventListener("click", function () {
  openPopup(popups[0]);
});

addButton.addEventListener("click", function () {
  openPopup(popups[1]);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", function (evt) {
    let popup = evt.target.closest(".popup");
    if (popup) {
      closePopup(popup);
    }
  });
});

popupInputs.forEach((inputField) => {
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
});

saveButtons.forEach((saveButton) => {
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
        const elementTemplate =
          document.querySelector("#element-template").content;
        const elementSingle = elementTemplate
          .querySelector(".element__single")
          .cloneNode(true);

        elementSingle.querySelector(".element__image").src =
          currentFormInputs[1].value;
        elementSingle.querySelector(".element__image").alt =
          currentFormInputs[0].value;
        elementSingle.querySelector(".element__name").textContent =
          currentFormInputs[0].value;

        elements.prepend(elementSingle);

        const newDeleteButton = elementSingle.querySelector(
          ".element__delete-button"
        );
        newDeleteButton.addEventListener("click", function (evt) {
          let elementSingle = evt.target.closest(".element__single");
          if (!elementSingle) return;
          elementSingle.remove();
        });

        //agregar cartas abiertas

        const elementOpened = elementTemplate
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

        //agregar botones de apertura en cartas nuevas

        let imageButton = elementSingle.querySelector(".element__image-button");
        imageButton.addEventListener("click", function (evt) {
          let selectElement = evt.target.closest(".element__single");
          let elementId = selectElement.querySelector(".element__image").alt;
          let normalizedId = elementId.replace(/[^a-zA-Z0-9]/g, "-");

          let openElement = elements.querySelector(`#${normalizedId}`);

          if (openElement) {
            openElement.style.display = "block";
          } else {
            console.error("Elemento no encontrado");
          }
        });

        // agregar boton de cerrado de carta nueva

        let closeElementButton = elementOpened.querySelector(
          ".element__close-button"
        );

        closeElementButton.addEventListener("click", function (evt) {
          let currentElement = evt.target.closest(".element__opened");
          if (!currentElement) return;

          currentElement.style.display = "none";
        });

        // desplegar mensajes de alarma si no estan llenos los datos
      } else if (currentFormInputs[0].value == "") {
        alert("Falta la URL de la imagen");
      } else {
        alert("Falta el nombre de la imagen");
      }
    }

    if (popup) {
      closePopup(popup);
    }
  });
});

// agregar funcion de boton de me gusta

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
});
