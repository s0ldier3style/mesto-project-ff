
import { initialCards } from "./cards.js";
import {
  addCard,
  deleteCard,
  likeBtnHandler,
} from "../blocks/components/card.js";
import { openModal, closeModal } from "../blocks/components/modal.js";

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

const editProfilePopUp = document.querySelector(".popup_type_edit");
const editCardBtn = document.querySelector(".profile__edit-button");

const addCardBtn = document.querySelector(".profile__add-button");
const addCardPopUp = document.querySelector(".popup_type_new-card");

const addCardForm = document.querySelector("form[name='new-place']");

const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardUrlInput = addCardForm.querySelector(".popup__input_type_url");

const imagePopUp = document.querySelector(".popup_type_image");

initialCards.forEach((item) => {
  cardsContainer.append(
    addCard(item, { deleteCard, handleImageClick, likeBtnHandler })
  );
});

function handleImageClick(name, link) {
  popupImage.src = link;
  popupCaption.textContent = name;
  openModal(imagePopUp);
}

function editProfileFormSubmit(evt) {
  evt.preventDefault(); //
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(editProfilePopUp);
}

function addCardFormSubmit(evt) {
  evt.preventDefault();
  const cardObj = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };
  cardsContainer.prepend(
    addCard(cardObj, { deleteCard, handleImageClick, likeBtnHandler })
  );
  closeModal(addCardPopUp);
}

editCardBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(editProfilePopUp);
});

addCardBtn.addEventListener("click", () => {
  openModal(addCardPopUp);
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup"))
    event.target.classList.remove("popup_is-opened");
});

editProfileForm.addEventListener("submit", editProfileFormSubmit);

addCardForm.addEventListener("submit", addCardFormSubmit);
