let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close-button");
let inputName = document.querySelector(".form__input-nombre");
let inputOccupation = document.querySelector(".form__input-acerca-de-mi");
let saveButton = document.querySelector(".form__save-button");
let userName = document.querySelector(".profile__user-name");
let userOccupation = document.querySelector(".profile__user-occupation");
const elements = document.querySelector(".elements");

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
    const elementsTemplate =
      document.querySelector("#elements-template").content;
    const elementsSingle = elementsTemplate
      .querySelector(".elements__single")
      .cloneNode("true");

    elementsSingle.querySelector(".elements__image").src = card.link;
    elementsSingle.querySelector(".elements__image").alt = card.name;
    elementsSingle.querySelector(".elements__name").textContent = card.name;

    elements.append(elementsSingle);

    if (card.name == "Traper Creek, Ak") {
      elementsSingle
        .querySelector(".elements__image")
        .classList.add("elements__image-extended");
      return;
    }
  });
}

setInitialCards();

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
