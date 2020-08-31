import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import {
    initialCards
} from './initial-cards.js';

const content = document.querySelector('.content');
const nameInfo = content.querySelector('.info__name');
const jobInfo = content.querySelector('.info__job-title');

export const imagePopup = content.querySelector('.popup__container').parentElement;
const imagePopupCloseButton = imagePopup.querySelector('.popup__btn-close');
export const imageInPopup = imagePopup.querySelector('.popup__image');
export const headingInPopup = imagePopup.querySelector('.popup__image-heading');

const editButton = content.querySelector('.info__edit-button');
const editFormElement = document.forms.edit_form;
const editPopup = document.forms.edit_form.parentElement.parentElement;
const nameInput = editFormElement.elements.name;
const jobInput = editFormElement.elements.job;
const editPopupCloseButton = editPopup.querySelector('.popup__btn-close');

const addButton = content.querySelector('.profile__add-button');
const addFormElement = document.forms.add_form;
const addPopup = addFormElement.parentElement.parentElement;
const titleInput = addFormElement.elements.title;
const linkInput = addFormElement.elements.link;
const addPopupCloseButton = addPopup.querySelector('.popup__btn-close');

const form = {
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__item-error_active',
    resetButtonSelector: '.popup__btn-close',
    popupSelector: '.popup',
    contentSelector: '.content',
    addFormSelector: '.profile__add-button',
    editFormSelector: '.info__edit-button'
};

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

function closeProfileEditPopup(evt) {
    evt.preventDefault();
    togglePopup(editPopup);
}

function closeCardAddPopup() {
    togglePopup(addPopup);
    resetFormValues([titleInput, linkInput]);
}

function closeImagePopup() {
    togglePopup(imagePopup);
}

function resetFormValues(inputList) {
    inputList.forEach((input) => input.value = '');
}

export function setCloseByEscapeListner() {
    document.addEventListener('keydown', closePopupByEscape);
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameInfo.textContent = nameInput.value;
    jobInfo.textContent = jobInput.value;
    closeProfileEditPopup(evt);
}

function closePopupByOverlay() {
    const popupOverlayList = Array.from(content.querySelectorAll('.popup'));
    popupOverlayList.forEach((overlay) => overlay.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup')) {
            togglePopup(evt.target);
            resetFormValues([titleInput, linkInput]);
        }
    }));
}

function closePopupByEscape(evt) {
    if (evt.key === 'Escape') {
        const popupList = Array.from(content.querySelectorAll('.popup'));
        popupList.forEach(function(popup) {
            if (popup.classList.contains('popup_opened')) {
                togglePopup(popup);
                resetFormValues([titleInput, linkInput]);
                document.removeEventListener('keydown', closePopupByEscape);
            }
        });
    }
}

function addNewCard(evt) {
    evt.preventDefault()
    const card = new Card(linkInput.value, titleInput.value, '#cards');
    const cardElement = card.generateCard();
    cardsSection.prepend(cardElement);
    closeCardAddPopup();
    resetFormValues([titleInput, linkInput]);

}

function addCardsByDefault(cards) {
    cards.forEach((item) => {
        const card = new Card(item.link, item.name, '#cards');
        const cardElement = card.generateCard();
        cardsSection.append(cardElement);
    })
}

function addProfileInfo() {
    nameInput.value = nameInfo.textContent;
    jobInput.value = jobInfo.textContent;
}



addCardsByDefault(initialCards);
addProfileInfo();
editButton.addEventListener('click', addProfileInfo);
editButton.addEventListener('click', openProfileEditPopup);
editFormElement.addEventListener('submit', formSubmitHandler);
editPopupCloseButton.addEventListener('click', closeProfileEditPopup);
addButton.addEventListener('click', openCardAddPopup);
addFormElement.addEventListener('submit', addNewCard);
addPopupCloseButton.addEventListener('click', closeCardAddPopup);
imagePopupCloseButton.addEventListener('click', closeImagePopup);
closePopupByOverlay();

const formElement = new FormValidator(form, '.popup__form');
formElement.enableValidation();
