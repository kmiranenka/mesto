const content = document.querySelector('.content');
let nameInfo = content.querySelector('.info__name');
let jobInfo = content.querySelector('.info__job-title');

const imagePopup = content.querySelector('.popup__container').parentElement;
const imagePopupCloseButton = imagePopup.querySelector('.popup__btn-close');
let imageInPopup = imagePopup.querySelector('.popup__image');
let headingInPopup = imagePopup.querySelector('.popup__image-heading');

const editButton = content.querySelector('.info__edit-button');
const editFormElement = content.querySelector('.popup__edit-info');
const editPopup = content.querySelector('.popup');
let nameInput = editFormElement.querySelector('.popup__item_el_name');
let jobInput = editFormElement.querySelector('.popup__item_el_job');
const editPopupCloseButton = editFormElement.querySelector('.popup__btn-close');

const addButton = content.querySelector('.profile__add-button');
const addFormElement = content.querySelector('.popup__add-place');
const addPopup = addFormElement.parentElement;
let titleInput = addFormElement.querySelector('.popup__item_el_title');
let linkInput = addFormElement.querySelector('.popup__item_el_link');
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

function openPopup (evt) {
  if(evt.target.classList.value === "info__edit-button" || evt.target.classList.value === "info__edit-icon"){
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
  editPopup.classList.add('popup_opened');
  }
  else if(evt.target.classList.value === "profile__add-button" || evt.target.classList.value === "profile__add-icon"){
    addPopup.classList.add('popup_opened');
  }
}

function closePopup () {
  editPopup.classList.remove('popup_opened');
  addPopup.classList.remove('popup_opened');
  imagePopup.classList.remove('popup_opened');
}


function formSubmitHandler (evt) {
  evt.preventDefault();
  if(nameInput.value !== ''){
  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
  closePopup();
  } else {
    closePopup();
  }
}

function createCardElemnt(item){
  const cardElement = cardsTemplate.cloneNode(true);
  let cardPhoto = cardElement.querySelector('.element__photo');

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
  initialCards.unshift({name: titleInput.value, link: linkInput.value});
  closePopup();
  titleInput.value = '';
  linkInput.value = '';
  cardsSection.prepend(createCardElemnt(initialCards[0]));
  } else{
    closePopup();
  }
}


function addCardsByDefault (cards){
cards.forEach( item => cardsSection.append(createCardElemnt (item)));
}


window.addEventListener('load', addCardsByDefault(initialCards));
editButton.addEventListener('click', openPopup);
editFormElement.addEventListener('submit', formSubmitHandler);
editPopupCloseButton.addEventListener('click', closePopup);
addButton.addEventListener('click', openPopup);
addFormElement.addEventListener('submit', addNewCard);
addPopupCloseButton.addEventListener('click', closePopup);
imagePopupCloseButton.addEventListener('click', closePopup);




