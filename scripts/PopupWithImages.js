import Popup from "./Popup.js";

class PopupWithImages extends Popup {
  constructor(popupSelector, { imageSelector, imageCaption }) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(imageSelector);
    this._popupCaption = this._popup.querySelector(imageCaption);
  }

  open(openedElementClass, link, name) {
    super.open(openedElementClass);
    this._popupImage.src = link;
    this._popupCaption.textContent = name;
    this._popupImage.alt = name;
  }

  close(openedElementClass) {
    super.close(openedElementClass);
    this._popupImage.src = "";
    this._popupCaption.textContent = "";
  }
}
