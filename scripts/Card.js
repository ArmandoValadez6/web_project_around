export default class Card {
  constructor(
    { name, link, isLiked, _id },
    elementTemplate,
    singleElementSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._cardId = _id;
    this._likeStatus = isLiked;
    this._elementTemplate = elementTemplate;
    this._singleElementSelector = this._elementTemplate
      .querySelector(singleElementSelector)
      .cloneNode(true);
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  CreateCard(
    { cardImageSelector, cardCaptionSelector },
    { likeButtonSelector, deleteButtonSelector, imageButtonSelector },
    likeIconSelector
  ) {
    this._newCard = this._singleElementSelector;

    this._newCard.querySelector(cardImageSelector).src = this._link;
    this._newCard.querySelector(cardImageSelector).alt = this._name;
    this._newCard.querySelector(cardCaptionSelector).textContent = this._name;

    this._AddLikeBtn(this._newCard, likeButtonSelector, likeIconSelector);
    this._AddDeleteBtn(this._newCard, deleteButtonSelector);
    this._AddOpenBtn(
      this._newCard,
      imageButtonSelector,
      this._name,
      this._link
    );

    return this._newCard;
  }

  _AddLikeBtn(newCard, likeButtonSelector, likeIconSelector) {
    const likeBtn = newCard.querySelector(likeButtonSelector);
    const likeIcon = likeBtn.querySelector(likeIconSelector);
    if (this._likeStatus == true) {
      likeIcon.textContent = "🖤";
    }

    likeBtn.addEventListener("click", () => {
      this._handleLikeClick(likeIcon, this._cardId, this._likeStatus);
      this._likeStatus = !this._likeStatus;
    });
  }

  _AddDeleteBtn(toDeleteElmnt, deleteButtonSelector) {
    this._deleteBtn = toDeleteElmnt.querySelector(deleteButtonSelector);
    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteClick(undefined, this._cardId, this._newCard);
    });
  }

  _AddOpenBtn(toOpenElmnt, imageButtonSelector, name, link) {
    this._imageBtn = toOpenElmnt.querySelector(imageButtonSelector);
    this._imageBtn.addEventListener("click", () => {
      this._handleCardClick({ name, link });
    });
  }
}
