export default class UserAvatar {
    constructor({ avatarInfoSelector }) {
        this._avatarInfoSelector = avatarInfoSelector;

    }

    getAvatarImageLink() {
        return document.querySelector(this._avatarInfoSelector).src;
    }

    setAvatarImage(avatar) {
        document.querySelector(this._avatarInfoSelector).src = avatar;

    }
}
