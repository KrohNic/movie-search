class Keyboard {
  constructor(keyboardAppInst) {
    this.symbols = [
      [
        ['`~ёЁ', 'Backquote'],
        ['1!1!', 'Digit1'],
        ['2@2"', 'Digit2'],
        ['3#3№', 'Digit3'],
        ['4$4;', 'Digit4'],
        ['5%5%', 'Digit5'],
        ['6^6:', 'Digit6'],
        ['7&7&', 'Digit7'],
        ['8*8*', 'Digit8'],
        ['9(9(', 'Digit9'],
        ['0)0)', 'Digit0'],
        ['-_-_', 'Minus'],
        ['=+=+', 'Equal'],
        ['', 'Backspace'],
      ],
      [
        ['', 'Tab'],
        ['qQйЙ', 'KeyQ'],
        ['wWцЦ', 'KeyW'],
        ['eEуУ', 'KeyE'],
        ['rRкК', 'KeyR'],
        ['tTеЕ', 'KeyT'],
        ['yYнН', 'KeyY'],
        ['uUгГ', 'KeyU'],
        ['iIшШ', 'KeyI'],
        ['oOщЩ', 'KeyO'],
        ['pPзЗ', 'KeyP'],
        ['[{хХ', 'BracketLeft'],
        [']}ъЪ', 'BracketRight'],
        ['\\|\\/', 'Backslash'],
      ],
      [
        ['', 'CapsLock'],
        ['aAфФ', 'KeyA'],
        ['sSыЫ', 'KeyS'],
        ['dDвВ', 'KeyD'],
        ['fFаА', 'KeyF'],
        ['gGпП', 'KeyG'],
        ['hHрР', 'KeyH'],
        ['jJоО', 'KeyJ'],
        ['kKлЛ', 'KeyK'],
        ['lLдД', 'KeyL'],
        [';:жЖ', 'Semicolon'],
        ["'\"эЭ", 'Quote'],
        ['', 'Enter'],
      ],
      [
        ['', 'ShiftLeft'],
        ['zZяЯ', 'KeyZ'],
        ['xXчЧ', 'KeyX'],
        ['cCсС', 'KeyC'],
        ['vVмМ', 'KeyV'],
        ['bBиИ', 'KeyB'],
        ['nNтТ', 'KeyN'],
        ['mMьЬ', 'KeyM'],
        [',<бБ', 'Comma'],
        ['.>юЮ', 'Period'],
        ['/?.,', 'Slash'],
        ['', 'ShiftRight'],
      ],
      [
        ['', 'ControlLeft'],
        ['', 'AltLeft'],
        ['', 'Space'],
        ['', 'AltRight'],
        ['', 'Lang'],
        ['◄◄◄◄', 'ArrowLeft'],
        ['►►►►', 'ArrowRight'],
      ],
    ];

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

  initKeySets() {
    this.buttonsEn = Array.from(document.querySelectorAll('.letter'));
    this.mixedKeys = Array.from(document.querySelectorAll('.mixed'));
    this.buttonsSymbolRu = Array.from(document.querySelectorAll('.symbol'));

    this.buttonsSymbolEn = this.buttonsSymbolRu.concat(this.mixedKeys);
    this.buttonsRu = this.buttonsEn.concat(this.mixedKeys);
  }

  changeLang() {
    this.isEngLang = !this.isEngLang;
    window.localStorage.setItem('lang', this.isEngLang);

    this.buttonsRu.forEach((button) => {
      const btn = button;
      btn.textContent = this.getSymbolToSwitch(button.id);
    });
  }

  static toLowerCase(text) {
    return text.toLowerCase();
  }

  static toUpperCase(text) {
    return text.toUpperCase();
  }

  toggleCase() {
    let buttonsToChange;
    let textCaseFn;

    this.isUpperCase = !this.isUpperCase;

    if (this.isEngLang) buttonsToChange = this.buttonsEn;
    else buttonsToChange = this.buttonsRu;

    if (this.isUpperCase) textCaseFn = Keyboard.toLowerCase;
    else textCaseFn = Keyboard.toUpperCase;

    for (let i = 0; i < buttonsToChange.length; i += 1) {
      buttonsToChange[i].textContent = textCaseFn(
        buttonsToChange[i].textContent,
      );
    }
  }

  getSymbolToSwitch(id) {
    const getEngSymbol = (i, j) => {
      if (this.isShiftPressed) {
        return this.symbols[i][j][0][1];
      }

      return this.symbols[i][j][0][0];
    };

    const getRusSymbol = (i, j) => {
      if (this.isShiftPressed) {
        return this.symbols[i][j][0][3];
      }
      return this.symbols[i][j][0][2];
    };

    for (let i = 0; i < this.symbols.length; i += 1) {
      for (let j = 0; j < this.symbols[i].length; j += 1) {
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

  shiftSymbols() {
    let buttonsToChange;

    if (this.isEngLang) buttonsToChange = this.buttonsSymbolEn;
    else buttonsToChange = this.buttonsSymbolRu;

    this.isShiftPressed = !this.isShiftPressed;

    for (let i = 0; i < buttonsToChange.length; i += 1) {
      buttonsToChange[i].textContent = this.getSymbolToSwitch(
        buttonsToChange[i].id,
      );
    }
  }

  handleKeyDown(e) {
    const button = document.getElementById(e.code);

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

        this.area.setRangeText(
          ' ',
          this.cursorPosition,
          this.cursorPosition,
          'end',
        );
        break;
      case 'Tab':
        this.cursorPosition = this.area.selectionStart;

        this.area.setRangeText(
          '    ',
          this.cursorPosition,
          this.cursorPosition,
          'end',
        );
        break;
      case 'Enter':
        break;
      case 'Backspace':
        this.cursorPosition = this.area.selectionStart;

        if (this.cursorPosition <= 0) return;

        this.area.setRangeText(
          '',
          this.cursorPosition - 1,
          this.cursorPosition,
          'end',
        );
        break;
      case 'ArrowLeft':
        this.cursorPosition = this.area.selectionStart;

        if (this.cursorPosition <= 0) return;

        this.area.setSelectionRange(
          this.cursorPosition - 1,
          this.cursorPosition - 1,
        );
        break;
      case 'ArrowRight':
        this.cursorPosition = this.area.selectionStart;

        if (this.area.value.length <= this.cursorPosition) return;

        this.area.setSelectionRange(
          this.cursorPosition + 1,
          this.cursorPosition + 1,
        );
        break;
      default:
        if (button.classList.contains('functional')) return;

        this.cursorPosition = this.area.selectionStart;

        this.area.setRangeText(
          button.textContent,
          this.cursorPosition,
          this.cursorPosition,
          'end',
        );
        break;
    }
  }

  handleKeyUp(e) {
    const button = document.getElementById(e.code);
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
}

module.exports = Keyboard;
