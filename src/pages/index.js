import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import {
    editButton,
    addButton,
    avatar,
    nameInput,
    jobInput,
    userInfoSelector,
    form,
    cardSection,
    apiConfig
} from '../scripts/utils/constants.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Section from '../scripts/components/Section.js';
import Api from '../scripts/components/Api.js';
import UserAvatar from '../scripts/components/UserAvatar.js';
import PopupWithFormSubmit from '../scripts/components/PopupWithFormSubmit.js';

const api = new Api(apiConfig);

const userInfo = new UserInfo(userInfoSelector);
const userAvatar = new UserAvatar(userInfoSelector);

api.getUserInfo()
    .then((userData) => {
        userInfo.setUserInfo(userData.name, userData.about);
        userAvatar.setAvatarImage(userData.avatar);
    });

function createCardElement(link, name, likeNumber, userId, userCardId, cardId) {
    const card = new Card(link, name, likeNumber, userId, userCardId, '#cards', () => {
        const popupWithImage = new PopupWithImage('.popup_image');
        popupWithImage.open(card._link, card._name);
        popupWithImage.setEventListeners();
    }, (evt) => {
        const popupWithFormSubmit = new PopupWithFormSubmit('.popup_confirm', () => {
            card.removeCardElement(evt);
            api.deleteCard(cardId);
        });
        popupWithFormSubmit.open();
        popupWithFormSubmit.setEventListeners();


    });
    return card.generateCard();
}

api.getCards()
    .then((cardsList) => {
        api.getUserInfo()
            .then((userInfo) => {
                console.log(userInfo._id)
                const cardsSection = new Section({
                    items: cardsList,
                    renderer: (item) => {
                        const card = createCardElement(item.link, item.name, item.likes.length, userInfo._id, item.owner._id, item._id);
                        cardsSection.addItemFromList(card);
                    }
                }, cardSection);

                cardsSection.renderItems();
            })
    })

const popupWithAddForm = new PopupWithForm('.popup_add', (formValues) => {
    const cardsSection = new Section({}, cardSection);
    api.addCard(formValues.title, formValues.link);
    cardsSection.addItemToBegin(createCardElement(formValues.link, formValues.title));
});

popupWithAddForm.setEventListeners();

addButton.addEventListener('click', () => {
    popupWithAddForm.open();
});


const popupWithEditForm = new PopupWithForm('.popup_edit', (formValues) => {
    api.updateUserInfo(formValues.name, formValues.job);
    userInfo.setUserInfo(formValues.name, formValues.job);
});

popupWithEditForm.setEventListeners();

function openFormAuthor() {
    const infoUser = userInfo.getUserInfo();
    nameInput.value = infoUser.nameInfo;
    jobInput.value = infoUser.jobInfo;
    popupWithEditForm.open();
}

editButton.addEventListener('click', () => {
    openFormAuthor();
})

const formElement = new FormValidator(form, '.popup__form');
formElement.enableValidation();

formElement.enableValidation();
