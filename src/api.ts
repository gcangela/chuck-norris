function fetchData<ResponseType>(endpoint: string = '', options: any = {}) {
  return (jokeCount: number): Promise<ResponseType> =>
    fetch(endpoint + jokeCount, options)
      .then(response => response.json())
      .then(payload => payload);
}

export const fetchChuckNorrisJokes = fetchData<JokeResponsePayload>('http://api.icndb.com/jokes/random/');

export const sleep = (ms: number): Promise<any> => new Promise(resolve => setTimeout(() => resolve(), ms));
