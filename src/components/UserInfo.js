class UserInfo {
  constructor({ profileNameSelector, titleSelector, avatarSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileTitle = document.querySelector(titleSelector);
  }
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      title: this._profileTitle.textContent,
      avatar: this._profileAvatar.src,
    };
  }

  setUserInfo({ name, title, avatar }) {
    this._profileName.textContent = name || this._profileName.textContent;
    this._profileTitle.textContent = title || this._profileTitle.textContent;
    this._profileAvatar.src = avatar || this._profileAvatar.src;
  }
}

export default UserInfo;
