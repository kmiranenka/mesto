export default class Card {
    constructor(link, name, likes, userId, userCardId, cardId, templateSelector, handleCardClick, handleTrashClick, handleLikeClick) {
        this._link = link;
        this._name = name;
        this._likes = likes;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._userId = userId;
        this._userCardId = userCardId;
        this._cardId = cardId;
        this._handleLikeClick = handleLikeClick;
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
        const photoElement = this._element.querySelector('.element__photo');
        const likesNumberElement = this._element.querySelector('.element__likes-number');

        photoElement.src = this._link;
        photoElement.alt = this._name;
        this._element.querySelector('.element__name').textContent = this._name;
        if (this._likes.length > 0) {
            likesNumberElement.textContent = this._likes.length;
            likesNumberElement.classList.add('element__likes-number_add');
        }
        if (this._userCardId === this._userId) {
            this._element.querySelector('.element__trash').classList.remove('element__trash_hidden');
        }
        if (this.isLiked()) {
            this._element.querySelector('.element__like').classList.add('element__like_active');
        }
        return this._element;
    }

    isLiked() {
        return Boolean(this._likes.find(item => item._id === this._userId));
    }

    _likesCount(evt) {
        const likesElement = evt.target.parentElement.querySelector('.element__likes-number');
        if (this.isLiked()) {
            if (this._likes.length > 0) {
                likesElement.textContent = this._likes.length - 1;
            }
            if (likesElement.textContent == 0) {
                likesElement.classList.remove('element__likes-number_add');
            }
        } else {
            if (likesElement.textContent === '' || likesElement.textContent == 0) {
                likesElement.classList.add('element__likes-number_add');
            }
            likesElement.textContent = this._likes.length + 1;
        }
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._likesCount(evt);
            this._handleLikeClick();
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
        this._handleCardClick(this._link, this._name);
    }

}
