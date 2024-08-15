class UserInfo {
  constructor({ profileNameSelector, jobElementSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._jobElement = document.querySelector(jobElementSelector);
  }
  getUserInfo() {
    return {
      name: this._profileNameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._profileNameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}

export default UserInfo;
