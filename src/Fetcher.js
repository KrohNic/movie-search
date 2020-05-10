const values = require('./values');

class Fetcher {
  static basicFetcher(url, responseCallback, rejectCallback) {
    fetch(url)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) return res.json();

        throw new Error(res.status);
      })
      .then((json) => {
        responseCallback(json);
      })
      .catch((error) => {
        const mess = +error.message;

        if (rejectCallback && mess >= 400 && mess < 600) {
          rejectCallback(`API ${error}`);
          // eslint-disable-next-line no-console
        } else console.error(error);
      });
  }

  static fetchImdbRating(id, callback) {
    const url = new URL(values.OMDB_API_URL);
    url.searchParams.set('i', id);
    url.searchParams.set('apikey', values.OMDB_KEY);

    const ratingCallback = (json) => {
      const rating = json.Ratings.find(
        (item) => item.Source === values.IMDB_NAME,
      );

      if (rating) callback(rating.Value);
      else callback(values.RATING_NA);
    };

    Fetcher.basicFetcher(url, ratingCallback);
  }

  static fetchTranslation(str, callback) {
    const url = new URL(values.TRANSLATIONS_URL + str);

    const translationCallback = (json) => {
      if (json.text) callback(json.text[0]);
      else callback(str);
    };

    Fetcher.basicFetcher(url, translationCallback);
  }

  static fetchMovieData(searchQuery, callback, page = 1) {
    const url = new URL(values.OMDB_API_URL);
    url.searchParams.set('apikey', values.OMDB_KEY);
    url.searchParams.set('page', page);
    url.searchParams.set('s', searchQuery);
    url.searchParams.set('type', 'movie');

    const searchCallback = (json) => {
      let dataObj;

      if (json.Error) {
        dataObj = { error: `${values.NO_SEARCH_RESULT_TEXT} ${searchQuery}` };
      } else dataObj = { data: json.Search, total: json.totalResults };

      callback(dataObj);
    };

    const rejectCallback = (message) => {
      callback({ error: message });
    };

    Fetcher.basicFetcher(url, searchCallback, rejectCallback);
  }
}

module.exports = Fetcher;
