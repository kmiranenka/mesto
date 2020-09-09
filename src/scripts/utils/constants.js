export const initialCards = [{
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

const content = document.querySelector('.content');

export const editButton = content.querySelector('.info__edit-button');
export const addButton = content.querySelector('.profile__add-button');

const editFormElement = document.forms.edit_form;
export const nameInput = editFormElement.elements.name;
export const jobInput = editFormElement.elements.job;


export const userInfoSelector = {
    nameInfoSelector: '.info__name',
    jobInfoSelector: '.info__job-title'
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
    editFormSelector: '.info__edit-button'
};

export const cardSection = '.elements';
