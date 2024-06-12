import { initialCards } from "./cards.js";
import { createCard, deleteCard, toggleLikeBtn } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getProfileData,
  getCardsData,
  patchProfileData,
  postCardsData,
  deleteCardData,
  putLikeById,
  deleteLikeById,
  changeProfileAvatar,
} from "./components/api.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

// Переменные для обновления аватара пользователя
const editProfileImageBtn = document.querySelector(".profile-image-button");
const editProfileImagePopUp = document.querySelector(
  ".popup_type_edit-profile-image"
);
const editProfileImageForm = document.forms["new-avatar"];
const editProfileImageInput = document.querySelector(
  ".popup__input_type_avatar_url"
);
const profileImage = document.querySelector(".profile__image");

editProfileImageBtn.addEventListener("click", () => {
  clearValidation(editProfileImageForm, validationConfig);
  openModal(editProfileImagePopUp);
});

// Переменные для обновления информации о пользователе
const editProfilePopUp = document.querySelector(".popup_type_edit");
const editCardBtn = document.querySelector(".profile__edit-button");
const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(
  ".popup__input_type_description"
);
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// Переменные для добавления карточек
const createCardBtn = document.querySelector(".profile__add-button");
const createCardPopUp = document.querySelector(".popup_type_new-card");
const createCardForm = document.forms["new-place"];
const cardNameInput = createCardForm.querySelector(
  ".popup__input_type_card-name"
);
const cardUrlInput = createCardForm.querySelector(".popup__input_type_url");
const cardImagePopUp = document.querySelector(".popup_type_image");

function handleImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(cardImagePopUp);
}

// Переменные для открытия изображения карточки
const cardsContainer = document.querySelector(".places__list");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// Переменные для удаления карточки
const deleteCardPopUp = document.querySelector(".popup-delete-card");
const deleteCardFormSubmitBtn = document.querySelector(
  ".popup-delete-card-button"
);
let cardRemoveCandidateId = null;

// Переменная для закрытия модального окна
const popupCloseBtns = document.querySelectorAll(
  ".popup > .popup__content > .popup__close"
);

// Загрузка информации о пользователе и карточек
Promise.all([getProfileData(), getCardsData()])
  .then((values) => {
    profileName.textContent = values[0].name;
    profileJob.textContent = values[0].about;
    profileImage.src = values[0].avatar;

    values[1].forEach((item) => {
      cardsContainer.append(
        createCard(item, values[0]._id, {
          handleDeleteCard,
          handleImageClick,
          toggleLikeBtn,
          putLikeById,
          deleteLikeById,
        })
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Обновление аватара пользователя
function handleProfileImage(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";
  changeProfileAvatar(editProfileImageInput.value)
    .then((data) => {
      profileImage.src = editProfileImageInput.value;
      closeModal(editProfileImagePopUp);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setTimeout(() => {
        submitButton.textContent = "Сохранить";
        editProfileImageInput.value = "";
      }, 600);
    });
}

// Редактирование профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";
  patchProfileData(nameInput.value, jobInput.value)
    .then((data) => {
      profileName.textContent = nameInput.value;
      profileJob.textContent = jobInput.value;
      closeModal(editProfilePopUp);
      submitButton.textContent = "Сохранить";
    })
    .catch((error) => {
      console.log(error);
    });
}

// Добавление новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";
  postCardsData(cardNameInput.value, cardUrlInput.value).then((data) => {
    cardsContainer.prepend(
      createCard(data, data.owner._id, {
        handleDeleteCard,
        handleImageClick,
        toggleLikeBtn,
        putLikeById,
        deleteLikeById,
      })
    );
    closeModal(createCardPopUp);
    createCardForm.reset();
    submitButton.textContent = "Сохранить";
  });
}

// Удаление карточки
deleteCardFormSubmitBtn.addEventListener("click", () => {
  deleteCardFormSubmitBtn.textContent = "Удаление...";
  deleteCardData(cardRemoveCandidateId)
    .then((data) => {
      deleteCard(cardsContainer, cardRemoveCandidateId);
      closeModal(deleteCardPopUp);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setTimeout(() => {
        deleteCardFormSubmitBtn.textContent = "Да";
      }, 600);
    });
});

// Обработчики событий модальных окон
popupCloseBtns.forEach((item) => {
  item.addEventListener("click", () => {
    const popupElement = item.closest(".popup");
    closeModal(popupElement);
  });
});

editCardBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(editProfilePopUp);
});

createCardBtn.addEventListener("click", () => {
  cardNameInput.value = "";
  cardUrlInput.value = "";
  clearValidation(createCardForm, validationConfig);
  openModal(createCardPopUp);
});

document.querySelectorAll(".popup").forEach((item) => {
  item.addEventListener("click", (event) => {
    if (event.target === item) {
      closeModal(event.target);
    }
  });
});

editProfileImageForm.addEventListener("submit", handleProfileImage);

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

createCardForm.addEventListener("submit", handleCardFormSubmit);

function handleDeleteCard(cardElement) {
  openModal(deleteCardPopUp);
  cardRemoveCandidateId = cardElement.dataset.id;
}
