export default class Card {
  constructor(
    { name, link, _id },
    cardSelector,
    handleImageClick,
    handleDeleteClick
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this.handleDeleteClick = handleDeleteClick;
  }

  _setEventListeners() {
    //".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    //".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    // TODO - add listener for image element
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // getView() {
  //   this._cardElement = document
  //     .querySelector(this._cardSelector)
  //     .content.querySelector(".card")
  //     .cloneNode(true);
  //   // TODO insert the src, alt text, and text content - DONE
  //   this._cardImageEl = this._cardElement.querySelector(".card__image");
  //   this._cardImageEl.src = this._link;
  //   this._cardImageEl.alt = this._name;
  //   this._cardTitleEl = this._cardElement.querySelector(".card__title");
  //   this._cardTitleEl.textContent = this._name;

  //   // set event listeners,
  //   this._setEventListeners();
  //   // TODO return the card
  //   return this._cardElement;
  // }

  _getTemplate() {
    const templateElement = document.querySelector(this._cardSelector);
    if (!templateElement) {
      throw new Error(`Template selector "${this._cardSelector}" not found.`);
    }
    return templateElement.content.querySelector(".card").cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._element.setAttribute("data-id", this._id); // Add the data attribute
    this._setEventListeners();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__title").textContent = this._name;
    return this._element;
  }
}
