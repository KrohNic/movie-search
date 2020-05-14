/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Fetcher = __webpack_require__(/*! ./Fetcher */ "./src/Fetcher.js");

var Slider = __webpack_require__(/*! ./Slider */ "./src/Slider.js");

var Search = __webpack_require__(/*! ./Search */ "./src/Search.js");

var KeyboardApp = __webpack_require__(/*! ./KeyboardApp */ "./src/KeyboardApp.js");

var Speech = __webpack_require__(/*! ./Speech */ "./src/Speech.js");

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    this.keyboardContainer = document.querySelector('.keyboard--container');
    this.keyboardInst = new KeyboardApp(this.keyboardContainer);
    this.sliderInst = new Slider(this);
    this.searchInst = new Search(this, this.sliderInst);
    this.speechInst = new Speech(this);
    this.isLoading = false;
    this.page = 1;
    this.searchStr = '';
  }

  _createClass(App, [{
    key: "loadNewCards",
    value: function loadNewCards(searchStr) {
      var _this = this;

      if (this.isLoading || this.searchStr === searchStr) {
        this.searchInst.searchingEndHandler();
        return;
      }

      this.isLoading = true;

      var searchCallback = function searchCallback(dataObj) {
        var errorMsg = dataObj.error || false;

        if (dataObj.data) {
          _this.sliderInst.setData(dataObj.data, dataObj.total);

          _this.searchStr = searchStr;
        }

        _this.searchInst.searchingEndHandler(errorMsg);

        _this.isLoading = false;
        _this.page = 1;
      };

      if (searchStr) Fetcher.fetchMovieData(searchStr, searchCallback);
    }
  }, {
    key: "loadNextPage",
    value: function loadNextPage() {
      var _this2 = this;

      if (this.isLoading) return;
      this.searchInst.loadingImg.classList.remove('hidden');
      this.isLoading = true;
      this.page += 1;

      var nextPageCallback = function nextPageCallback(dataObj) {
        var errorMsg = dataObj.error || null;
        if (dataObj.data) _this2.sliderInst.concatData(dataObj.data);

        _this2.searchInst.searchingEndHandler(errorMsg);

        _this2.isLoading = false;
      };

      Fetcher.fetchMovieData(this.searchStr, nextPageCallback, this.page);
    }
  }, {
    key: "searchBySpeech",
    value: function searchBySpeech() {
      this.searchInst.searchSubmit();
      this.keyboardInst.updateClearBtnState();
    }
  }]);

  return App;
}();

module.exports = App;

/***/ }),

/***/ "./src/Cards.js":
/*!**********************!*\
  !*** ./src/Cards.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = __webpack_require__(/*! ./values */ "./src/values.js"),
    IMDB_URL = _require.IMDB_URL,
    POSTER_NA = _require.POSTER_NA;

var Utils = __webpack_require__(/*! ./Utils */ "./src/Utils.js");

var Fetcher = __webpack_require__(/*! ./Fetcher */ "./src/Fetcher.js");

