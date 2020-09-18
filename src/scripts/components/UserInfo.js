export default class UserInfo {
    constructor({ nameInfoSelector, jobInfoSelector, avatarInfoSelector }) {
        this._nameInfoSelector = nameInfoSelector;
        this._jobInfoSelector = jobInfoSelector;
        this._avatarInfoSelector = avatarInfoSelector;

    }

    getUserInfo() {
        const nameInfo = document.querySelector(this._nameInfoSelector).textContent;
        const jobInfo = document.querySelector(this._jobInfoSelector).textContent;
        const avatar = document.querySelector(this._avatarInfoSelector).src;
        this._userInfo = { nameInfo, jobInfo, avatar };
        return this._userInfo;
    }

    setUserInfo(nameInput, jobInput) {
        document.querySelector(this._nameInfoSelector).textContent = nameInput;
        document.querySelector(this._jobInfoSelector).textContent = jobInput;
    }

    setAvatar(avatar) {
        document.querySelector(this._avatarInfoSelector).src = avatar;
    }
}
