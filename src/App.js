const Fetcher = require('./Fetcher');
const Slider = require('./Slider');
const Search = require('./Search');
const { DEFAULT_SEARCH_STR } = require('./values');
const KeyboardApp = require('./KeyboardApp');
const Speech = require('./Speech');

class App {
  constructor() {
    this.keyboardContainer = document.querySelector('.keyboard--container');
    this.keyboardInst = new KeyboardApp(this.keyboardContainer);
    this.sliderInst = new Slider(this);
    this.searchInst = new Search(this, this.sliderInst);
    this.speechInst = new Speech(this);

    this.isLoading = false;
    this.page = 1;
    this.searchStr = DEFAULT_SEARCH_STR;
  }

  loadNewCards(searchStr) {
    if (this.isLoading || this.searchStr === searchStr) {
      this.searchInst.searchingEndHandler();
      return;
    }

    this.isLoading = true;

    if (searchStr) this.searchStr = searchStr;

    const searchCallback = (dataObj) => {
      const errorMsg = dataObj.error || null;

      if (dataObj.data) this.sliderInst.setData(dataObj.data, dataObj.total);

      this.searchInst.searchingEndHandler(errorMsg);
      this.isLoading = false;
      this.page = 1;
    };

    Fetcher.fetchMovieData(this.searchStr, searchCallback);
  }

  loadNextPage() {
    if (this.isLoading) return;

    this.searchInst.loadingImg.classList.remove('hidden');
    this.isLoading = true;
    this.page += 1;

    const nextPageCallback = (dataObj) => {
      const errorMsg = dataObj.error || null;

      if (dataObj.data) this.sliderInst.concatData(dataObj.data);

      this.searchInst.searchingEndHandler(errorMsg);
      this.isLoading = false;
    };

    Fetcher.fetchMovieData(this.searchStr, nextPageCallback, this.page);
  }

  searchBySpeech() {
    this.searchInst.searchSubmit();
    this.keyboardInst.updateClearBtnState();
  }
}

module.exports = App;
