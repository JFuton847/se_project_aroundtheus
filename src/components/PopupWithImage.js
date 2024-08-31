import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = document.querySelector("#modal-image");
    this._caption = document.querySelector("#modal-preview-image-title");
  }

  open(data) {
    this._image.src = data.link;
    this._image.alt = data.name;
    this._caption.textContent = data.name;
    super.open();
  }
}

export default PopupWithImage;