var Cards = /*#__PURE__*/function () {
  function Cards(sliderInst, parentElem) {
    var _this = this;

    _classCallCheck(this, Cards);

    this.sliderInst = sliderInst;
    this.parent = parentElem;
    this.data = null;
    this.isCardContainerVisible = false;
    this.parent.addEventListener('transitionend', function (event) {
      if (event.target !== _this.parent) return;
      if (_this.isCardContainerVisible) return;

      _this.replaceCards();
    });
  }

  _createClass(Cards, [{
    key: "hideOldCardsRevealNew",
    value: function hideOldCardsRevealNew() {
      this.isCardContainerVisible = false;
      this.parent.classList.add('transparent');
    }
  }, {
    key: "revealCardsContainer",
    value: function revealCardsContainer() {
      this.isCardContainerVisible = true;
      this.parent.classList.remove('transparent');
    }
  }, {
    key: "replaceCards",
    value: function replaceCards() {
      this.parent.textContent = '';
      this.createCards();
      this.sliderInst.contentReplaceHandler();
    }
  }, {
    key: "reveal",
    value: function reveal(cardIndex) {
      var cardData = this.data[cardIndex];
      if (!cardData.isPosterLoaded) return;
      if (!cardData.isRatingLoaded) return;
      cardData.cardElement.classList.remove('transparent');
      if (this.isCardContainerVisible) return;
      var first = this.sliderInst.firstCardIndex;
      var last = first + this.sliderInst.getVisibleCardsCount();
      var isCardsFullyLoaded = true;

      for (var i = first; i < last; i += 1) {
        var item = this.data[i];
        if (!item) return;

        if (!item.isPosterLoaded || !item.isRatingLoaded) {
          isCardsFullyLoaded = false;
        }
      }

      if (isCardsFullyLoaded) this.revealCardsContainer();
    }
  }, {
    key: "getImdbRating",
    value: function getImdbRating(id, parentElem, cardIndex) {
      var _this2 = this;

      var callback = function callback(rating) {
        Cards.createRatingElements(parentElem, rating);
        _this2.data[cardIndex].isRatingLoaded = true;

        _this2.reveal(cardIndex);
      };

      Fetcher.fetchImdbRating(id, callback);
    }
  }, {
    key: "setEmptyPoster",
    value: function setEmptyPoster(imgContainer, cardIndex) {
      var container = imgContainer;
      container.textContent = POSTER_NA;
      this.data[cardIndex].isPosterLoaded = true;
      this.reveal(cardIndex);
    }
  }, {
    key: "loadPoster",
    value: function loadPoster(imgContainer, cardIndex) {
      var _this3 = this;

      var data = this.data[cardIndex].data;
      var img = Utils.createElem('img', 'card--img', imgContainer);
      img.alt = data.Title;
      img.src = data.Poster;
      img.addEventListener('load', function () {
        _this3.data[cardIndex].isPosterLoaded = true;

        _this3.reveal(cardIndex);
      });
      img.addEventListener('error', function () {
        _this3.setEmptyPoster(imgContainer, cardIndex);
      });
    }
  }, {
    key: "getNewCard",
    value: function getNewCard(cardIndex) {
      var data = this.data[cardIndex].data;
      var card = Utils.createElem('div', 'card transparent');
      this.data[cardIndex].cardElement = card;
      var title = Utils.createElem('a', 'card--title', card, data.Title);
      title.title = data.Title;
      title.href = new URL("title/".concat(data.imdbID, "/videogallery/"), IMDB_URL);
      var imgContainer = Utils.createElem('div', 'card--img_container', card);

      if (data.Poster !== 'N/A') {
        this.loadPoster(imgContainer, cardIndex);
      } else {
        this.setEmptyPoster(imgContainer, cardIndex);
      }

      Utils.createElem('div', 'card--year', card, data.Year);
      var ratingContainer = Utils.createElem('div', 'card--rating', card, data.imdbId);
      Utils.createLoadingPlaceholder(ratingContainer);
      this.getImdbRating(data.imdbID, ratingContainer, cardIndex);
      return card;
    }
  }, {
    key: "createCards",
    value: function createCards() {
      var _this4 = this;

      var fragment = new DocumentFragment();
      this.data.forEach(function (cardData, cardIndex) {
        if (cardData.cardElement) return;

        var card = _this4.getNewCard(cardIndex);

        fragment.append(card);
      });
      this.parent.append(fragment);
    }
  }, {
    key: "setData",
    value: function setData(data) {
      if (!data) return;
      this.data = Cards.prepareData(data);
      if (this.parent.children.length) this.hideOldCardsRevealNew();else this.replaceCards();
    }
  }, {
    key: "concatData",
    value: function concatData(data) {
      if (!data) return;
      var preparedData = Cards.prepareData(data);
      this.data = this.data.concat(preparedData);
      this.createCards();
      this.sliderInst.contentAddHandler();
    }
  }], [{
    key: "prepareData",
    value: function prepareData(data) {
      return data.map(function (movieData) {
        return {
          data: movieData,
          isFullyLoaded: false,
          isRatingLoaded: false,
          cardElement: null
        };
      });
    }
  }, {
    key: "createRatingElements",
    value: function createRatingElements(parentElem, ratingStr) {
      var parent = parentElem;
      parent.textContent = '';
      var img = Utils.createElem('img', 'rating--star', parentElem);
      img.alt = 'rating imdb';
      img.src = './assets/ico/star.svg';
      Utils.createElem('div', 'rating--text', parentElem, ratingStr);
    }
  }]);

  return Cards;
}();

module.exports = Cards;

/***/ }),

/***/ "./src/Fetcher.js":
/*!************************!*\
  !*** ./src/Fetcher.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var values = __webpack_require__(/*! ./values */ "./src/values.js");

var Fetcher = /*#__PURE__*/function () {
  function Fetcher() {
    _classCallCheck(this, Fetcher);
  }

  _createClass(Fetcher, null, [{
    key: "basicFetcher",
    value: function basicFetcher(url, responseCallback, rejectCallback) {
      fetch(url).then(function (res) {
        if (res.status >= 200 && res.status < 300) return res.json();
        throw new Error(res.status);
      }).then(function (json) {
        responseCallback(json);
      })["catch"](function (error) {
        var mess = +error.message;

        if (rejectCallback && mess >= 400 && mess < 600) {
          rejectCallback("API ".concat(error)); // eslint-disable-next-line no-console
        } else console.error(error);
      });
    }
  }, {
    key: "fetchImdbRating",
    value: function fetchImdbRating(id, callback) {
      var url = new URL(values.OMDB_API_URL);
      url.searchParams.set('i', id);
      url.searchParams.set('apikey', values.OMDB_KEY);

      var ratingCallback = function ratingCallback(json) {
        var rating = json.Ratings.find(function (item) {
          return item.Source === values.IMDB_NAME;
        });
        if (rating) callback(rating.Value);else callback(values.RATING_NA);
      };

      Fetcher.basicFetcher(url, ratingCallback);
    }
  }, {
    key: "fetchTranslation",
    value: function fetchTranslation(str, callback) {
      var url = new URL(values.TRANSLATIONS_URL + str);

      var translationCallback = function translationCallback(json) {
        if (json.text) callback(json.text[0]);else callback(str);
      };

      Fetcher.basicFetcher(url, translationCallback);
    }
  }, {
    key: "fetchMovieData",
    value: function fetchMovieData(searchQuery, callback) {
      var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var url = new URL(values.OMDB_API_URL);
      url.searchParams.set('apikey', values.OMDB_KEY);
      url.searchParams.set('page', page);
      url.searchParams.set('s', searchQuery);
      url.searchParams.set('type', 'movie');

      var searchCallback = function searchCallback(json) {
        var dataObj;

        if (json.Error) {
          dataObj = {
            error: "".concat(values.NO_SEARCH_RESULT_TEXT, " ").concat(searchQuery)
          };
        } else dataObj = {
          data: json.Search,
          total: json.totalResults
        };

        callback(dataObj);
      };

      var rejectCallback = function rejectCallback(message) {
        callback({
          error: message
        });
      };

      Fetcher.basicFetcher(url, searchCallback, rejectCallback);
    }
  }]);

  return Fetcher;
}();

