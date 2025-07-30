export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open(openedElementClass = "popup_opened") {
    this._popup.classList.add(openedElementClass);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close(openedElementClass = "popup_opened") {
    this._popup.classList.remove(openedElementClass);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners(closeButtonSelector) {
    this._popup
      .querySelector(closeButtonSelector)
      .addEventListener("click", () => {
        this.close();
      });

    this._popup.addEventListener("click", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}
