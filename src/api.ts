function fetchData<ResponseType>(endpoint: string = '', options = {}) {
  return (): Promise<ResponseType> =>
    fetch(endpoint, options)
      .then(response => response.json())
      .then(payload => payload);
}

export const fetch10ChuckNorrisJokes = fetchData<JokeResponsePayload>('http://api.icndb.com/jokes/random/10');

export const fetchChuckNorrisJoke = fetchData<JokeResponsePayload>('http://api.icndb.com/jokes/random/1');
