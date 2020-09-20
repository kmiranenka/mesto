export function renderLoading(isLoading, defaultButtonText, submitButton) {
    if (isLoading) {
        submitButton.textContent = 'Сохранить ...';
    } else {
        submitButton.textContent = defaultButtonText;
    }
}
