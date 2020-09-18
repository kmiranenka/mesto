import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector,
        handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
        this._defaultSubmitButtontext = this._form.querySelector('.popup__btn-save').textContent;
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
        this._renderLoading(false, this._defaultSubmitButtontext);
    }

    _renderLoading(isLoading, defaultButtonText) {
        const submitButton = this._form.querySelector('.popup__btn-save');
        if (isLoading) {
            submitButton.textContent = 'Сохранить ...';
        } else {
            submitButton.textContent = defaultButtonText;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', () => {
            this._renderLoading(true);
            this._handleFormSubmit(this._getInputValues());
        });
    }

}
