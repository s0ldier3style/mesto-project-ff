//Функция открытия модального окна
export function openModal(popup) {
  document.addEventListener("keydown", closeModalByEsc);
  popup.classList.add("popup_is-opened");
}

//Функция закрытия модального окна
export function closeModal(popup) {
  document.removeEventListener("keydown", closeModalByEsc);
  popup.classList.remove("popup_is-opened");
}

//Функция закрытия модального окна на Escape
export function closeModalByEsc(event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}