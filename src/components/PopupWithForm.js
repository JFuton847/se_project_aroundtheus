import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".modal__form-input");
    this._submitButton = this._popupForm.querySelector(".modal__save-button");
    this._submitButtonOriginalText = this._submitButton.textContent;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = this._submitButtonOriginalText;
    }
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  open() {
    super.open();
    this.renderLoading(false);
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = this._getInputValues();
      this.renderLoading(true);
      this._handleFormSubmit(formData);
      this.close();
      this._popupForm.reset();
      // this.close();
    });
    // this.renderLoading(false);
    super.setEventListeners();
  }
}

export default PopupWithForm;
