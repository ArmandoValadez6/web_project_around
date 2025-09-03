export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  loadUserInfo(userData) {
    userData.then((data) => {
      this._userName.textContent = data.name;
      this._userJob.textContent = data.about;
      this._userAvatar.src = data.avatar;
    });
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

  setUserAvatar(personAvatar) {
    this._userAvatar.src = personAvatar;
  }
}
