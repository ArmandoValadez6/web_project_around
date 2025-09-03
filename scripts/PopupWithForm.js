import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitEvt, formSelector, formValidator) {
    super(popupSelector);
    this._handleSubmitEvt = handleSubmitEvt;
    this._formSelector = formSelector;
    this._formValidator = formValidator;
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
        this._handleSubmitEvt(inputValues, this._popup);
      });
  }

  close() {
    super.close();
    this._popup.querySelector(this._formSelector).reset();

    if (this._formValidator) {
      this._formValidator.resetValidation();
    }
  }
}
