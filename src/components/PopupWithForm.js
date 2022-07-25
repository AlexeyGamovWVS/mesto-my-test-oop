import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popup, submitCallback}) {
    super(popup);
    this._form = this._popup.querySelector('#form');
    this._onSubmit = submitCallback;
  }

  _getInputValues() {
    this._inputs = this._form.querySelectorAll('.popup__item');
    this._inputsValues = [];
    this._inputs.forEach((input, index) => {this._inputsValues[index] = input.value});
    return this._inputsValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._onSubmit(this._getInputValues(), this._form);
    })
  }

  getForm() {
    return this._form;
  }
}