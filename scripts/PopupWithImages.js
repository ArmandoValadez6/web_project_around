import Popup from "./Popup.js";

export default class PopupWithImages extends Popup {
  constructor(popupSelector, { imageSelector, captionSelector }) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(imageSelector);
    this._popupCaption = this._popup.querySelector(captionSelector);
  }

  open(
    openedElementClass = "element_opened",
    closedElementClass = "element_closed",
    { name, link }
  ) {
    super.open(openedElementClass);
    this._popup.classList.remove(closedElementClass);
    this._popupImage.src = link;
    this._popupCaption.textContent = name;
    this._popupImage.alt = name;
  }

  close(
    openedElementClass = "element_opened",
    closedElementClass = "element_closed"
  ) {
    super.close(openedElementClass);
    this._popup.classList.add(closedElementClass);
    this._popupImage.src = "";
    this._popupCaption.textContent = "";
    this._popupImage.alt = "";
  }
}
