export default class Popup {

    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this.escHandler = this._handleEscClose.bind(this);

        document.addEventListener('keydown', this.escHandler);
        this._popup.classList.add('popup_opened');

    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this.escHandler);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            if (this._popup.classList.contains('popup_opened')) {
                this.close();
            }
        };
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-icon')) {
                this.close();
            }
        })
    }
}
