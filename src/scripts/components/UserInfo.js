export default class UserInfo {
    constructor({ nameInfoSelector, jobInfoSelector }) {
        this._nameInfoSelector = nameInfoSelector;
        this._jobInfoSelector = jobInfoSelector;
    }

    getUserInfo() {
        const nameInfo = document.querySelector(this._nameInfoSelector).textContent;
        const jobInfo = document.querySelector(this._jobInfoSelector).textContent;
        this._userInfo = { nameInfo, jobInfo };
        return this._userInfo;
    }

    setUserInfo(nameInput, jobInput) {
        document.querySelector(this._nameInfoSelector).textContent = nameInput;
        document.querySelector(this._jobInfoSelector).textContent = jobInput;
    }
}
