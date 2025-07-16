import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitEvt) {
    super(popupSelector);
    this._handleSubmitEvt = handleSubmitEvt;
  }

  _getInputValues(inputSelector) {
    const inputFields = this._popup.querySelectorAll(inputSelector);
    const formValues = {};
    inputFields.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setEventListeners(closeButtonSelector, formSelector, inputSelector) {
    super.setEventListeners(closeButtonSelector);
    this._popup
      .querySelector(formSelector)
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        const inputValues = this._getInputValues(inputSelector);
        this._handleSubmitEvt(evt, inputValues);
      });
  }

  close(openedElementClass, formSelector) {
    super.close(openedElementClass);
    this._popup.querySelector(formSelector).reset();
  }
}