module.exports = Fetcher;

/***/ }),

/***/ "./src/Key.js":
/*!********************!*\
  !*** ./src/Key.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Key = /*#__PURE__*/function () {
  function Key(keyboardInst, value, keyCode) {
    _classCallCheck(this, Key);

    this.keyboardInst = keyboardInst;
    this.value = value;
    this.keyCode = keyCode;
    this.area = keyboardInst.area; // in ru_lang they are letters, but in en_lang - symbols

    this.mixedKeys = ['Backquote', 'BracketLeft', 'BracketRight', 'Semicolon', 'Quote', 'Comma', 'Period'];
  }

  _createClass(Key, [{
    key: "appendTo",
    value: function appendTo(fragment) {
      var _this = this;

      var button = document.createElement('button');
      button.classList.add('keyboard--button');

      if (this.value) {
        if (this.keyCode.includes('Key')) {
          button.classList.add('letter');
        } else if (this.mixedKeys.includes(this.keyCode)) {
          button.classList.add('mixed');
        } else {
          button.classList.add('symbol');
        }

        button.append(this.value);
      } else {
        button.classList.add('functional');
        button.classList.add(this.keyCode.toLowerCase());
        button.append(this.keyCode);
      }

      button.addEventListener('mousedown', function (e) {
        return _this.keyDown(e);
      });
      button.addEventListener('mouseup', function () {
        return _this.keyUp();
      });
      button.addEventListener('mouseout', function () {
        return _this.keyUp();
      });
      button.id = this.keyCode;
      fragment.append(button);
      return fragment;
    }
  }, {
    key: "backspace",
    value: function backspace() {
      if (this.area.selectionStart === this.area.selectionEnd) {
        if (this.area.selectionStart <= 0) return;
        this.area.setRangeText('', this.area.selectionStart - 1, this.area.selectionStart, 'end');
      } else {
        this.printText('');
      }
    }
  }, {
    key: "printText",
    value: function printText(text) {
      this.area.setRangeText(text, this.area.selectionStart, this.area.selectionEnd, 'end');
    }
  }, {
    key: "moveCursorLeft",
    value: function moveCursorLeft(ShiftLeft) {
      if (ShiftLeft.classList.contains('button_active')) {
        if (this.area.selectionStart !== this.area.selectionEnd && this.area.selectionDirection === 'forward') {
          this.area.setSelectionRange(this.area.selectionStart, this.area.selectionEnd - 1, 'forward');
        } else if (this.area.selectionStart > 0) {
          this.area.setSelectionRange(this.area.selectionStart - 1, this.area.selectionEnd, 'backward');
        }
      } else if (this.area.selectionStart === 0) {
        this.area.setSelectionRange(this.area.selectionStart, this.area.selectionStart);
      } else {
        this.area.setSelectionRange(this.area.selectionStart - 1, this.area.selectionStart - 1);
      }
    }
  }, {
    key: "moveCursorRight",
    value: function moveCursorRight(ShiftLeft) {
      if (ShiftLeft.classList.contains('button_active')) {
        if (this.area.selectionStart === this.area.selectionEnd || this.area.selectionDirection === 'forward') {
          this.area.setSelectionRange(this.area.selectionStart, this.area.selectionEnd + 1, 'forward');
        } else {
          this.area.setSelectionRange(this.area.selectionStart + 1, this.area.selectionEnd, 'backward');
        }
      } else if (this.area.value.length === this.area.selectionEnd) {
        this.area.setSelectionRange(this.area.selectionEnd, this.area.selectionEnd);
      } else {
        this.area.setSelectionRange(this.area.selectionEnd + 1, this.area.selectionEnd + 1);
      }
    }
  }, {
    key: "repeatKey",
    value: function repeatKey(fn, keyValue) {
      var keyRepeatInterval = 175;
      fn(keyValue);
      this.interval = setInterval(fn, keyRepeatInterval, keyValue);
    }
  }, {
    key: "keyDown",
    value: function keyDown(event) {
      var _this2 = this;

      var ShiftLeft = document.getElementById('ShiftLeft');
      var ShiftRight = document.getElementById('ShiftRight');
      var AltLeft = document.getElementById('AltLeft');
      var AltRight = document.getElementById('AltRight');

      switch (event.target.id) {
        case 'Backspace':
          this.repeatKey(function () {
            _this2.backspace();
          });
          break;

        case 'Space':
          this.printText(' ');
          break;

        case 'Tab':
          this.repeatKey(function () {
            _this2.printText('    ');
          });
          break;

        case 'Enter':
          break;

        case 'ShiftLeft':
        case 'ShiftRight':
          ShiftLeft.classList.toggle('button_active');
          ShiftRight.classList.toggle('button_active');

          if (AltLeft.classList.contains('button_active')) {
            ShiftLeft.classList.remove('button_active');
            ShiftRight.classList.remove('button_active');
            AltLeft.classList.remove('button_active');
            AltRight.classList.remove('button_active');
            this.keyboardInst.changeLang();
          } else {
            this.keyboardInst.toggleCase();
            this.keyboardInst.shiftSymbols();
          }

          break;

        case 'CapsLock':
          this.keyboardInst.toggleCase();
          break;

        case 'AltLeft':
        case 'AltRight':
          AltLeft.classList.toggle('button_active');
          AltRight.classList.toggle('button_active');

          if (ShiftLeft.classList.contains('button_active')) {
            ShiftLeft.classList.remove('button_active');
            ShiftRight.classList.remove('button_active');
            AltLeft.classList.remove('button_active');
            AltRight.classList.remove('button_active');
            this.keyboardInst.changeLang();
          }

          break;

        case 'Lang':
          this.keyboardInst.changeLang();
          break;

        case 'ArrowLeft':
          this.repeatKey(function () {
            _this2.moveCursorLeft(ShiftLeft);
          });
          break;

        case 'ArrowRight':
          this.repeatKey(function () {
            _this2.moveCursorRight(ShiftLeft);
          });
          break;

        default:
          this.repeatKey(function (text) {
            _this2.printText(text);
          }, event.target.textContent);
          break;
      }
    }
  }, {
    key: "keyUp",
    value: function keyUp() {
      clearInterval(this.interval);
      this.keyboardInst.keyboardAppInst.updateClearBtnState();
      this.area.focus();
    }
  }]);

  return Key;
}();

