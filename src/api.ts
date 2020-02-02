function fetchData<ResponseType>(endpoint: string = '', options = {}) {
  return (jokeCount): Promise<ResponseType> =>
    fetch(endpoint + jokeCount, options)
      .then(response => response.json())
      .then(payload => payload);
}

export const delayAPICall = (delayTime: number): Promise<string> =>
  new Promise(resolve => setTimeout(() => resolve('finished waiting'), delayTime));

export const fetchChuckNorrisJokes = fetchData<JokeResponsePayload>('http://api.icndb.com/jokes/random/');
