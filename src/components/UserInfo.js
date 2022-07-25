export default class UserInfo {
  constructor({
    profileName, profileDescription, profileAvatar
  }) {
    this._name = profileName;
    this._about = profileDescription;
    this._avatar = profileAvatar;
  }

  getUserInfo() {
    const user = {
      userName: this._name.textContent,
      userAbout: this._about.textContent 
    }
    return user;
  }

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._about.textContent = userInfo.about;
  }

  setUserAvavtar(userInfo) {
    this._avatar.src = userInfo.avatar;
  }
}