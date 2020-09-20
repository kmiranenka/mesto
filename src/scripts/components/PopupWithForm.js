import {
    renderLoading
} from '../utils/utils.js';
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector,
        handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
        this._defaultSubmitButtontext = this._form.querySelector('.popup__btn-save').textContent;
        this._submitButton = this._form.querySelector('.popup__btn-save');

    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__item');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    close() {
        super.close();
        this._form.reset();
        renderLoading(false, this._defaultSubmitButtontext, this._submitButton);
    }



    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            renderLoading(true, this._defaultSubmitButtontext, this._submitButton);
            this._handleFormSubmit(this._getInputValues());
        });
    }

}
