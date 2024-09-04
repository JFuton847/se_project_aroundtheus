class UserInfo {
  constructor({ profileNameSelector, aboutSelector, avatarSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileTitle = document.querySelector(aboutSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileTitle.textContent,
      avatar: this._profileAvatar.url,
    };
  }

  setUserInfo({ name, about }) {
    this._profileName.textContent = name;
    this._profileTitle.textContent = about;
  }

  setUserAvatar({ avatar }) {
    this._profileAvatar.src = avatar;
  }
}

export default UserInfo;