module.exports = Key;

/***/ }),

/***/ "./src/Keyboard.js":
/*!*************************!*\
  !*** ./src/Keyboard.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Keyboard = /*#__PURE__*/function () {
  function Keyboard(keyboardAppInst) {
    _classCallCheck(this, Keyboard);

    this.symbols = [[['`~ёЁ', 'Backquote'], ['1!1!', 'Digit1'], ['2@2"', 'Digit2'], ['3#3№', 'Digit3'], ['4$4;', 'Digit4'], ['5%5%', 'Digit5'], ['6^6:', 'Digit6'], ['7&7&', 'Digit7'], ['8*8*', 'Digit8'], ['9(9(', 'Digit9'], ['0)0)', 'Digit0'], ['-_-_', 'Minus'], ['=+=+', 'Equal'], ['', 'Backspace']], [['', 'Tab'], ['qQйЙ', 'KeyQ'], ['wWцЦ', 'KeyW'], ['eEуУ', 'KeyE'], ['rRкК', 'KeyR'], ['tTеЕ', 'KeyT'], ['yYнН', 'KeyY'], ['uUгГ', 'KeyU'], ['iIшШ', 'KeyI'], ['oOщЩ', 'KeyO'], ['pPзЗ', 'KeyP'], ['[{хХ', 'BracketLeft'], [']}ъЪ', 'BracketRight'], ['\\|\\/', 'Backslash']], [['', 'CapsLock'], ['aAфФ', 'KeyA'], ['sSыЫ', 'KeyS'], ['dDвВ', 'KeyD'], ['fFаА', 'KeyF'], ['gGпП', 'KeyG'], ['hHрР', 'KeyH'], ['jJоО', 'KeyJ'], ['kKлЛ', 'KeyK'], ['lLдД', 'KeyL'], [';:жЖ', 'Semicolon'], ["'\"эЭ", 'Quote'], ['', 'Enter']], [['', 'ShiftLeft'], ['zZяЯ', 'KeyZ'], ['xXчЧ', 'KeyX'], ['cCсС', 'KeyC'], ['vVмМ', 'KeyV'], ['bBиИ', 'KeyB'], ['nNтТ', 'KeyN'], ['mMьЬ', 'KeyM'], [',<бБ', 'Comma'], ['.>юЮ', 'Period'], ['/?.,', 'Slash'], ['', 'ShiftRight']], [['', 'ControlLeft'], ['', 'AltLeft'], ['', 'Space'], ['', 'AltRight'], ['', 'Lang'], ['◄◄◄◄', 'ArrowLeft'], ['►►►►', 'ArrowRight']]];
    this.keyboardAppInst = keyboardAppInst;
    this.area = keyboardAppInst.area;
    this.isEngLang = true;
    this.isUpperCase = true;
    this.isShiftPressed = false;
    this.cursorPosition = 0;
    this.buttonsEn = null;
    this.mixedKeys = null;
    this.buttonsRu = null;
  }

  _createClass(Keyboard, [{
    key: "initKeySets",
    value: function initKeySets() {
      this.buttonsEn = Array.from(document.querySelectorAll('.letter'));
      this.mixedKeys = Array.from(document.querySelectorAll('.mixed'));
      this.buttonsSymbolRu = Array.from(document.querySelectorAll('.symbol'));
      this.buttonsSymbolEn = this.buttonsSymbolRu.concat(this.mixedKeys);
      this.buttonsRu = this.buttonsEn.concat(this.mixedKeys);
    }
  }, {
    key: "changeLang",
    value: function changeLang() {
      var _this = this;

      this.isEngLang = !this.isEngLang;
      window.localStorage.setItem('lang', this.isEngLang);
      this.buttonsRu.forEach(function (button) {
        var btn = button;
        btn.textContent = _this.getSymbolToSwitch(button.id);
      });
    }
  }, {
    key: "toggleCase",
    value: function toggleCase() {
      var buttonsToChange;
      var textCaseFn;
      this.isUpperCase = !this.isUpperCase;
      if (this.isEngLang) buttonsToChange = this.buttonsEn;else buttonsToChange = this.buttonsRu;
      if (this.isUpperCase) textCaseFn = Keyboard.toLowerCase;else textCaseFn = Keyboard.toUpperCase;

      for (var i = 0; i < buttonsToChange.length; i += 1) {
        buttonsToChange[i].textContent = textCaseFn(buttonsToChange[i].textContent);
      }
    }
  }, {
    key: "getSymbolToSwitch",
    value: function getSymbolToSwitch(id) {
      var _this2 = this;

      var getEngSymbol = function getEngSymbol(i, j) {
        if (_this2.isShiftPressed) {
          return _this2.symbols[i][j][0][1];
        }

        return _this2.symbols[i][j][0][0];
      };

      var getRusSymbol = function getRusSymbol(i, j) {
        if (_this2.isShiftPressed) {
          return _this2.symbols[i][j][0][3];
        }

        return _this2.symbols[i][j][0][2];
      };

      for (var i = 0; i < this.symbols.length; i += 1) {
        for (var j = 0; j < this.symbols[i].length; j += 1) {
          if (this.symbols[i][j].includes(id)) {
            if (this.isEngLang) {
              return getEngSymbol(i, j);
            }

            return getRusSymbol(i, j);
          }
        }
      }

      return undefined;
    }
  }, {
    key: "shiftSymbols",
    value: function shiftSymbols() {
      var buttonsToChange;
      if (this.isEngLang) buttonsToChange = this.buttonsSymbolEn;else buttonsToChange = this.buttonsSymbolRu;
      this.isShiftPressed = !this.isShiftPressed;

      for (var i = 0; i < buttonsToChange.length; i += 1) {
        buttonsToChange[i].textContent = this.getSymbolToSwitch(buttonsToChange[i].id);
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      var button = document.getElementById(e.code);

      if (button) {
        button.classList.add('button_active');
      } else {
        return;
      }

      e.preventDefault();

      switch (e.code) {
        case 'ShiftLeft':
        case 'ShiftRight':
          this.toggleCase();
          this.shiftSymbols();
          break;

        case 'Space':
          this.cursorPosition = this.area.selectionStart;
          this.area.setRangeText(' ', this.cursorPosition, this.cursorPosition, 'end');
          break;

        case 'Tab':
          this.cursorPosition = this.area.selectionStart;
          this.area.setRangeText('    ', this.cursorPosition, this.cursorPosition, 'end');
          break;

        case 'Enter':
          break;

        case 'Backspace':
          this.cursorPosition = this.area.selectionStart;
          if (this.cursorPosition <= 0) return;
          this.area.setRangeText('', this.cursorPosition - 1, this.cursorPosition, 'end');
          break;

        case 'ArrowLeft':
          this.cursorPosition = this.area.selectionStart;
          if (this.cursorPosition <= 0) return;
          this.area.setSelectionRange(this.cursorPosition - 1, this.cursorPosition - 1);
          break;

        case 'ArrowRight':
          this.cursorPosition = this.area.selectionStart;
          if (this.area.value.length <= this.cursorPosition) return;
          this.area.setSelectionRange(this.cursorPosition + 1, this.cursorPosition + 1);
          break;

        default:
          if (button.classList.contains('functional')) return;
          this.cursorPosition = this.area.selectionStart;
          this.area.setRangeText(button.textContent, this.cursorPosition, this.cursorPosition, 'end');
          break;
      }
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(e) {
      var button = document.getElementById(e.code);

      if (button) {
        button.classList.remove('button_active');
      } else {
        return;
      }

      e.preventDefault();

      switch (e.code) {
        case 'ShiftLeft':
        case 'ShiftRight':
          this.toggleCase();
          this.shiftSymbols();
          break;

        case 'CapsLock':
          this.toggleCase();
          break;

        default:
          if (e.code.includes('Alt') && e.shiftKey) {
            this.changeLang();
          }

          break;
      }

      this.area.focus();
    }
  }], [{
    key: "toLowerCase",
    value: function toLowerCase(text) {
      return text.toLowerCase();
    }
  }, {
    key: "toUpperCase",
    value: function toUpperCase(text) {
      return text.toUpperCase();
    }
  }]);

  return Keyboard;
}();

module.exports = Keyboard;

/***/ }),

