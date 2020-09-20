export default class UserInfo {
    constructor({ nameInfoSelector, jobInfoSelector, avatarInfoSelector }) {
        this._nameInfo = document.querySelector(nameInfoSelector);
        this._jobInfo = document.querySelector(jobInfoSelector);
        this._avatarInfo = document.querySelector(avatarInfoSelector);

    }

    getUserInfo() {
        const nameInfo = this._nameInfo.textContent;
        const jobInfo = this._jobInfo.textContent;
        const avatar = this._avatarInfo.src;
        this._userInfo = { nameInfo, jobInfo, avatar };
        return this._userInfo;
    }

    setUserInfo(nameInput, jobInput) {
        this._nameInfo.textContent = nameInput;
        this._jobInfo.textContent = jobInput;
    }

    setAvatar(avatar) {
        this._avatarInfo.src = avatar;
    }
}
