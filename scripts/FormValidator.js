export default class FormValidator {
  constructor(confObjt, valInput) {
    this._confObjt = confObjt;
    this._valInput = valInput;
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
    this._valInput.classList.add("form__input_type_error");
    errorSpan.textContent = this._valInput.validationMessage;
    errorSpan.style.display = "block";
  }

  _HideInputError() {
    const errorSpan = this._confObjt.spanErrors.get(this._valInput.id);
    this._valInput.classList.remove("form__input_type_error");
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
}