/***/ "./src/KeyboardApp.js":
/*!****************************!*\
  !*** ./src/KeyboardApp.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Keyboard = __webpack_require__(/*! ./Keyboard */ "./src/Keyboard.js");

var Key = __webpack_require__(/*! ./Key */ "./src/Key.js");

var KeyboardApp = /*#__PURE__*/function () {
  function KeyboardApp(parentElem) {
    _classCallCheck(this, KeyboardApp);

    this.parentElem = parentElem;
    this.clearBtn = document.querySelector(".search--clear_button");
    this.area = document.querySelector(".search--input");
    this.board = new Keyboard(this);
    this.init();
  }

  _createClass(KeyboardApp, [{
    key: "init",
    value: function init() {
      if (window.localStorage.getItem("lang")) {
        this.board.isEngLang = window.localStorage.getItem("lang") === "true";
      }

      this.generateElements(this.parentElem);
      this.setHandlers();
    }
  }, {
    key: "generateElements",
    value: function generateElements(wrapper) {
      var keyboard = document.createElement("div");
      keyboard.classList.add("keyboard");
      keyboard.id = "keyboard";
      wrapper.append(keyboard);

      for (var i = 0; i < this.board.symbols.length; i += 1) {
        this.createKeysRow(this.board.symbols[i], keyboard);
      }

      this.board.initKeySets();
    }
  }, {
    key: "setHandlers",
    value: function setHandlers() {
      var _this = this;

      var keyboardBtn = document.querySelector(".search--keyboard_button");
      keyboardBtn.addEventListener("click", function () {
        _this.parentElem.classList.toggle("keyboard--container-hidden");
      });
      this.clearBtn.addEventListener("click", function () {
        _this.area.value = "";

        _this.clearBtn.classList.add("hidden");

        _this.area.focus();
      });
    }
  }, {
    key: "updateClearBtnState",
    value: function updateClearBtnState() {
      if (this.area.value.length) this.clearBtn.classList.remove("hidden");else this.clearBtn.classList.add("hidden");
    }
  }, {
    key: "createKeysRow",
    value: function createKeysRow(row, keyboard) {
      var div = document.createElement("div");
      div.classList.add("key-row");
      keyboard.append(div);
      var fragment = new DocumentFragment();

      for (var i = 0; i < row.length; i += 1) {
        var key = void 0;

        if (this.board.isEngLang) {
          key = new Key(this.board, row[i][0][0], row[i][1]);
        } else {
          key = new Key(this.board, row[i][0][2], row[i][1]);
        }

        fragment = key.appendTo(fragment);
      }

      div.append(fragment);
    }
  }]);

  return KeyboardApp;
}();

