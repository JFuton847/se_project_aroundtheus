import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleCardFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleCardFormSubmit = handleCardFormSubmit;
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

  disableSubmitButton() {
    this._submitButton.disabled = true;
  }

  enableSubmitButton() {
    this._submitButton.disabled = false;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = this._getInputValues();
      this.renderLoading(true);
      this.disableSubmitButton();
      this._handleCardFormSubmit(formData)
        .then(() => {
          console.log(`Success:`, formData);
          this.close();
          this._popupForm.reset();
        })
        .catch((err) => {
          console.error(`ERROR DURING FORM SUBMISSION: ${err}`);
        })
        .finally(() => {
          this.renderLoading(false);
          this.enableSubmitButton();
        });
    });
    super.setEventListeners();
  }
}

export default PopupWithForm;
