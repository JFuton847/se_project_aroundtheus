export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    // opens popup
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    // closes popup
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    //listens for esc button
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
    closeButton.addEventListener("click", () => this.close());
  }
}
