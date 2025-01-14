let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close-button");
let inputName = document.querySelector(".form__input-nombre");
let inputOccupation = document.querySelector(".form__input-acerca-de-mi");
let saveButton = document.querySelector(".form__save-button");
let userName = document.querySelector(".profile__user-name");
let userOccupation = document.querySelector(".profile__user-occupation");

function closePopup() {
  popup.classList.remove("popup_opened");
  inputName.value = "";
  inputOccupation.value = "";
  saveButton.setAttribute("disabled", "");
}

closePopup();

function openPopup() {
  popup.classList.toggle("popup_opened");
}

editButton.addEventListener("click", openPopup);

closeButton.addEventListener("click", closePopup);

function enableSaveButton() {
  if (inputName.value != "" || inputOccupation.value != "") {
    saveButton.removeAttribute("disabled", "");
  } else {
    saveButton.setAttribute("disabled", "");
  }
}

inputName.addEventListener("keyup", enableSaveButton);
inputOccupation.addEventListener("keyup", enableSaveButton);

function changeProfileData() {
  if (inputName.value != "" && inputOccupation.value != "") {
    userName.textContent = inputName.value;
    userOccupation.textContent = inputOccupation.value;
  } else if (inputName.value != "") {
    userName.textContent = inputName.value;
  } else {
    userOccupation.textContent = inputOccupation.value;
  }
  closePopup();
}

saveButton.addEventListener("click", changeProfileData);
