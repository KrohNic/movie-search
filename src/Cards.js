const { IMDB_URL, POSTER_NA } = require('./values');
const Utils = require('./Utils');
const Fetcher = require('./Fetcher');

class Cards {
  constructor(sliderInst, parentElem) {
    this.sliderInst = sliderInst;
    this.parent = parentElem;
    this.data = null;
    this.isCardContainerVisible = false;

    this.parent.addEventListener('transitionend', (event) => {
      if (event.target !== this.parent) return;
      if (this.isCardContainerVisible) return;

      this.replaceCards();
    });
  }

  static prepareData(data) {
    return data.map((movieData) => ({
      data: movieData,
      isFullyLoaded: false,
      isRatingLoaded: false,
      cardElement: null,
    }));
  }

  static createRatingElements(parentElem, ratingStr) {
    const parent = parentElem;

    parent.textContent = '';

    const img = Utils.createElem('img', 'rating--star', parentElem);
    img.alt = 'rating imdb';
    img.src = './assets/ico/star.svg';

    Utils.createElem('div', 'rating--text', parentElem, ratingStr);
  }

  hideOldCardsRevealNew() {
    this.isCardContainerVisible = false;
    this.parent.classList.add('transparent');
  }

  revealCardsContainer() {
    this.isCardContainerVisible = true;
    this.parent.classList.remove('transparent');
  }

  replaceCards() {
    this.parent.textContent = '';
    this.createCards();

    this.sliderInst.contentReplaceHandler();
  }

  reveal(cardIndex) {
    const cardData = this.data[cardIndex];

    if (!cardData.isPosterLoaded) return;
    if (!cardData.isRatingLoaded) return;

    cardData.cardElement.classList.remove('transparent');

    if (this.isCardContainerVisible) return;

    const first = this.sliderInst.firstCardIndex;
    const last = first + this.sliderInst.getVisibleCardsCount();

    let isCardsFullyLoaded = true;

    for (let i = first; i < last; i += 1) {
      const item = this.data[i];

      if (!item) return;

      if (!item.isPosterLoaded || !item.isRatingLoaded) {
        isCardsFullyLoaded = false;
      }
    }

    if (isCardsFullyLoaded) this.revealCardsContainer();
  }

  getImdbRating(id, parentElem, cardIndex) {
    const callback = (rating) => {
      Cards.createRatingElements(parentElem, rating);
      this.data[cardIndex].isRatingLoaded = true;
      this.reveal(cardIndex);
    };

    Fetcher.fetchImdbRating(id, callback);
  }

  setEmptyPoster(imgContainer, cardIndex) {
    const container = imgContainer;

    container.textContent = POSTER_NA;
    this.data[cardIndex].isPosterLoaded = true;
    this.reveal(cardIndex);
  }

  loadPoster(imgContainer, cardIndex) {
    const { data } = this.data[cardIndex];
    const img = Utils.createElem('img', 'card--img', imgContainer);

    img.alt = data.Title;
    img.src = data.Poster;

    img.addEventListener('load', () => {
      this.data[cardIndex].isPosterLoaded = true;
      this.reveal(cardIndex);
    });

    img.addEventListener('error', () => {
      this.setEmptyPoster(imgContainer, cardIndex);
    });
  }

  getNewCard(cardIndex) {
    const { data } = this.data[cardIndex];
    const card = Utils.createElem('div', 'card transparent');

    this.data[cardIndex].cardElement = card;

    const title = Utils.createElem('a', 'card--title', card, data.Title);
    title.title = data.Title;
    title.href = new URL(`title/${data.imdbID}/videogallery/`, IMDB_URL);

    const imgContainer = Utils.createElem('div', 'card--img_container', card);

    if (data.Poster !== 'N/A') {
      this.loadPoster(imgContainer, cardIndex);
    } else {
      this.setEmptyPoster(imgContainer, cardIndex);
    }

    Utils.createElem('div', 'card--year', card, data.Year);

    const ratingContainer = Utils.createElem(
      'div',
      'card--rating',
      card,
      data.imdbId,
    );
    Utils.createLoadingPlaceholder(ratingContainer);

    this.getImdbRating(data.imdbID, ratingContainer, cardIndex);

    return card;
  }

  createCards() {
    const fragment = new DocumentFragment();

    this.data.forEach((cardData, cardIndex) => {
      if (cardData.cardElement) return;

      const card = this.getNewCard(cardIndex);
      fragment.append(card);
    });

    this.parent.append(fragment);
  }

  setData(data) {
    if (!data) return;

    this.data = Cards.prepareData(data);

    if (this.parent.children.length) this.hideOldCardsRevealNew();
    else this.replaceCards();
  }

  concatData(data) {
    if (!data) return;

    const preparedData = Cards.prepareData(data);

    this.data = this.data.concat(preparedData);
    this.createCards();
    this.sliderInst.contentAddHandler();
  }
}

module.exports = Cards;
