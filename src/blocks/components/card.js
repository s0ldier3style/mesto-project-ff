import { cardTemplate } from "../../scripts";

//Функция создания карточки
export const addCard = (cardData, { deleteCard, handleImageClick, likeBtnHandler}) => {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image')
  
    const likeBtn = cardElement.querySelector('.card__like-button');
  
    cardImage.src = cardData.link; 
    cardImage.alt = cardData.name;
   
    cardElement.querySelector(".card__title").textContent = cardData.name;
   
    cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        deleteCard(cardElement);
      });
  
      cardImage.addEventListener('click', () => {
        handleImageClick(cardData.name, cardData.link);
      });
  
      likeBtn.addEventListener('click', () => {
        likeBtnHandler(likeBtn);
      });
  
    return cardElement;
  };

  //Функция события "лайк"
  export function likeBtnHandler(likeBtn) {
    likeBtn.classList.toggle('card__like-button_is-active');
  }

  //Функция удаления карточки
  export  const deleteCard = (cardElement) => {
    cardElement.remove();
  };