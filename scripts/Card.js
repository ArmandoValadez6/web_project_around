export default class Card {
  constructor(
    { name, link },
    elementTemplate,
    singleElementSelector,
    handleCardClick,
    handleDeleteClick
  ) {
    this._name = name;
    this._link = link;
    this._elementTemplate = elementTemplate;
    this._singleElementSelector = this._elementTemplate
      .querySelector(singleElementSelector)
      .cloneNode(true);
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
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
    this._likeBtn = newCard.querySelector(likeButtonSelector);
    this._likeIconSelector = this._likeBtn.querySelector(likeIconSelector);

    this._handleLikeClick = () => {
      if (this._likeIconSelector.textContent === "🤍") {
        this._likeIconSelector.textContent = "🖤";
      } else {
        this._likeIconSelector.textContent = "🤍";
      }
    };
    this._likeBtn.addEventListener("click", this._handleLikeClick);
  }

  _AddDeleteBtn(toDeleteElmnt, deleteButtonSelector) {
    this._deleteBtn = toDeleteElmnt.querySelector(deleteButtonSelector);
    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteClick(this._newCard);
    });
  }

  _AddOpenBtn(toOpenElmnt, imageButtonSelector, name, link) {
    this._imageBtn = toOpenElmnt.querySelector(imageButtonSelector);
    this._imageBtn.addEventListener("click", () => {
      this._handleCardClick({ name, link });
    });
  }
}
