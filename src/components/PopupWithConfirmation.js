import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".modal__save-button");
    this._handleConfirm = handleConfirm;
  }

  open(cardId, cardElement) {
    this._cardId = cardId;
    this._cardElement = cardElement;
    super.open();
  }

  setEventListeners() {
    this._confirmButton.addEventListener("click", () => {
      this._handleConfirm(this._cardId, this._cardElement);
      this.close();
    });
    super.setEventListeners();
  }
}

export default PopupWithConfirmation;
