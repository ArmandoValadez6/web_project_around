export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  }
  getUserInfo() {
    const userInfoObj = {
      name: this._userName.textContent,
      job: this._userJob.textContent,
    };
    return userInfoObj;
  }
  setUserInfo({ personName, personJob }) {
    this._userName.textContent = personName;
    this._userJob.textContent = personJob;
  }
}