module.exports = KeyboardApp;

/***/ }),

/***/ "./src/Search.js":
/*!***********************!*\
  !*** ./src/Search.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Fetcher = __webpack_require__(/*! ./Fetcher */ "./src/Fetcher.js");

var Search = /*#__PURE__*/function () {
  function Search(AppInst, sliderInst) {
    _classCallCheck(this, Search);

    this.AppInst = AppInst;
    this.sliderInst = sliderInst;
    this.submitBtn = document.querySelector('.search--submit_button');
    this.input = document.querySelector('.search--input');
    this.notification = document.querySelector('.notification');
    this.loadingImg = document.querySelector('.search--loading');
    this.setEventsListeners();
  }

  _createClass(Search, [{
    key: "setEventsListeners",
    value: function setEventsListeners() {
      var _this = this;

      this.submitBtn.addEventListener('click', function () {
        _this.searchSubmit();
      });
      document.querySelector('#Enter').addEventListener('click', function () {
        _this.searchSubmit();
      });
      this.input.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') _this.searchSubmit();
      });
    }
  }, {
    key: "searchingEndHandler",
    value: function searchingEndHandler(notification) {
      this.loadingImg.classList.add('hidden');
      if (notification) this.notification.textContent = notification;
    }
  }, {
    key: "searchSubmit",
    value: function searchSubmit() {
      var _this2 = this;

      var searchStr = this.input.value;
      this.notification.textContent = '';
      if (!searchStr) return;
      this.loadingImg.classList.remove('hidden');
      var isRuLang = /[а-я]/i.test(searchStr);

      if (isRuLang) {
        var translationCallback = function translationCallback(translatedStr) {
          _this2.AppInst.loadNewCards(translatedStr);

          _this2.notification.textContent = "Showing results for \"".concat(translatedStr, "\"");
        };

        Fetcher.fetchTranslation(searchStr, translationCallback);
      } else {
        this.AppInst.loadNewCards(searchStr);
      }
    }
  }]);

  return Search;
}();

module.exports = Search;

/***/ }),

/***/ "./src/Slider.js":
/*!***********************!*\
  !*** ./src/Slider.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = __webpack_require__(/*! ./values */ "./src/values.js"),
    SLIDER_ANIM_DURATION_MS = _require.SLIDER_ANIM_DURATION_MS,
    STOCK_BEFORE_PRELOAD = _require.STOCK_BEFORE_PRELOAD;

var Cards = __webpack_require__(/*! ./Cards */ "./src/Cards.js");

