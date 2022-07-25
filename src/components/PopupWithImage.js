import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup, image, name) {
    super(popup);
    this._popupImage = image;
    this._popupText = name;
  }

  open(link, place) {
    super.open();
    this._popupImage.src = link;
    this._popupText.textContent = place;
  }
}