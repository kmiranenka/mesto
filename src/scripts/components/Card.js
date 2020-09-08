export default class Card {
    constructor(link, name, templateSelector, handleCardClick) {
        this._link = link;
        this._name = name;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
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

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._setLikeActive(evt);
        });

        this._element.querySelector('.element__trash').addEventListener('click', (evt) => {
            this._removeCardElement(evt);
        });

        this._element.querySelector('.element__photo').addEventListener('click', () => {
            this._openCardPopup();
        });
    }

    _setLikeActive(evt) {
        evt.target.classList.toggle('element__like_active');
    }

    _removeCardElement(evt) {
        evt.target.parentElement.remove();
    }

    _openCardPopup() {
        this._handleCardClick();
    }
}