var Slider = /*#__PURE__*/function () {
  function Slider(appInst) {
    _classCallCheck(this, Slider);

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

  _createClass(Slider, [{
    key: "setEventsListeners",
    value: function setEventsListeners() {
      var _this = this;

      window.addEventListener('resize', function () {
        _this.updateSizes();

        _this.updateButtonsState();

        _this.updateProgress();

        _this.preloadNextPage();
      });
      this.leftBtn.addEventListener('click', function () {
        _this.buttonClickHandler(-1);
      });
      this.rightBtn.addEventListener('click', function () {
        _this.buttonClickHandler(1);
      });
      this.cardsContainer.addEventListener('mousedown', function (e) {
        _this.mouseDownHandler(e.x);
      });
      document.body.addEventListener('mousemove', function (e) {
        _this.mouseMoveHandler(e.x);
      });
      document.body.addEventListener('mouseup', function () {
        _this.mouseUpHandler();
      });
      document.body.addEventListener('mouseleave', function () {
        _this.mouseUpHandler();
      });
      this.cardsContainer.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) _this.mouseDownHandler(e.touches[0].clientX);
      });
      document.body.addEventListener('touchmove', function (e) {
        if (e.touches.length === 1) _this.mouseMoveHandler(e.touches[0].clientX);
      });
      document.body.addEventListener('touchend', function () {
        _this.mouseUpHandler();
      });
      document.body.addEventListener('touchcancel', function () {
        _this.mouseUpHandler();
      });
    }
  }, {
    key: "preloadNextPage",
    value: function preloadNextPage() {
      if (this.loadedCardsCount >= this.totalCardsCount) return;
      var hiddenWidth = this.cardsContainerWidth - this.sliderContentWidth;
      var rightHiddenWidth = hiddenWidth - this.contentOffset;
      var cardsHiddenInRight = rightHiddenWidth / this.cardWidth;
      if (cardsHiddenInRight > STOCK_BEFORE_PRELOAD) return;
      this.appInst.loadNextPage();
    }
  }, {
    key: "fillContainerFreeSpace",
    value: function fillContainerFreeSpace() {
      if (this.sliderContentWidth >= this.cardsContainerWidth) {
        this.firstCardIndex = 0;
      } else if (this.firstCardIndex > 0) {
        var cardsWithoutSlided = this.loadedCardsCount - this.firstCardIndex;
        var mustBeVisibleCount = this.getVisibleCardsCount();

        if (cardsWithoutSlided < mustBeVisibleCount) {
          this.firstCardIndex -= 1;
        }
      }
    }
  }, {
    key: "updateSizes",
    value: function updateSizes() {
      var someCard = document.querySelector('.card');
      if (someCard) this.cardWidth = someCard.getBoundingClientRect().width;else this.cardWidth = 0;
      var sliderContent = document.querySelector('.slider--content');
      this.sliderContentWidth = sliderContent.getBoundingClientRect().width;
      var cardsCount = this.cardsContainer.children.length;
      this.cardsContainerWidth = this.cardWidth * cardsCount;
      this.fillContainerFreeSpace();
      this.setContentOffset(this.firstCardIndex * this.cardWidth);
    }
  }, {
    key: "getVisibleCardsCount",
    value: function getVisibleCardsCount() {
      if (this.sliderContentWidth < this.cardsContainerWidth) {
        return Math.floor(this.sliderContentWidth / this.cardWidth);
      }

      return this.cardsContainerWidth / this.cardWidth;
    }
  }, {
    key: "contentReplaceHandler",
    value: function contentReplaceHandler() {
      this.firstCardIndex = 0;
      this.updateSizes();
      this.updateButtonsState();
      this.updateProgress();
    }
  }, {
    key: "buttonClickHandler",
    value: function buttonClickHandler(direction) {
      if (this.isAnimating) return;
      this.firstCardIndex += direction;
      this.animateMovingContent(direction * this.cardWidth);
    }
  }, {
    key: "mouseDownHandler",
    value: function mouseDownHandler(clientX) {
      if (this.isAnimating) return;
      this.isMouseDown = true;
      this.dragStartX = clientX + this.contentOffset;
      this.dragLength = 0;
    }
  }, {
    key: "mouseMoveHandler",
    value: function mouseMoveHandler(clientX) {
      if (!this.isMouseDown) return;
      var left = clientX - this.dragStartX;
      var hiddenWidth = this.cardsContainerWidth - this.sliderContentWidth;
      if (left > 0 || -left > hiddenWidth) return;
      this.contentOffset = -left;
      this.cardsContainer.style.left = "".concat(left, "px");
    }
  }, {
    key: "mouseUpHandler",
    value: function mouseUpHandler() {
      if (!this.isMouseDown) return;
      this.isMouseDown = false;
      this.removeContainerFreeSpace();
    }
  }, {
    key: "removeContainerFreeSpace",
    value: function removeContainerFreeSpace() {
      var hiddenCardPartWidth = this.contentOffset % this.cardWidth;
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
  }, {
    key: "updateButtonsState",
    value: function updateButtonsState() {
      var hiddenWidth = this.cardsContainerWidth - this.sliderContentWidth;
      var isRightEndReached = this.contentOffset >= hiddenWidth;
      var isLeftEndReached = this.contentOffset === 0;

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
  }, {
    key: "setContentOffset",
    value: function setContentOffset(offset) {
      this.contentOffset = offset;
      this.cardsContainer.style.left = "".concat(-this.contentOffset, "px");
    }
  }, {
    key: "animateMovingContent",
    value: function animateMovingContent(offset) {
      var _this2 = this;

      var startOffset = this.contentOffset;
      var duration = SLIDER_ANIM_DURATION_MS;
      var timeStart = performance.now();

      var move = function move(timeNow) {
        var timePassed = timeNow - timeStart;

        if (timePassed < duration) {
          var stepDistance = offset * (timePassed / duration);

          _this2.setContentOffset(startOffset + stepDistance);

          requestAnimationFrame(move);
        } else {
          _this2.setContentOffset(startOffset + offset);

          _this2.updateButtonsState();

          _this2.updateProgress();

          _this2.preloadNextPage();

          _this2.isAnimating = false;
        }
      };

      this.isAnimating = true;
      requestAnimationFrame(move);
    }
  }, {
    key: "updateProgress",
    value: function updateProgress() {
      var cardsDisplaying = Math.round(this.sliderContentWidth / this.cardWidth);
      this.progressElem.value = this.firstCardIndex + cardsDisplaying;
    }
  }, {
    key: "contentAddHandler",
    value: function contentAddHandler() {
      var cardsCount = this.cardsContainer.children.length;
      this.cardsContainerWidth = this.cardWidth * cardsCount;
      this.updateButtonsState();
    }
  }, {
    key: "setData",
    value: function setData(data, total) {
      this.loadedCardsCount = data.length;
      this.totalCardsCount = total;
      this.progressElem.max = total;
      this.cardsManager.setData(data);
    }
  }, {
    key: "concatData",
    value: function concatData(data) {
      this.loadedCardsCount += data.length;
      this.cardsManager.concatData(data);
    }
  }]);

  return Slider;
}();

module.exports = Slider;

/***/ }),

/***/ "./src/Speech.js":
/*!***********************!*\
  !*** ./src/Speech.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = __webpack_require__(/*! ./values */ "./src/values.js"),
    SPEAK_MESSAGE = _require.SPEAK_MESSAGE;

