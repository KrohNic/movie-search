const Fetcher = require('./Fetcher');

class Search {
  constructor(AppInst, sliderInst) {
    this.AppInst = AppInst;
    this.sliderInst = sliderInst;
    this.submitBtn = document.querySelector('.search--submit_button');
    this.input = document.querySelector('.search--input');
    this.notification = document.querySelector('.notification');
    this.loadingImg = document.querySelector('.search--loading');
    this.setEventsListeners();
  }

  setEventsListeners() {
    this.submitBtn.addEventListener('click', () => {
      this.searchSubmit();
    });

    document.querySelector('#Enter').addEventListener('click', () => {
      this.searchSubmit();
    });

    this.input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') this.searchSubmit();
    });
  }

  searchingEndHandler(notification) {
    this.loadingImg.classList.add('hidden');

    if (notification) this.notification.textContent = notification;
  }

  searchSubmit() {
    const searchStr = this.input.value;

    this.notification.textContent = '';

    if (!searchStr) return;

    this.loadingImg.classList.remove('hidden');

    const isRuLang = /[а-я]/i.test(searchStr);

    if (isRuLang) {
      const translationCallback = (translatedStr) => {
        this.AppInst.loadNewCards(translatedStr);
        this.notification.textContent = `Showing results for "${translatedStr}"`;
      };

      Fetcher.fetchTranslation(searchStr, translationCallback);
    } else {
      this.AppInst.loadNewCards(searchStr);
    }
  }
}

module.exports = Search;
