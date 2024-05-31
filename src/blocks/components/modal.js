//Функция открытия модального окна
export function openModal(popup) {
  document.addEventListener("keydown", closeModalByEsc);
  popup.classList.add("popup_is-opened");
}

//Функция закрытия модального окна
export function closeModal(popup) {
  popup.removeEventListener("keydown", closeModalByEsc);
  popup.classList.remove("popup_is-opened");
}

//Функция закрытия модального окна на Escape
export function closeModalByEsc(event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

// Функция закрытия модального окна по нажатию "Закрыть"
export const popupCloseBtns = document.querySelectorAll(
  ".popup > .popup__content > .popup__close"
);
popupCloseBtns.forEach((item) => {
  item.addEventListener("click", () => {
    const popupElement = item.closest(".popup");
    closeModal(popupElement);
  });
});
