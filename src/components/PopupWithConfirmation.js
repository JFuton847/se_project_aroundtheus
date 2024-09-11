import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._confirmButton = document.querySelector(
      ".modal__save-button_confirmation"
    );
    this._setEventListeners();
  }

  open(cardId, cardElement) {
    super.open();
    this._cardId = cardId;
    this._cardElement = cardElement;
  }

  _setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this._handleConfirm(this._cardId, this._cardElement)
        .then(() => {
          this.close();
        })
        .catch((err) => {
          console.error("Error Deleting Cards:", err);
        });
    });
  }
}

export default PopupWithConfirmation;
