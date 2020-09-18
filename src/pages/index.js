import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import {
    avatarEditButton,
    editButton,
    addButton,
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
import PopupWithFormSubmit from '../scripts/components/PopupWithFormSubmit.js';

const api = new Api(apiConfig);

const userInfo = new UserInfo(userInfoSelector);

api.getUserInfo()
    .then((userData) => {
        userInfo.setUserInfo(userData.name, userData.about)
        userInfo.setAvatar(userData.avatar);
    });


function createCardElement(link, name, likesList, userId, userCardId, cardId) {
    const card = new Card(link, name, likesList, userId, userCardId, cardId, '#cards', () => {
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
    }, () => {
        api.changeLikeCardStatus(cardId, card.isLiked())
            .then((data) => {
                if (card.isLiked()) {
                    likesList.splice(likesList.find((like) => {
                        if (like._id === userId) {
                            return likesList.indexOf(like);
                        }
                    }), 1);
                } else {
                    likesList.push(data.likes.find((like) => {
                        if (like._id === userId) {
                            return like;
                        }
                    }));
                }
            })
    });

    return card.generateCard();
}

api.getCards()
    .then((cardsList) => {
        api.getUserInfo()
            .then((userInfo) => {
                const cardsSection = new Section({
                    items: cardsList,
                    renderer: (item) => {
                        const card = createCardElement(item.link, item.name, item.likes, userInfo._id, item.owner._id, item._id);
                        cardsSection.addItemFromList(card);
                    }
                }, cardSection);
                cardsSection.renderItems();
            })
    })

const popupWithAddForm = new PopupWithForm('.popup_add', (formValues) => {
    const cardsSection = new Section({}, cardSection);
    api.addCard(formValues.title, formValues.link)
        .then((data) => {
            cardsSection.addItemToBegin(createCardElement(formValues.link, formValues.title, data.likes, data.owner._id, data.owner._id, data._id));
        })
        .finally(() => {
            popupWithAddForm.close();
        })
});

popupWithAddForm.setEventListeners();

addButton.addEventListener('click', () => {
    popupWithAddForm.open();
});

const popupWithEditForm = new PopupWithForm('.popup_edit', (formValues) => {
    api.updateUserInfo(formValues.name, formValues.job)
        .finally(() => {
            popupWithEditForm.close()
        });
    userInfo.setUserInfo(formValues.name, formValues.job, );
});

popupWithEditForm.setEventListeners();

const popupWithAvatarEditForm = new PopupWithForm('.popup_edit-avatar', (formValue) => {
    api.updateUserAvatar(formValue.avatar_link)
        .finally(() => {
            popupWithAvatarEditForm.close()
        });
    userInfo.setAvatar(formValue.avatar_link);
});


avatarEditButton.addEventListener('click', () => {
    popupWithAvatarEditForm.setEventListeners();
    popupWithAvatarEditForm.open();
});


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
