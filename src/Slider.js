const { SLIDER_ANIM_DURATION_MS, STOCK_BEFORE_PRELOAD } = require('./values');
const Cards = require('./Cards');

class Slider {
  constructor(appInst) {
    this.appInst = appInst;
    this.cardsContainer = document.querySelector('.cards_container');
    this.leftBtn = document.querySelector('.slider--left');
    this.rightBtn = document.querySelector('.slider--right');
    this.progressElem = document.querySelector('.slider--progress');

    this.cardsContainerWidth = -1;
    this.sliderContentWidth = -1;
    this.cardWidth = -1;
    this.contentOffset = 0;
    this.firstCardIndex = 0;
    this.loadedCardsCount = 0;
    this.totalCardsCount = 0;
    this.dragStartX = 0;
    this.dragLength = 0;
    this.isMouseDown = false;
    this.isAnimating = false;

    this.cardsManager = new Cards(this, this.cardsContainer);
    this.setEventsListeners();
  }

  setEventsListeners() {
    window.addEventListener('resize', () => {
      this.updateSizes();
      this.updateButtonsState();
      this.updateProgress();
      this.preloadNextPage();
    });

    this.leftBtn.addEventListener('click', () => {
      this.buttonClickHandler(-1);
    });

    this.rightBtn.addEventListener('click', () => {
      this.buttonClickHandler(1);
    });

    this.cardsContainer.addEventListener('mousedown', (e) => {
      this.mouseDownHandler(e.x);
    });

    document.body.addEventListener('mousemove', (e) => {
      this.mouseMoveHandler(e.x);
    });

    document.body.addEventListener('mouseup', () => {
      this.mouseUpHandler();
    });

    document.body.addEventListener('mouseleave', () => {
      this.mouseUpHandler();
    });

    this.cardsContainer.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) this.mouseDownHandler(e.touches[0].clientX);
    });

    document.body.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) this.mouseMoveHandler(e.touches[0].clientX);
    });

    document.body.addEventListener('touchend', () => {
      this.mouseUpHandler();
    });

    document.body.addEventListener('touchcancel', () => {
      this.mouseUpHandler();
    });
  }

  preloadNextPage() {
    if (this.loadedCardsCount >= this.totalCardsCount) return;

    const hiddenWidth = this.cardsContainerWidth - this.sliderContentWidth;
    const rightHiddenWidth = hiddenWidth - this.contentOffset;
    const cardsHiddenInRight = rightHiddenWidth / this.cardWidth;

    if (cardsHiddenInRight > STOCK_BEFORE_PRELOAD) return;

    this.appInst.loadNextPage();
  }

  fillContainerFreeSpace() {
    if (this.sliderContentWidth >= this.cardsContainerWidth) {
      this.firstCardIndex = 0;
    } else if (this.firstCardIndex > 0) {
      const cardsWithoutSlided = this.loadedCardsCount - this.firstCardIndex;
      const mustBeVisibleCount = this.getVisibleCardsCount();

      if (cardsWithoutSlided < mustBeVisibleCount) {
        this.firstCardIndex -= 1;
      }
    }
  }

  updateSizes() {
    const someCard = document.querySelector('.card');

    if (someCard) this.cardWidth = someCard.getBoundingClientRect().width;
    else this.cardWidth = 0;

    const sliderContent = document.querySelector('.slider--content');
    this.sliderContentWidth = sliderContent.getBoundingClientRect().width;

    const cardsCount = this.cardsContainer.children.length;
    this.cardsContainerWidth = this.cardWidth * cardsCount;

    this.fillContainerFreeSpace();

    this.setContentOffset(this.firstCardIndex * this.cardWidth);
  }

  getVisibleCardsCount() {
    if (this.sliderContentWidth < this.cardsContainerWidth) {
      return Math.floor(this.sliderContentWidth / this.cardWidth);
    }

    return this.cardsContainerWidth / this.cardWidth;
  }

  contentReplaceHandler() {
    this.firstCardIndex = 0;
    this.updateSizes();
    this.updateButtonsState();
    this.updateProgress();
  }

  buttonClickHandler(direction) {
    if (this.isAnimating) return;

    this.firstCardIndex += direction;
    this.animateMovingContent(direction * this.cardWidth);
  }

  mouseDownHandler(clientX) {
    if (this.isAnimating) return;

    this.isMouseDown = true;
    this.dragStartX = clientX + this.contentOffset;
    this.dragLength = 0;
  }

  mouseMoveHandler(clientX) {
    if (!this.isMouseDown) return;

    const left = clientX - this.dragStartX;
    const hiddenWidth = this.cardsContainerWidth - this.sliderContentWidth;

    if (left > 0 || -left > hiddenWidth) return;

    this.contentOffset = -left;
    this.cardsContainer.style.left = `${left}px`;
  }

  mouseUpHandler() {
    if (!this.isMouseDown) return;

    this.isMouseDown = false;

    this.removeContainerFreeSpace();
  }

  removeContainerFreeSpace() {
    const hiddenCardPartWidth = this.contentOffset % this.cardWidth;
    this.firstCardIndex = Math.round(this.contentOffset / this.cardWidth);

    if (hiddenCardPartWidth >= this.cardWidth / 2) {
      this.animateMovingContent(this.cardWidth - hiddenCardPartWidth);
    } else if (hiddenCardPartWidth) {
      this.animateMovingContent(-hiddenCardPartWidth);
    } else {
      this.updateButtonsState();
      this.updateProgress();
      this.preloadNextPage();
    }
  }

  updateButtonsState() {
    const hiddenWidth = this.cardsContainerWidth - this.sliderContentWidth;
    const isRightEndReached = this.contentOffset >= hiddenWidth;
    const isLeftEndReached = this.contentOffset === 0;

    if (isRightEndReached) {
      this.rightBtn.classList.add('hidden');
    } else {
      this.rightBtn.classList.remove('hidden');
    }

    if (isLeftEndReached) {
      this.leftBtn.classList.add('hidden');
    } else {
      this.leftBtn.classList.remove('hidden');
    }
  }

  setContentOffset(offset) {
    this.contentOffset = offset;
    this.cardsContainer.style.left = `${-this.contentOffset}px`;
  }

  animateMovingContent(offset) {
    const startOffset = this.contentOffset;
    const duration = SLIDER_ANIM_DURATION_MS;
    const timeStart = performance.now();

    const move = (timeNow) => {
      const timePassed = timeNow - timeStart;

      if (timePassed < duration) {
        const stepDistance = offset * (timePassed / duration);

        this.setContentOffset(startOffset + stepDistance);

        requestAnimationFrame(move);
      } else {
        this.setContentOffset(startOffset + offset);
        this.updateButtonsState();
        this.updateProgress();
        this.preloadNextPage();

        this.isAnimating = false;
      }
    };

    this.isAnimating = true;
    requestAnimationFrame(move);
  }

  updateProgress() {
    const cardsDisplaying = Math.round(
      this.sliderContentWidth / this.cardWidth,
    );
    this.progressElem.value = this.firstCardIndex + cardsDisplaying;
  }

  contentAddHandler() {
    const cardsCount = this.cardsContainer.children.length;
    this.cardsContainerWidth = this.cardWidth * cardsCount;
    this.updateButtonsState();
  }

  setData(data, total) {
    this.loadedCardsCount = data.length;
    this.totalCardsCount = total;
    this.progressElem.max = total;

    this.cardsManager.setData(data);
  }

  concatData(data) {
    this.loadedCardsCount += data.length;

    this.cardsManager.concatData(data);
  }
}

module.exports = Slider;
