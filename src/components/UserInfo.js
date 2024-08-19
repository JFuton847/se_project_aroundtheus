class UserInfo {
  constructor({ profileNameSelector, titleSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileTitle = document.querySelector(titleSelector);
  }
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      title: this._profileTitle.textContent,
    };
  }

  setUserInfo({ name, title }) {
    this._profileName.textContent = name;
    this._profileTitle.textContent = title;
  }
}

export default UserInfo;
