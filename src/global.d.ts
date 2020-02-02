type ChuckNorrisJoke = {
  id: number;
  joke: string;
  categories: string[];
};

interface JokeResponsePayload {
  type: string;
  value: ChuckNorrisJoke[];
}
