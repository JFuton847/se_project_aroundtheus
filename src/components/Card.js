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
        this.handleDeleteClick(this._id);
      });
    // TODO - add listener for image element
    this._cardElement.addEventListener("click", (e) => {
      e.stopPropagation();
      this._handleImageClick(this._name, this._link);
    });
  }

  // make this a public method
  // handleLikeIcon(isLiked) {
  //   if (isLiked) {
  //     this._cardElement
  //       .querySelector(".card__like-button")
  //       .classList.add("card__like-button_active");
  //   } else {
  //     this._cardElement
  //       .querySelector(".card__like-button")
  //       .classList.remove("card__like-button_active");
  //   }
  // }

  // Use after successful like response (in a .then)
  likeCard() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.add("card__like-button_active");
  }
  // use after successful unlike response (in a .then)
  unlikeCard() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.remove("card__like-button_active");
  }

  // use where it is
  handleLikeIcon(isLiked) {
    if (isLiked !== undefined) {
      this.isLiked = isLiked;
    }
    if (this.isLiked) {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.add("card__like-button_active");
    } else {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.remove("card__like-button_active");
    }
  }

  //1st version of handleLikeClick
  // _handleLikeClick(cardId, isLiked) {
  //   if (isLiked) {
  //     api.dislikeACard(cardId).then((data) => {
  //       this._updateLikes(data.likes);
  //     });
  //   } else {
  //     api.likeACard(cardId).then((data) => {
  //       this._updateLikes(data.likes);
  //     });
  //   }
  // }

  //2nd version of handleLikeClick
  // handleLikeClick(cardId, isLiked) {
  //   if (isLiked) {
  //     api.dislikeACard(cardId).then(() => {
  //       if (Array.isArray(data.likes)) {
  //         this._updateLikes(data.likes);
  //       } else {
  //         console.error("Invalid data format for likes:", !isLiked);
  //       }
  //     });
  //   } else {
  //     api.likeACard(cardId).then((data) => {
  //       if (Array.isArray(data.likes)) {
  //         this._updateLikes(data.likes);
  //       } else {
  //         console.error("Invalid data format for likes:", !isLiked);
  //       }
  //     });
  //   }
  // }

  // _handleLikeClick(cardId, isLiked) {
  //   cardId._toggleLikeButton();
  // }

  // _updateLikes(likes) {
  //   this._likes = likes;
  //   this._cardElement.querySelector(".card__like-count").textContent =
  //     likes.length;
  //   this._cardElement
  //     .querySelector(".card__like-button")
  //     .classList.toggle(
  //       "card__like-button_active",
  //       this._likes.includes(this._id)
  //     );
  //   this._handleLikeIcon();
  // }

  // turn into public method and call it after succesful delete request
  handleDeleteCard() {
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
    this._cardElement = this._getTemplate();
    this._cardElement.setAttribute("data-id", this._id);
    this._setEventListeners();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    console.log(this.isLiked);
    this.handleLikeIcon(this.isLiked);

    return this._cardElement;
  }
}
