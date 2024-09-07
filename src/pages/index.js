import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import { initialCards, validationSettings } from "../utils/constants.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

// Modals
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const profileNameInput = document.querySelector("#profile-name-input");
const imageUrlInput = document.querySelector("#image-url-input");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector("#profile-modal-form");
const avatarEditModal = document.querySelector("#update-avatar-modal");
const avatarEditForm = avatarEditModal.querySelector("#update-avatar-form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector("#add-card-form");
const cardListEl = document.querySelector(".cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardUrlInput = addCardForm.querySelector("#image-url-input");
const modalDivs = document.querySelectorAll(".modal");
const avatarEditButton = document.querySelector("#avatar-edit-button");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditCloseButton = profileEditModal.querySelector(
  "#profile-edit-close-button"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardCloseButton = addCardModal.querySelector("#add-card-close-button");
const previewImageCloseButton = document.querySelector(
  "#preview-image-close-button"
);

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    return api
      .updateUserProfile({
        name: formData.name,
        about: formData.about,
      })
      .then(() => {
        userInfo.setUserInfo({
          name: formData.name,
          about: formData.about,
        });
        profileEditPopup.close();
      })
      .catch((err) => {
        console.error(`ERROR UPDATING USER PROFILE ${err}`);
      });
  }
);

const newCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  const name = formData.title;
  const link = formData.url;

  return api.createCards({ name, link }).then((cardData) => {
    const cardElement = createCard(cardData);
    section.addItem(cardElement);
  });
});
newCardPopup.setEventListeners();

const editAvatarPopup = new PopupWithForm(
  "#update-avatar-modal",
  (formData) => {
    return api
      .updateAvatar({ avatar: formData.avatar })
      .then((userData) => {
        userInfo.setUserAvatar({ avatar: userData.avatar });
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.error(`ERROR UPDATING AVATAR ${err}`);
      });
  }
);

avatarEditButton.addEventListener("click", () => {
  editAvatarPopup.open();
});

editAvatarPopup.setEventListeners();

addNewCardButton.addEventListener("click", () => newCardPopup.open());
document.querySelector("#profile-edit-button").addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileTitleInput.value = about;
  profileEditPopup.open();
});

const editFormValidator = new FormValidator(
  profileEditForm,
  validationSettings
);
const addFormValidator = new FormValidator(addCardForm, validationSettings);
const avatarFormValidator = new FormValidator(
  avatarEditForm,
  validationSettings
);
addFormValidator.enableValidation();
editFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const handleFormSubmit = (formData) => {
  const name = formData.title;
  const link = formData.url;
  // const avatar = formData.url;
  return api
    .createCards({ name, link })
    .then((cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
      newCardPopup.close();
    })
    .catch((err) => {
      console.error(`ERROR CREATING CARD ${err}`);
    });
};

const handleCardDelete = (cardId, cardElement) => {
  confirmDeletePopup.open(cardId, cardElement);
};

// const newCardPopup = new PopupWithForm("#add-card-modal", handleFormSubmit);
// newCardPopup.setEventListeners();

profileEditPopup.setEventListeners();

const previewImageModal = new PopupWithImage("#preview-image-modal");
previewImageModal.setEventListeners();

function handleImageClick(name, link) {
  previewImageModal.open({ name, link });
}

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  aboutSelector: ".profile__title",
  avatarSelector: ".profile__avatar",
});

function renderCard(cardData, cardListEl) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
}

// NEW VERSION OF DELETION

const confirmDeletePopup = new PopupWithConfirmation(
  ".modal__confirm",
  (cardId, cardElement) => {
    api
      .deleteCard(cardId)
      .then(() => {
        console.log(`Card with id ${cardId} deleted successfully`);
        cardElement.remove(); // Remove the card from the DOM
      })
      .catch((err) => {
        console.error(`ERROR DELETING CARD ${err}`);
      });
  }
);
function handleDeleteClick(cardId, cardElement) {
  confirmDeletePopup.open(cardId, cardElement);
}

function createCard(item) {
  const cardElement = new Card(
    { ...item, isLiked: item.isLiked },
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );
  return cardElement.getView();
}

function handleLikeClick(card) {
  if (card.isLiked) {
    api
      .dislikeACard(card._id)
      .then(() => {
        card.unlikeCard();
        card.isLiked = false;
      })
      .catch((err) => {
        console.error(`ERROR DISLIKING CARD ${err}`);
      });
  } else {
    api
      .likeACard(card._id)
      .then((data) => {
        card.likeCard();
        card.isLiked = true;
      })
      .catch((err) => {
        console.error(`ERROR LIKING CARD ${err}`);
      });
  }
}

function handleLikeIcon(cardId, isLiked) {
  const cardElement = document.querySelector(`[data-id="${cardId}"]`);
  if (cardElement) {
    const card = cardElement.__cardInstance;
    if (
      card &&
      typeof card.likeCard === "function" &&
      typeof card.unlikeCard === "function"
    ) {
      if (isLiked) {
        card.likeCard();
      } else {
        card.unlikeCard();
      }
    }
  }
}

function renderer(item) {
  const cardElement = createCard(item);
  section.addItem(cardElement);
}

let section;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "642370a4-ceb6-4d04-bc83-246d61a4c38e",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((cards) => {
    console.log("Fetched cards:", cards);
    section = new Section({ items: cards.reverse(), renderer }, ".cards");
    section.renderItems();
  })
  .catch((err) => {
    console.error(`ERROR FETCHING CARDS ${err}`);
  });

api
  .getUserInfo()
  .then((userData) => {
    console.log("Fetched user data:", userData);
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });
    userInfo.setUserAvatar({
      avatar: userData.avatar,
    });
  })
  .catch((err) => {
    console.error(`ERROR FETCHING USER INFO ${err}`);
  });
