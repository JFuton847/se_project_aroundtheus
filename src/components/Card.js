export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this.handleDeleteClick = handleDeleteClick;
    this.handleLikeClick = handleLikeClick;
    this.isLiked = isLiked;
  }

  _setEventListeners() {
    //".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        this.handleLikeClick(this);
      });
    // (".card__delete-button");
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        // call the function passed as an argument
        // pass this as argument
        this.handleDeleteClick(this._id, this._cardElement);
      });
    // TODO - add listener for image element
    this._cardElement.addEventListener("click", (e) => {
      e.stopPropagation();
      this._handleImageClick(this._name, this._link);
    });
  }

  likeCard() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.add("card__like-button_active");
  }

  unlikeCard() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.remove("card__like-button_active");
  }

  handleLikeIcon(isLiked) {
    if (isLiked !== undefined) {
      this.isLiked = isLiked;
    }
    if (this.isLiked) {
      this.likeCard();
    } else {
      this.unlikeCard();
    }
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getTemplate() {
    const templateElement = document.querySelector(this._cardSelector);
    if (!templateElement) {
      throw new Error(`Template selector "${this._cardSelector}" not found.`);
    }
    return templateElement.content.querySelector(".card").cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardElement.setAttribute("data-id", this._id);
    this._setEventListeners();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardElement.querySelector(".card__title").alt = this._name;
    console.log(this.isLiked);
    this.handleLikeIcon(this.isLiked);

    return this._cardElement;
  }
}
