export default class FormValidator {
  constructor(confObjt, valInput, errorMesageClass) {
    this._confObjt = confObjt;
    this._valInput = valInput;
    this._errorMesageClass = errorMesageClass;
  }

  EnableValidation(evt) {
    this._valInput = evt.target;
    if (!this._valInput.validity.valid) {
      this._ShowInputError();
    } else {
      this._HideInputError();
    }

    const validForm = this._confObjt.inputs.every(
      (input) => input.validity.valid
    );

    this._ToggleSaveButton(validForm);
  }

  _ShowInputError() {
    const errorSpan = this._confObjt.spanErrors.get(this._valInput.id);
    this._valInput.classList.add(this._errorMesageClass);
    errorSpan.textContent = this._valInput.validationMessage;
    errorSpan.style.display = "block";
  }

  _HideInputError() {
    const errorSpan = this._confObjt.spanErrors.get(this._valInput.id);
    this._valInput.classList.remove(this._errorMesageClass);
    errorSpan.textContent = "";
    errorSpan.style.display = "none";
  }

  _ToggleSaveButton(validForm) {
    if (validForm) {
      this._confObjt.crntBtn.removeAttribute("disabled");
    } else {
      this._confObjt.crntBtn.setAttribute("disabled", "");
    }
  }

  resetValidation() {
    this._confObjt.inputs.forEach((input) => {
      this._valInput = input;
      this._HideInputError();
    });
    this._ToggleSaveButton(false);
  }
}
