import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._imageInPopup = this._popup.querySelector('.popup__image');
        this._imageInPopupHeading = this._popup.querySelector('.popup__image-heading');
    }

    open(link, name) {
        this._imageInPopup.src = link;
        this._imageInPopup.alt = name;
        this._imageInPopupHeading.textContent = name;
        super.open();
    }
}
