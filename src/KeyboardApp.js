const Keyboard = require('./Keyboard');
const Key = require('./Key');

class KeyboardApp {
  constructor(parentElem) {
    this.parentElem = parentElem;
    this.clearBtn = document.querySelector('.search--clear_button');
    this.area = document.querySelector('.search--input');
    this.board = new Keyboard(this);

    this.init();
  }

  init() {
    if (window.localStorage.getItem('lang')) {
      this.board.isEngLang = window.localStorage.getItem('lang') === 'true';
    }

    this.generateElements(this.parentElem);
    this.setHandlers();
  }

  generateElements(wrapper) {
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    keyboard.id = 'keyboard';
    wrapper.append(keyboard);

    for (let i = 0; i < this.board.symbols.length; i += 1) {
      this.createKeysRow(this.board.symbols[i], keyboard);
    }

    this.board.initKeySets();
  }

  setHandlers() {
    const keyboardBtn = document.querySelector('.search--keyboard_button');
    keyboardBtn.addEventListener('click', () => {
      this.parentElem.classList.toggle('keyboard--container-hidden');
    });

    this.clearBtn.addEventListener('click', () => {
      this.area.value = '';
      this.clearBtn.classList.add('hidden');
      this.area.focus();
    });
  }

  updateClearBtnState() {
    if (this.area.value.length) this.clearBtn.classList.remove('hidden');
    else this.clearBtn.classList.add('hidden');
  }

  createKeysRow(row, keyboard) {
    const div = document.createElement('div');
    div.classList.add('key-row');
    keyboard.append(div);

    let fragment = new DocumentFragment();

    for (let i = 0; i < row.length; i += 1) {
      let key;

      if (this.board.isEngLang) {
        key = new Key(this.board, row[i][0][0], row[i][1]);
      } else {
        key = new Key(this.board, row[i][0][2], row[i][1]);
      }

      fragment = key.appendTo(fragment);
    }

    div.append(fragment);
  }
}

module.exports = KeyboardApp;
