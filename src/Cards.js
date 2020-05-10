const { IMDB_URL, POSTER_NA } = require('./values');
const Utils = require('./Utils');
const Fetcher = require('./Fetcher');

class Cards {
  constructor(sliderInst, parentElem) {
    this.sliderInst = sliderInst;
    this.parent = parentElem;
    this.data = null;
    this.isCardContainerVisible = false;

    this.firstCardsLoadedIndicatorList = [];

    this.parent.addEventListener('transitionend', (event) => {
      if (event.target !== this.parent) return;
      if (this.isCardContainerVisible) return;

      this.replaceCards();
    });
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
    this.createCards(this.data);

    this.sliderInst.contentReplaceHandler();
  }

  reveal(card, index) {
    if (card.classList.contains('noimg')) return;
    if (card.classList.contains('norating')) return;
    if (!this.isCardContainerVisible) {
      this.firstCardsLoadedIndicatorList[index] = true;

      const isCardsFullyLoaded = this.firstCardsLoadedIndicatorList.every(
        (item) => item,
      );

      if (isCardsFullyLoaded) this.revealCardsContainer();
    }

    card.classList.remove('transparent');
  }

  createRatingElements(parentElem, rating, card, cardIndex) {
    const parent = parentElem;

    parent.textContent = '';

    const img = Utils.createElem('img', 'rating--star', parentElem);
    img.alt = 'rating imdb';
    img.src = './assets/ico/star.svg';

    Utils.createElem('div', 'rating--text', parentElem, rating);

    card.classList.remove('norating');
    this.reveal(card, cardIndex);
  }

  getImdbRating(id, parentElem, card, cardIndex) {
    const callback = (rating) => {
      this.createRatingElements(parentElem, rating, card, cardIndex);
    };

    Fetcher.fetchImdbRating(id, callback);
  }

  loadPoster(card, imgContainer, data, cardIndex) {
    const img = Utils.createElem('img', 'card--img', imgContainer);
    img.alt = data.Title;
    img.src = data.Poster;

    img.addEventListener('load', () => {
      card.classList.remove('noimg');
      this.reveal(card, cardIndex);
    });

    img.addEventListener('error', () => {
      this.setEmptyPoster(imgContainer, card, cardIndex);
    });
  }

  setEmptyPoster(imgContainer, card, cardIndex) {
    const container = imgContainer;

    container.textContent = POSTER_NA;
    card.classList.remove('noimg');
    this.reveal(card, cardIndex);
  }

  getNewCard(data, cardIndex) {
    const card = Utils.createElem('div', 'card transparent noimg norating');

    const title = Utils.createElem('a', 'card--title', card, data.Title);
    title.title = data.Title;
    title.href = new URL(`title/${data.imdbID}/videogallery/`, IMDB_URL);

    const imgContainer = Utils.createElem('div', 'card--img_container', card);

    if (data.Poster !== 'N/A') {
      this.loadPoster(card, imgContainer, data, cardIndex);
    } else {
      this.setEmptyPoster(imgContainer, card, cardIndex);
    }

    Utils.createElem('div', 'card--year', card, data.Year);

    const rating = Utils.createElem('div', 'card--rating', card, data.imdbId);
    Utils.createLoadingPlaceholder(rating);

    this.getImdbRating(data.imdbID, rating, card, cardIndex);

    return card;
  }

  createCards(data) {
    const fragment = new DocumentFragment();

    data.forEach((movie, cardIndex) => {
      const card = this.getNewCard(movie, cardIndex);
      fragment.append(card);
    });

    this.parent.append(fragment);
  }

  setData(data) {
    if (!data) return;

    this.data = data;
    this.firstCardsLoadedIndicatorList = new Array(data.length).fill(false);

    if (this.parent.children.length) this.hideOldCardsRevealNew();
    else this.replaceCards();
  }

  concatData(data) {
    if (!data) return;

    this.data = this.data.concat(data);

    this.createCards(data);
    this.sliderInst.contentAddHandler();
  }
}

module.exports = Cards;
