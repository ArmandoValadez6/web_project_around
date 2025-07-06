export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
  }

  open() {}

  close() {}

  _handleEscClose() {}

  setEventListeners() {
    this._selector
      .querySelector(".popup__close-button")
      .addEventListener("click", this.close());
  }
}
