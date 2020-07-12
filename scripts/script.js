let content = document.querySelector('.content');
let nameInfo = content.querySelector('.info__name');
let jobInfo = content.querySelector('.info__job-title');
let editButton = content.querySelector('.info__edit-button');
let popup = content.querySelector('.popup');
let formElement = content.querySelector('.popup__edit-info');
let nameInput = formElement.querySelector('.popup__item_el_name');
let jobInput = formElement.querySelector('.popup__item_el_job');
let popupCloseButton = formElement.querySelector('.popup__btn-close');

function openPopup () {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
  popup.classList.add('popup_opened');
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', formSubmitHandler);
popupCloseButton.addEventListener('click', closePopup);
