//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// DOM узлы
const placesList = document.querySelector(".places__list");

//Функция создания карточки
let addCard = (cardData, { deleteCard }) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
      deleteCard(cardElement);
    });

  return cardElement;
};
//Функция удаления карточки
let deleteCard = (cardElement) => {
  let cards = document.querySelectorAll(".card");
  for (let i = 0; i < cards.length; i++) {
    if (cards[i] == cardElement) {
      cards[i].remove();
      break;
    }
  }
};

//Вывести карточки на страницу
initialCards.forEach((item) => {
  placesList.append(addCard(item, { deleteCard }));
});
