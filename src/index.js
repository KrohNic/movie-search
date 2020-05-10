const App = require('./App');
const { DEFAULT_SEARCH_STR } = require('./values');

document.body.onload = () => {
  const app = new App();
  app.loadNewCards(DEFAULT_SEARCH_STR);

  // eslint-disable-next-line no-alert
  window.alert(
    'Доп. функция - Голосовой поиск (кнопка микрофона в строке '
      + 'поиска)\nПри ожидании ответа от сервера присутствует индикация '
      + 'процесса загрузки - появляется в строке поиска на месте лупы\n'
      + 'По вопросам пишите - mikolka.del@gmail.com',
  );
};
