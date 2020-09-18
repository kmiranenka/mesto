export const apiConfig = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-15',
    headers: {
        authorization: 'd8f573f5-3d39-4e5c-8f4c-7d486a1ab9c2',
        contentType: 'application/json'
    }
}

const content = document.querySelector('.content');

export const avatarEditButton = content.querySelector('.profile__edit-avatar-button');
export const editButton = content.querySelector('.info__edit-button');
export const addButton = content.querySelector('.profile__add-button');

const editFormElement = document.forms.edit_form;
export const nameInput = editFormElement.elements.name;
export const jobInput = editFormElement.elements.job;

export const userInfoSelector = {
    nameInfoSelector: '.info__name',
    jobInfoSelector: '.info__job-title',
    avatarInfoSelector: '.profile__avatar'

}

export const form = {
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__item-error_active',
    resetButtonSelector: '.popup__btn-close',
    popupSelector: '.popup',
    contentSelector: '.content',
    addFormSelector: '.profile__add-button',
    editFormSelector: '.info__edit-button',
    avatarFormSelector: '.profile__edit-avatar-button'
};

export const cardSection = '.elements';
