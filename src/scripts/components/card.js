//Функция создания карточки
export const createCard = (
  cardData,
  userId = null,
  {
    handleDeleteCard,
    handleImageClick,
    toggleLikeBtn,
    putLikeById,
    deleteLikeById,
  }
) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const likeBtn = cardElement.querySelector(".card__like-button");
  const likesSum = cardElement.querySelector(".likes-sum");
  const deleteCardBtn = cardElement.querySelector(".card__delete-button");

  cardElement.dataset.id = cardData._id;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  likesSum.textContent = cardData.likes.length;

  const isLiked = cardData.likes.some((person) => person._id === userId);
  if (isLiked) toggleLikeBtn(likeBtn);
  likeBtn.dataset.likeStatus = isLiked;

  cardElement.querySelector(".card__title").textContent = cardData.name;

  // Проверка на пользователя перед удалением карточки
  if (userId && userId == cardData.owner._id) {
    deleteCardBtn.addEventListener("click", () => {
      handleDeleteCard(cardElement);
    });
  } else {
    deleteCardBtn.remove();
  }

  cardImage.addEventListener("click", () => {
    handleImageClick(cardData.name, cardData.link);
  });

  // Отображение количества лайков карточки
  likeBtn.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("card__like-button_is-active")) {
      deleteLikeById(cardData._id)
        .then((data) => {
          likesSum.textContent = data.likes.length;
          toggleLikeBtn(evt.target);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      putLikeById(cardData._id).then((data) => {
        likesSum.textContent = data.likes.length;
        toggleLikeBtn(evt.target);
      });
    }
  });

  return cardElement;
};

//Функция события "лайк"
export function toggleLikeBtn(likeBtn) {
  likeBtn.classList.toggle("card__like-button_is-active");
}

//Функция удаления карточки
export const deleteCard = (cardsContainer, id) => {
  cardsContainer.querySelector(`li[data-id = "${id}"]`).remove();
};
