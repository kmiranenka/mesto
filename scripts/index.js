const content = document.querySelector('.content');
const nameInfo = content.querySelector('.info__name');
const jobInfo = content.querySelector('.info__job-title');

const imagePopup = content.querySelector('.popup__container').parentElement;
const imagePopupCloseButton = imagePopup.querySelector('.popup__btn-close');
const imageInPopup = imagePopup.querySelector('.popup__image');
const headingInPopup = imagePopup.querySelector('.popup__image-heading');

const editButton = content.querySelector('.info__edit-button');
const editFormElement = document.forms.edit_form;
const editPopup = document.forms.edit_form.parentElement;
const nameInput = editFormElement.elements.name;
const jobInput = editFormElement.elements.job;
const editPopupCloseButton = editFormElement.elements.close;

const addButton = content.querySelector('.profile__add-button');
const addFormElement = document.forms.add_form;
const addPopup = addFormElement.parentElement;
const titleInput = addFormElement.elements.title;
const linkInput = addFormElement.elements.link;
const addPopupCloseButton = addFormElement.elements.close;

const cardsTemplate = document.querySelector('#cards').content;
const cardsSection = content.querySelector('.elements');


function togglePopup(popup) {
  popup.classList.toggle('popup_opened')
}

function openProfileEditPopup() {
  togglePopup(editPopup);
  setCloseByEscapeListner();
}

function openCardAddPopup() {
  togglePopup(addPopup);
  setCloseByEscapeListner();
}

function closeProfileEditPopup() {
  togglePopup(editPopup);
}

function closeCardAddPopup() {
  togglePopup(addPopup);
}

function closeImagePopup() {
  togglePopup(imagePopup);
}

function resetFormValues(inputList) {
  inputList.forEach((input) => input.value = '');
}

function setCloseByEscapeListner() {
  document.addEventListener('keydown', closePopupByEscape);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closeProfileEditPopup();
}

function closePopupByOverlay() {
  const popupOverlayList = Array.from(content.querySelectorAll('.popup'));
  popupOverlayList.forEach((overlay) => overlay.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      togglePopup(evt.target);
      resetFormValues([titleInput, linkInput]);
    }
  }));
}

function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupList = Array.from(content.querySelectorAll('.popup'));
    popupList.forEach(function (popup) {
      if (popup.classList.contains('popup_opened')) {
        togglePopup(popup);
        resetFormValues([titleInput, linkInput]);
        document.removeEventListener('keydown', closePopupByEscape);
      }
    });
  }
}

function createCardElement(item) {
  const cardElement = cardsTemplate.cloneNode(true);
  const cardPhoto = cardElement.querySelector('.element__photo');

  cardPhoto.src = item.link;
  cardPhoto.alt = item.name;
  cardElement.querySelector('.element__name').textContent = item.name;

  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  cardElement.querySelector('.element__trash').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  });

  cardPhoto.addEventListener('click', function (evt) {
    imageInPopup.src = evt.target.src;
    imageInPopup.alt = evt.target.alt;
    headingInPopup.textContent = evt.target.parentElement.querySelector('.element__name').textContent;
    imagePopup.classList.add('popup_opened');
    setCloseByEscapeListner();
  });

  return cardElement;
}

function addNewCard(evt) {
  evt.preventDefault();
  cardsSection.prepend(createCardElement({ name: titleInput.value, link: linkInput.value }));
  closeCardAddPopup();
  resetFormValues([titleInput, linkInput]);
}

function addCardsByDefault(cards) {
  cards.forEach(item => cardsSection.append(createCardElement(item)));
}

function addProfileInfo() {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
}

addCardsByDefault(initialCards);
addProfileInfo();
editButton.addEventListener('click', openProfileEditPopup);
editButton.addEventListener('click', addProfileInfo);
editFormElement.addEventListener('submit', formSubmitHandler);
editPopupCloseButton.addEventListener('click', closeProfileEditPopup);
addButton.addEventListener('click', openCardAddPopup);
addFormElement.addEventListener('submit', addNewCard);
addPopupCloseButton.addEventListener('click', closeCardAddPopup);
imagePopupCloseButton.addEventListener('click', closeImagePopup);
closePopupByOverlay();




