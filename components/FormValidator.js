export default class FormValidator {
  constructor(formElement, settings) {
    // assign thing to this object
    this._formEl = formElement;
    this._settings = settings;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _checkInputValidity(inputEl) {
    // pass inputEl to show/hideInputError
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  //REFACTOR

  _hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _hasInvalidInput(inputEls) {
    return inputEls.some((inputEl) => !inputEl.validity.valid);
  }

  _showInputError(inputEl, validationMessage) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  // REFACTOR
  _toggleButtonState(inputEls, submitButton) {
    if (hasInvalidInput(inputEls)) {
      disableButton(submitButton, this._inactiveButtonClass);
    } else {
      enableButton(submitButton, this._inactiveButtonClass);
    }
  }

  disableButton(button) {
    button.classList.add(this._inactiveButtonClass);
    button.disabled = true;
  }

  _enableButton(button) {
    button.classList.remove(this._inactiveButtonClass);
    button.disabled = false;
  }

  _setEventListeners() {
    this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
    this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        // You do have to pass inputEl as an argument
        this._checkInputValidity(inputEl);
        this._toggleButtonState(inputEls, submitButton);
      });
    });

    toggleButtonState(inputEls, submitButton);
  }

  enableValidation() {
    // const formEls = [...document.querySelectorAll(this._formSelector)];
    // formEls.forEach((formEl) => {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmission();
    });

    this._setEventListeners(formElement);
    // look for all inputs inside of form
    // loop through all the inputs to see if all are valid
    // if input not valid
    // get the validation msg
    // add error class to input
    // display error msg
    // disable button
    // if all inputs are valid
    // reset error msgs
    // });
  }
  _handleFormSubmission() {
    // Add logic for successful submission here
    if (!this._hasInvalidInput(this._inputEls)) {
      // Simulate successful submission
      console.log("Form submitted successfully!");

      // Clear the form fields
      this._inputEls.forEach((inputEl) => {
        inputEl.value = "";
        this._hideInputError(inputEl);
      });

      // Disable the submit button
      this._disableButton(this._submitButton);
    }
  }
}
