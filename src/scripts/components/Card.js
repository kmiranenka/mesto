export default class Card {
    constructor(link, name, likeNumber, userId, userCardId, templateSelector, handleCardClick, handleTrashClick) {
        this._link = link;
        this._name = name;
        this._likeNumber = likeNumber;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._userId = userId;
        this._userCardId = userCardId;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__photo').src = this._link;
        this._element.querySelector('.element__photo').alt = this._name;
        this._element.querySelector('.element__name').textContent = this._name;
        this._element.querySelector('.element__likes-number').textContent = this._likeNumber;
        if (this._likeNumber > 0) {
            this._element.querySelector('.element__likes-number').classList.add('element__likes-number_add');
        }
        if (this._userCardId === this._userId) {
            this._element.querySelector('.element__trash').classList.remove('element__trash_hidden');

        }

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._setLikeActive(evt);
        });

        this._element.querySelector('.element__trash').addEventListener('click', (evt) => {
            this._handleTrashClick(evt);
        });

        this._element.querySelector('.element__photo').addEventListener('click', () => {
            this._openCardPopup();
        });
    }

    _setLikeActive(evt) {
        evt.target.classList.toggle('element__like_active');
    }

    removeCardElement(evt) {
        evt.target.parentElement.remove();
    }

    _openCardPopup() {
        this._handleCardClick();
    }
}
