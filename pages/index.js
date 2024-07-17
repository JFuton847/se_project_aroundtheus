import Card from "../components/card.js";
import Profile from "../components/profile.js"
import Modal from "../components/modal.js"

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const profileData = {
  name: "Jacques Cousteau",
  title: "Explorer",
};


const card = new Card(cardData, "#card-template");
const profile = new Profile(profileData);
const profileEditModal = new Modal("#profile-edit-modal");
const addCardModal = new Modal("#add-card-modal");

card.getView();



// Modals
const imageUrlInput = document.querySelector("#image-url-input");
const profileEditForm = profileEditModal.querySelector("#profile-modal-form");
const addCardForm = addCardModal.querySelector("#add-card-form");
const cardListEl = document.querySelector(".cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardUrlInput = addCardForm.querySelector("#image-url-input");
const previewImageModal = document.querySelector("#preview-image-modal");

// Buttons

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditCloseButton = profileEditModal.querySelector(
  "#profile-edit-close-button"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardCloseButton = addCardModal.querySelector("#add-card-close-button");
const previewImageCloseButton = document.querySelector(
  "#preview-image-close-button"
);

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}


function handleImageClick(name, link) {
  const modalImage = previewImageModal.querySelector("#modal-image");
  const modalTitle = previewImageModal.querySelector(
    "#modal-preview-image-title"
  );
  modalImage.src = link;
  modalImage.alt = name;
  modalTitle.textContent = name;
  previewImageModal.open();
}

function renderCard(cardData, cardListEl) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  cardListEl.prepend(cardElement);
}

addNewCardButton.addEventListener("click", () => addCardModal.open());
// addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profile.handleEditSubmit();
  profileEditModal.close();
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  addCardModal.close();
  cardTitleInput.value = "";
  cardUrlInput.value = "";
}

// function getCardElement(cardData) {
//   // clone the template element with all its content and store it in a cardElement variable
//   const cardElement = cardTemplate.cloneNode(true);
//   // access the card title and image and store them in variables
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   //set the like button
//   const likeButton = cardElement.querySelector(".card__like-button");
//   // find delete button
//   const deleteButton = cardElement.querySelector(".card__delete-button");

//   // add click listener to the cardImageEl element
//   // once clicked, use openModal with previewImageModal (search for it around line 43...type code in to search, dont literally search)

//   cardImageEl.addEventListener("click", () => {
//   const modalImage = previewImageModal.querySelector("#modal-image");
//   const modalTitle = previewImageModal.querySelector(
//     "#modal-preview-image-title"
//   );
//   modalImage.src = cardData.link;
//   modalImage.alt = cardData.name;
//   modalTitle.textContent = cardData.name;
//   openModal(previewImageModal);
// });

//   // previewImageCloseButton.addEventListener("click", () =>
//   //   closeModal(previewImageModal)
//   // );

//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });

//   deleteButton.addEventListener("click", () => {
//     cardElement.remove("card__delete-button_active");
//   });

//   // set the path to the image to the link field of the object
//   cardImageEl.src = cardData.link;
//   // set the image alt text to the name field of the object
//   cardImageEl.alt = cardData.name;
//   // set the card title to the name field of the object, too
//   cardTitleEl.textContent = cardData.name;
//   // return the ready HTML element with the filled-in data
//   return cardElement;
// }

// profileEditButton.addEventListener("click", () => {
//   profileNameInput.value = profileName.textContent;
//   profileTitleInput.value = profileTitle.textContent;
//   openModal(profileEditModal);
// });

profileEditButton.addEventListener("click", () =>  {
  profile.handleEdit();
  closeModal(profileEditModal)
});

profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardModal.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
