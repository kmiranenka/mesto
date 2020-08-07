const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const formError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const formError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  formError.classList.remove(errorClass);
  formError.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

function resertErrorMessage(formElement, inputSelector, inputErrorClass, errorClass) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  inputList.forEach((inputElement) => {
    if (inputElement.classList.contains(inputErrorClass)) {
      hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
  })
}

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass,
  inputErrorClass, errorClass, resetButtonSelector, popupSelector) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  const closeButtonElement = formElement.querySelector(resetButtonSelector);
  const popupOverlayList = Array.from(document.querySelectorAll(popupSelector));


  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });

  closeButtonElement.addEventListener('click', function () {
    resertErrorMessage(formElement, inputSelector, inputErrorClass, errorClass);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  });

  popupOverlayList.forEach((overlay) => overlay.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      resertErrorMessage(formElement, inputSelector, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    }
  })
  );

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      resertErrorMessage(formElement, inputSelector, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    }
  })
};

const enableValidation = (formsList) => {
  const formList = Array.from(document.querySelectorAll(formsList.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      const inputList = Array.from(formElement.querySelectorAll(formsList.inputSelector));
      const buttonElement = formElement.querySelector(formsList.submitButtonSelector);
      evt.preventDefault();
      toggleButtonState(inputList, buttonElement, formsList.inactiveButtonClass);
    });

    setEventListeners(formElement, formsList.inputSelector, formsList.submitButtonSelector, formsList.inactiveButtonClass,
      formsList.inputErrorClass, formsList.errorClass, formsList.resetButtonSelector, formsList.popupSelector);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active',
  resetButtonSelector: '.popup__btn-close',
  popupSelector: '.popup',
  contentSelector: '.content'
});
