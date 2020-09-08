export default class Popup {

    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            if (this._popup.classList.contains('popup_opened')) {
                this.close();
                document.removeEventListener('keydown', this._handleEscClose(evt));
            }
        };
    }

    _closePopupByOverlay(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.querySelector('.popup__btn-close').addEventListener('click', () => {
            this.close();
        })
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
        this._popup.addEventListener('click', (evt) => {
            this._closePopupByOverlay(evt);
        });

    }
}
