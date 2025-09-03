import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmitEvt) {
    super(popupSelector);
    this._handleSubmitEvt = handleSubmitEvt;
    this._cardId;
    this._element;
  }

  open(openedElementClass = "popup_opened", cardId, element) {
    super.open(openedElementClass);
    this._cardId = cardId;
    this._element = element;
  }

  setEventListeners(closeButtonSelector, submitButtonSelector) {
    super.setEventListeners(closeButtonSelector);
    this._popup
      .querySelector(submitButtonSelector)
      .addEventListener("click", () => {
        this._handleSubmitEvt(this._cardId, this._element);
        this.close();
      });
  }

  close(openedElementClass = "popup_opened") {
    super.close(openedElementClass);
    this._cardId = undefined;
    this._element = undefined;
  }
}
