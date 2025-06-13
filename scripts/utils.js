// AGREGA LAS FUNCIONES PARA CERRAR LOS POPUPS Y ELEMENTOS ABIERTOS
import { userName, userOccupation, elmntTemplate, elements } from "./index.js";
import Card from "./Card.js";

export function closePopup(currentPopup) {
  if (currentPopup) {
    currentPopup.classList.remove("popup_opened");
  }
}

export function closeOpndElmnt(slctnArr) {
  slctnArr.forEach((element) => {
    element.style.display = "none";
  });
}

//AGREGA LAS FUNCIONES PARA ABRIR LOS POPUPS

export function openPopup(form) {
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
    const currentButton = form.querySelector(".form__save-button");
    currentButton.setAttribute("disabled", "");
  }
}

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

//EJECUTA LA FUNCION DE LOS BOTONES GUARDAR Y CREAR

export function btnFunction(event) {
  const form = event.target.closest(".form");
  const currentFormInputs = form.querySelectorAll(".form__popup-input");

  if (event.target.id === "guarda") {
    userName.textContent = currentFormInputs[0].value;
    userOccupation.textContent = currentFormInputs[1].value;
  } else {
    new Card(
      currentFormInputs[0].value,
      currentFormInputs[1].value,
      elmntTemplate,
      elements
    );
  }
  if (form) {
    const crntPopup = form.closest(".popup");
    closePopup(crntPopup);
  }
}
