const { SPEAK_MESSAGE } = require('./values');

class Speech {
  constructor(appInst) {
    this.app = appInst;
    this.isRecording = false;

    this.searchInput = document.querySelector('.search--input');
    this.defaultSearchPlaceholder = this.searchInput.placeholder;

    const SR = window.webkitSpeechRecognition || window.SpeechRecognition;
    this.speech = new SR();

    this.setEventsListeners();
  }

  setEventsListeners() {
    const micBtn = document.querySelector('.search--mic_button');

    micBtn.addEventListener('click', () => {
      this.toggleRecording();
    });

    this.speech.addEventListener('end', () => {
      this.toggleRecording();
    });

    this.speech.addEventListener('result', (e) => {
      const { transcript } = e.results[0][0];

      this.searchInput.value = transcript;
      this.app.searchBySpeech(transcript);
    });

    this.speech.addEventListener('error', (e) => {
      if (e.error === 'not-allowed') {
        // eslint-disable-next-line no-alert
        window.alert('Speech recording is not allowed');
      }
    });
  }

  toggleRecording() {
    if (this.isRecording) {
      this.searchInput.placeholder = this.defaultSearchPlaceholder;
      this.stop();
    } else {
      this.searchInput.placeholder = SPEAK_MESSAGE;
      this.start();
    }
  }

  start() {
    this.isRecording = true;
    this.speech.start();
  }

  stop() {
    this.isRecording = false;
    this.speech.abort();
  }
}

module.exports = Speech;