var Speech = /*#__PURE__*/function () {
  function Speech(appInst) {
    _classCallCheck(this, Speech);

    this.app = appInst;
    this.isRecording = false;
    this.searchInput = document.querySelector('.search--input');
    this.defaultSearchPlaceholder = this.searchInput.placeholder;
    var SR = window.webkitSpeechRecognition || window.SpeechRecognition;
    this.speech = new SR();
    this.setEventsListeners();
  }

  _createClass(Speech, [{
    key: "setEventsListeners",
    value: function setEventsListeners() {
      var _this = this;

      var micBtn = document.querySelector('.search--mic_button');
      micBtn.addEventListener('click', function () {
        _this.toggleRecording();
      });
      this.speech.addEventListener('end', function () {
        _this.toggleRecording();
      });
      this.speech.addEventListener('result', function (e) {
        var transcript = e.results[0][0].transcript;
        _this.searchInput.value = transcript;

        _this.app.searchBySpeech(transcript);
      });
      this.speech.addEventListener('error', function (e) {
        if (e.error === 'not-allowed') {
          // eslint-disable-next-line no-alert
          window.alert('Speech recording is not allowed');
        }
      });
    }
  }, {
    key: "toggleRecording",
    value: function toggleRecording() {
      if (this.isRecording) {
        this.searchInput.placeholder = this.defaultSearchPlaceholder;
        this.stop();
      } else {
        this.searchInput.placeholder = SPEAK_MESSAGE;
        this.start();
      }
    }
  }, {
    key: "start",
    value: function start() {
      this.isRecording = true;
      this.speech.start();
    }
  }, {
    key: "stop",
    value: function stop() {
      this.isRecording = false;
      this.speech.abort();
    }
  }]);

  return Speech;
}();

module.exports = Speech;

/***/ }),

/***/ "./src/Utils.js":
/*!**********************!*\
  !*** ./src/Utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Utils = /*#__PURE__*/function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: "createElem",
    value: function createElem(elem, classes, parent, child) {
      var _el$classList;

      var el = document.createElement(elem);
      if (classes instanceof Array) (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray(classes));else if (typeof classes === 'string') {
        var classesArray = classes.split(' ');
        classesArray.forEach(function (className) {
          el.classList.add(className);
        });
      }
      if (child instanceof Array) el.append.apply(el, _toConsumableArray(child));else if (child) el.append(child);
      if (parent) parent.append(el);
      return el;
    }
  }, {
    key: "createLoadingPlaceholder",
    value: function createLoadingPlaceholder(parent) {
      var loadImg = Utils.createElem('img', 'load_img', parent);
      loadImg.alt = 'loading...';
      loadImg.title = 'loading...';
      loadImg.src = './assets/ico/load.gif';
      parent.append(loadImg);
    }
  }]);

  return Utils;
}();

module.exports = Utils;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var App = __webpack_require__(/*! ./App */ "./src/App.js");

var _require = __webpack_require__(/*! ./values */ "./src/values.js"),
    DEFAULT_SEARCH_STR = _require.DEFAULT_SEARCH_STR;

document.body.onload = function () {
  var app = new App();
  app.loadNewCards(DEFAULT_SEARCH_STR); // eslint-disable-next-line no-alert
  // window.alert(
  //   'Доп. функция - Голосовой поиск (кнопка микрофона в строке '
  //     + 'поиска)\nПри ожидании ответа от сервера присутствует индикация '
  //     + 'процесса загрузки - появляется в строке поиска на месте лупы\n'
  //     + 'По вопросам пишите - mikolka.del@gmail.com',
  // );
};

/***/ }),

/***/ "./src/values.js":
/*!***********************!*\
  !*** ./src/values.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

var OMDB_API_URL = 'https://www.omdbapi.com';
var OMDB_KEY = '61cb7268';
var TRANSLATIONS_URL = 'https://translate.yandex.net/' + 'api/v1.5/tr.json/translate?key=' + 'trnsl.1.1.20200424T165651Z.1d0b4512feaec8b5.d0f1a9a6e52374' + 'b31845deff980acf39a41c1b1e&lang=ru-en&text=';
var IMDB_URL = 'https://www.imdb.com/';
var IMDB_NAME = 'Internet Movie Database';
var NO_SEARCH_RESULT_TEXT = 'No result for';
var POSTER_NA = 'Poster not found';
var RATING_NA = 'Rating not found';
var DEFAULT_SEARCH_STR = 'dream';
var SLIDER_ANIM_DURATION_MS = 200;
var STOCK_BEFORE_PRELOAD = 4;
var SPEAK_MESSAGE = ' - - - SPEAK - - -';
module.exports = {
  OMDB_API_URL: OMDB_API_URL,
  OMDB_KEY: OMDB_KEY,
  TRANSLATIONS_URL: TRANSLATIONS_URL,
  IMDB_URL: IMDB_URL,
  IMDB_NAME: IMDB_NAME,
  NO_SEARCH_RESULT_TEXT: NO_SEARCH_RESULT_TEXT,
  POSTER_NA: POSTER_NA,
  RATING_NA: RATING_NA,
  DEFAULT_SEARCH_STR: DEFAULT_SEARCH_STR,
  SLIDER_ANIM_DURATION_MS: SLIDER_ANIM_DURATION_MS,
  STOCK_BEFORE_PRELOAD: STOCK_BEFORE_PRELOAD,
  SPEAK_MESSAGE: SPEAK_MESSAGE
};

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=script.js.map