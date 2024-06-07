(()=>{"use strict";var e=function(e,t){var n=t.deleteCard,o=t.handleImageClick,r=t.toggleLikeBtn,c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),p=c.querySelector(".card__image"),u=c.querySelector(".card__like-button");return p.src=e.link,p.alt=e.name,c.querySelector(".card__title").textContent=e.name,c.querySelector(".card__delete-button").addEventListener("click",(function(){n(c)})),p.addEventListener("click",(function(){o(e.name,e.link)})),u.addEventListener("click",(function(){r(u)})),c};function t(e){e.classList.toggle("card__like-button_is-active")}var n=function(e){e.remove()};function o(e){document.addEventListener("keydown",c),e.classList.add("popup_is-opened")}function r(e){document.removeEventListener("keydown",c),e.classList.remove("popup_is-opened")}function c(e){"Escape"===e.key&&r(document.querySelector(".popup_is-opened"))}var p=document.querySelector(".places__list"),u=document.querySelector(".popup__image"),d=document.querySelector(".popup__caption"),l=document.forms["edit-profile"],a=l.querySelector(".popup__input_type_name"),i=l.querySelector(".popup__input_type_description"),s=document.querySelector(".profile__title"),_=document.querySelector(".profile__description"),m=document.querySelectorAll(".popup > .popup__content > .popup__close"),y=document.querySelector(".popup_type_edit"),f=document.querySelector(".profile__edit-button"),v=document.querySelector(".profile__add-button"),k=document.querySelector(".popup_type_new-card"),g=document.forms["new-place"],q=g.querySelector(".popup__input_type_card-name"),S=g.querySelector(".popup__input_type_url"),L=document.querySelector(".popup_type_image");function h(e,t){u.src=t,u.alt=e,d.textContent=e,o(L)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(o){p.append(e(o,{deleteCard:n,handleImageClick:h,toggleLikeBtn:t}))})),m.forEach((function(e){e.addEventListener("click",(function(){r(e.closest(".popup"))}))})),f.addEventListener("click",(function(){a.value=s.textContent,i.value=_.textContent,o(y)})),v.addEventListener("click",(function(){o(k)})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){t.target===e&&r(t.target)}))})),l.addEventListener("submit",(function(e){e.preventDefault(),s.textContent=a.value,_.textContent=i.value,r(y)})),g.addEventListener("submit",(function(o){console.log(o.target),o.preventDefault();var c={name:q.value,link:S.value};p.prepend(e(c,{deleteCard:n,handleImageClick:h,toggleLikeBtn:t})),r(k),g.reset()}))})();