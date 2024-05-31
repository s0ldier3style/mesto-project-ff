
import { initialCards } from "./cards.js";
import {
  createCard,
  deleteCard,
  toggleLikeBtn,
} from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

export const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const editProfileForm = document.querySelector("form[name='edit-profile']");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(
  ".popup__input_type_description"
);

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const popupCloseBtns = document.querySelectorAll(
  ".popup > .popup__content > .popup__close");

const editProfilePopUp = document.querySelector(".popup_type_edit");
const editCardBtn = document.querySelector(".profile__edit-button");

const createCardBtn = document.querySelector(".profile__add-button");
const createCardPopUp = document.querySelector(".popup_type_new-card");

const createCardForm = document.querySelector("form[name='new-place']");

const cardNameInput = createCardForm.querySelector(".popup__input_type_card-name");
const cardUrlInput = createCardForm.querySelector(".popup__input_type_url");

const imagePopUp = document.querySelector(".popup_type_image");

initialCards.forEach((item) => {
  cardsContainer.append(
    createCard(item, { deleteCard, handleImageClick, toggleLikeBtn })
  );
});

function handleImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopUp);
}

function editProfileFormSubmit(evt) {
  evt.preventDefault(); //
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(editProfilePopUp);
}

function createCardFormSubmit(evt) {
  evt.preventDefault();
  const cardObj = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };
  cardsContainer.prepend(
    createCard(cardObj, { deleteCard, handleImageClick, toggleLikeBtn }));
    
  closeModal(createCardPopUp);
  cardNameInput.value = '';
  cardUrlInput.value = '';
}

popupCloseBtns.forEach((item) => {
  item.addEventListener("click", () => {
    const popupElement = item.closest(".popup");
    closeModal(popupElement);
  });
});

editCardBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(editProfilePopUp);
});

createCardBtn.addEventListener("click", () => {
  openModal(createCardPopUp);
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup"))
    event.target.classList.remove("popup_is-opened");
});

editProfileForm.addEventListener("submit", editProfileFormSubmit);

createCardForm.addEventListener("submit", createCardFormSubmit);
