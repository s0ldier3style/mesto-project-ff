//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// DOM узлы
const cardsContainer = document.querySelector(".places__list");

//Функция создания карточки
const addCard = (cardData, { deleteCard }) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image')
  cardImage.src = cardData.link; 
  cardImage.alt = cardData.name;
 
  cardElement.querySelector(".card__title").textContent = cardData.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
      deleteCard(cardElement);
    });

  return cardElement;
};
//Функция удаления карточки
const deleteCard = (cardElement) => {
  cardElement.remove();
};

//Вывести карточки на страницу
initialCards.forEach((item) => {
  cardsContainer.append(addCard(item, { deleteCard }));
});
