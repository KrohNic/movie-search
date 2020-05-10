class Key {
  constructor(keyboardInst, value, keyCode) {
    this.keyboardInst = keyboardInst;
    this.value = value;
    this.keyCode = keyCode;
    this.area = keyboardInst.area;
    // in ru_lang they are letters, but in en_lang - symbols
    this.mixedKeys = [
      'Backquote',
      'BracketLeft',
      'BracketRight',
      'Semicolon',
      'Quote',
      'Comma',
      'Period',
    ];
  }

  appendTo(fragment) {
    const button = document.createElement('button');
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

    button.addEventListener('mousedown', (e) => this.keyDown(e));
    button.addEventListener('mouseup', () => this.keyUp());
    button.addEventListener('mouseout', () => this.keyUp());
    button.id = this.keyCode;
    fragment.append(button);
    return fragment;
  }

  repeatKey(fn, keyValue) {
    const keyRepeatInterval = 175;
    this.keyboardInst.cursorPosition = this.area.selectionStart;
    fn(keyValue);
    this.interval = setInterval(fn, keyRepeatInterval, keyValue);
  }

  keyDown(event) {
    const ShiftLeft = document.getElementById('ShiftLeft');
    const ShiftRight = document.getElementById('ShiftRight');
    const AltLeft = document.getElementById('AltLeft');
    const AltRight = document.getElementById('AltRight');

    switch (event.target.id) {
      case 'Backspace':
        this.repeatKey(() => {
          if (this.keyboardInst.cursorPosition <= 0) return;

          this.area.setRangeText(
            '',
            this.keyboardInst.cursorPosition - 1,
            this.keyboardInst.cursorPosition,
            'end',
          );
        });
        break;
      case 'Space':
        this.repeatKey(() => {
          this.area.setRangeText(
            ' ',
            this.keyboardInst.cursorPosition,
            this.keyboardInst.cursorPosition,
            'end',
          );
        });
        break;
      case 'Tab':
        this.repeatKey(() => {
          this.area.setRangeText(
            '    ',
            this.keyboardInst.cursorPosition,
            this.keyboardInst.cursorPosition,
            'end',
          );
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
        this.repeatKey(() => {
          if (this.keyboardInst.cursorPosition <= 0) return;

          this.area.setSelectionRange(
            this.keyboardInst.cursorPosition - 1,
            this.keyboardInst.cursorPosition - 1,
          );
        });
        break;
      case 'ArrowRight':
        this.repeatKey(() => {
          if (this.area.value.length <= this.keyboardInst.cursorPosition) {
            return;
          }

          this.area.setSelectionRange(
            this.keyboardInst.cursorPosition + 1,
            this.keyboardInst.cursorPosition + 1,
          );
        });
        break;
      default:
        this.repeatKey((text) => {
          this.area.setRangeText(
            text,
            this.keyboardInst.cursorPosition,
            this.keyboardInst.cursorPosition,
            'end',
          );
        }, event.target.textContent);
        break;
    }
  }

  keyUp() {
    clearInterval(this.interval);
    this.keyboardInst.keyboardAppInst.updateClearBtnState();
    this.area.focus();
  }
}

module.exports = Key;
