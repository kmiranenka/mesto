import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
    }

    open(link, name) {
        const imageInPopup = this._popup.querySelector('.popup__image');
        imageInPopup.src = link;
        imageInPopup.alt = name;
        this._popup.querySelector('.popup__image-heading').textContent = name;
        super.open();
    }
}
