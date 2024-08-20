import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import { initialCards, validationSettings } from "../utils/constants.js";
import Section from "../components/Section.js";

// Modals
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const profileNameInput = document.querySelector("#profile-name-input");
const imageUrlInput = document.querySelector("#image-url-input");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector("#profile-modal-form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector("#add-card-form");
const cardListEl = document.querySelector(".cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardUrlInput = addCardForm.querySelector("#image-url-input");
const modalDivs = document.querySelectorAll(".modal");

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
    userInfo.setUserInfo({
      name: formData["name"],
      title: formData["title"],
    });
    profileEditPopup.close();
  }
);

addNewCardButton.addEventListener("click", () => newCardPopup.open());
document.querySelector("#profile-edit-button").addEventListener("click", () => {
  const { name, title } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileTitleInput.value = title;
  profileEditPopup.open();
});

const editFormValidator = new FormValidator(
  profileEditForm,
  validationSettings
);
const addFormValidator = new FormValidator(addCardForm, validationSettings);
addFormValidator.enableValidation();
editFormValidator.enableValidation();

const handleFormSubmit = (formData) => {
  const name = formData.title;
  const link = formData.url;
  const cardElement = createCard({ name, link });
};

const newCardPopup = new PopupWithForm("#add-card-modal", handleFormSubmit);
newCardPopup.setEventListeners();

profileEditPopup.setEventListeners();

const previewImageModal = new PopupWithImage("#preview-image-modal");
previewImageModal.setEventListeners();

function handleImageClick(name, link) {
  previewImageModal.open({ name, link });
}

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  titleSelector: ".profile__title",
});

function renderCard(cardData, cardListEl) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
}

function createCard(item) {
  const cardElement = new Card(item, "#card-template", handleImageClick);
  // new stuff
  return cardElement.getView();
}

const section = new Section({ items: initialCards, renderer }, ".cards");

function renderer(item) {
  const cardElement = createCard(item);
  section.addItem(cardElement);
}

section.renderItems();
