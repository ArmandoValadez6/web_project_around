export default class Card {
  constructor(imName, imURL, elmntTemplate, container) {
    this._imName = imName;
    this._imURL = imURL;
    this._elmntTemplate = elmntTemplate;
    this._container = container;
    this.CreateCard();
  }

  CreateCard() {
    this._elmntSingle = this._elmntTemplate
      .querySelector(".element__single")
      .cloneNode(true);

    this._elmntSingle.querySelector(".element__image").src = this._imURL;
    this._elmntSingle.querySelector(".element__image").alt = this._imName;
    this._elmntSingle.querySelector(".element__name").textContent =
      this._imName;

    this._container.append(this._elmntSingle);

    this._elmntOpened = this._elmntTemplate
      .querySelector(".element__opened")
      .cloneNode(true);

    this._elmntOpened.querySelector(".element__image-expanded").src =
      this._imURL;
    this._elmntOpened.querySelector(".element__image-expanded").alt =
      this._imName;
    this._elmntOpened.querySelector(".element__image-caption").textContent =
      this._imName;

    this._elmntOpened.id = this._imName.replace(/[^a-zA-Z0-9]/g, "-");

    this._container.append(this._elmntOpened);

    this._AddLikeBtn(this._elmntSingle);
    this._AddDeleteBtn(this._elmntSingle);
    this._AddOpenBtn(this._elmntSingle);
    this._AddCloseFunction(this._elmntOpened);
  }

  _AddLikeBtn(likedElmnt) {
    this._likeBtn = likedElmnt.querySelector(".element__like-button");
    this._likeIcon = this._likeBtn.querySelector(".element__like-button-icon");

    this._handleLikeClick = () => {
      if (this._likeIcon.textContent === "🤍") {
        this._likeIcon.textContent = "🖤";
      } else {
        this._likeIcon.textContent = "🤍";
      }
    };

    this._likeBtn.addEventListener("click", this._handleLikeClick);
  }

  _AddDeleteBtn(toDeleteElmnt) {
    this._deleteBtn = toDeleteElmnt.querySelector(".element__delete-button");

    this._handleDeleteClick = () => {
      this._elmntSingle.remove();
      this._elmntOpened.remove();

      this._likeBtn.removeEventListener("click", this._handleLikeClick);
      this._imageBtn.removeEventListener("click", this._handleOpenClick);
      this._deleteBtn.removeEventListener("click", this._handleDeleteClick);
      this._closeElmntBtn.removeEventListener("click", this._handleCloseBtn);
    };

    this._deleteBtn.addEventListener("click", this._handleDeleteClick);
  }

  _AddOpenBtn(toOpenElmnt) {
    this._imageBtn = toOpenElmnt.querySelector(".element__image-button");

    this._handleOpenClick = () => {
      this._elmntOpened.style.display = "block";
    };

    this._imageBtn.addEventListener("click", this._handleOpenClick);
  }

  _AddCloseFunction(toCloseElmnt) {
    this._closeElmntBtn = toCloseElmnt.querySelector(".element__close-button");

    this._handleCloseBtn = () => {
      toCloseElmnt.style.display = "none";
    };

    this._closeElmntBtn.addEventListener("click", this._handleCloseBtn);
  }
}
