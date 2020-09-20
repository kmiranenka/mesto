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

function createCardElement(link, name, likesList, userId, userCardId, cardId) {
    const card = new Card(link, name, likesList, userId, userCardId, cardId, '#cards', (link, card) => {
            const popupWithImage = new PopupWithImage('.popup_image');
            popupWithImage.open(link, card);
            popupWithImage.setEventListeners();
        }, (evt) => {
            const popupWithFormSubmit = new PopupWithFormSubmit('.popup_confirm', () => {
                api.deleteCard(cardId, evt)
                    .then(() => {
                        popupWithFormSubmit.close();
                        card.removeCardElement(evt);
                    })
                    .catch((error) => { console.error(error); });
            });
            popupWithFormSubmit.open();
            popupWithFormSubmit.setEventListeners();
        },
        () => {
            console.log(likesList);

            api.changeLikeCardStatus(cardId, card.isLiked())
                .then((data) => {
                    if (card.isLiked()) {
                        likesList.splice(
                            likesList.indexOf(likesList.find((like) => {
                                like._id === userId;
                            })), 1);
                        console.log(likesList);
                    } else {
                        likesList.push(
                            data.likes.find((like) => {
                                if (like._id === userId) {
                                    return like;
                                }
                            }));
                        console.log(likesList);
                    }
                })
                .catch((error) => { console.error(error); });
        });

    return card.generateCard();
}
Promise.all([
        api.getUserInfo(),
        api.getCards()
    ])
    .then((values) => {
        const [userData, initialCards] = values;
        userInfo.setUserInfo(userData.name, userData.about)
        userInfo.setAvatar(userData.avatar);
        const cardsSection = new Section({
            items: initialCards,
            renderer: (item) => {
                const card = createCardElement(item.link, item.name, item.likes, userData._id, item.owner._id, item._id);
                cardsSection.addItemFromList(card);

            }
        }, cardSection);
        cardsSection.renderItems();
    })
    .catch((err) => {
        console.log(err);
    });



const popupWithAddForm = new PopupWithForm('.popup_add', (formValues) => {
    const cardsSection = new Section({}, cardSection);
    api.addCard(formValues.title, formValues.link)
        .then((data) => {
            cardsSection.addItemToBegin(createCardElement(formValues.link, formValues.title, data.likes, data.owner._id, data.owner._id, data._id));
        })
        .then(() => {
            popupWithAddForm.close();
        })
        .catch((error) => { console.error(error); });
});

popupWithAddForm.setEventListeners();

addButton.addEventListener('click', () => {
    popupWithAddForm.open();
});

const popupWithEditForm = new PopupWithForm('.popup_edit', (formValues) => {
    api.updateUserInfo(formValues.name, formValues.job)
        .then(() => {
            userInfo.setUserInfo(formValues.name, formValues.job);
            popupWithEditForm.close();
        })
        .catch((error) => { console.error(error); });
});

popupWithEditForm.setEventListeners();

const popupWithAvatarEditForm = new PopupWithForm('.popup_edit-avatar', (formValue) => {
    api.updateUserAvatar(formValue.avatar_link)
        .then(() => {
            userInfo.setAvatar(formValue.avatar_link);
            popupWithAvatarEditForm.close();
        })
        .catch((error) => { console.error(error); });
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
