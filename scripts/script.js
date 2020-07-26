const content = document.querySelector('.content');
const nameInfo = content.querySelector('.info__name');
const jobInfo = content.querySelector('.info__job-title');

const imagePopup = content.querySelector('.popup__container').parentElement;
const imagePopupCloseButton = imagePopup.querySelector('.popup__btn-close');
const imageInPopup = imagePopup.querySelector('.popup__image');
const headingInPopup = imagePopup.querySelector('.popup__image-heading');

const editButton = content.querySelector('.info__edit-button');
const editFormElement = content.querySelector('.popup__edit-info');
const editPopup = content.querySelector('.popup');
const nameInput = editFormElement.querySelector('.popup__item_el_name');
const jobInput = editFormElement.querySelector('.popup__item_el_job');
const editPopupCloseButton = editFormElement.querySelector('.popup__btn-close');

const addButton = content.querySelector('.profile__add-button');
const addFormElement = content.querySelector('.popup__add-place');
const addPopup = addFormElement.parentElement;
const titleInput = addFormElement.querySelector('.popup__item_el_title');
const linkInput = addFormElement.querySelector('.popup__item_el_link');
const addPopupCloseButton = addFormElement.querySelector('.popup__btn-close');

const cardsTemplate = document.querySelector('#cards').content;
const cardsSection = content.querySelector('.elements');
const initialCards = [
  {
      name: 'Австралия',
      link: 'https://images.unsplash.com/photo-1494233892892-84542a694e72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=401&q=80'
  },
  {
      name: 'Бруклин',
      link: 'https://images.unsplash.com/photo-1594744754648-7836af69e1c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80'
  },
  {
      name: 'Триумфальная Арка',
      link: 'https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
  },
  {
      name: 'Токио',
      link: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
  },
  {
      name: 'Италия',
      link: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80'
  },
  {
      name: 'Новая Зеландия',
      link: 'https://images.unsplash.com/photo-1577786410921-6c2d73de9d92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
  }
];

function togglePopup(popup) {
  popup.classList.toggle('popup_opened')
}

function openProfileEditPopup() {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
  togglePopup(editPopup);
}

function openCardAddPopup() {
  togglePopup(addPopup);
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


function formSubmitHandler (evt) {
  evt.preventDefault();
  if(nameInput.value !== ''){
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  }
    closeProfileEditPopup();
}

function createCardElement(item){
  const cardElement = cardsTemplate.cloneNode(true);
  const cardPhoto = cardElement.querySelector('.element__photo');

  cardPhoto.src = item.link;
  cardPhoto.alt = item.name;
  cardElement.querySelector('.element__name').textContent = item.name;

  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');});

  cardElement.querySelector('.element__trash').addEventListener('click', function (evt) {
      evt.target.parentElement.remove();
    });

    cardPhoto.addEventListener('click', function (evt) {
      imageInPopup.src = evt.target.src;
      imageInPopup.alt = evt.target.alt;
      headingInPopup.textContent = evt.target.parentElement.querySelector('.element__name').textContent;
      imagePopup.classList.add('popup_opened');
    });

  return cardElement;
}

function addNewCard(evt){
  evt.preventDefault();
  if(titleInput.value !== '' && linkInput.value !== ''){
    cardsSection.prepend(createCardElement({name: titleInput.value, link: linkInput.value}));
  }
    closeCardAddPopup();
}


function addCardsByDefault (cards){
cards.forEach( item => cardsSection.append(createCardElement (item)));
}


addCardsByDefault(initialCards);
editButton.addEventListener('click', openProfileEditPopup);
editFormElement.addEventListener('submit', formSubmitHandler);
editPopupCloseButton.addEventListener('click', closeProfileEditPopup);
addButton.addEventListener('click', openCardAddPopup);
addFormElement.addEventListener('submit', addNewCard);
addPopupCloseButton.addEventListener('click', closeCardAddPopup);
imagePopupCloseButton.addEventListener('click', closeImagePopup);




