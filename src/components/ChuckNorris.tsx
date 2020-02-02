import React from 'react';
import styled from 'styled-components';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { FAVORITES_STORAGE_KEY } from '../app-constants';
import JokesList from './JokesList';
import { delayAPICall, fetchChuckNorrisJokes } from '../api';

const Container = styled.div`
  height: inherit;
  margin: 0 auto;
  max-width: 700px;
`;

/**
 * TODO:
 * Handle api errors
 * Handle empty states
 * Sprinkle some css to make it look nice
 */

const ChuckNorris = () => {
  const [jokes, setJokes] = React.useState<ChuckNorrisJoke[]>([]);
  const [favorites, setFavorites] = React.useState([]);
  const [storageValue, setStorageValue] = useLocalStorage(FAVORITES_STORAGE_KEY);

  React.useEffect(() => {
    if (Boolean(storageValue)) {
      setFavorites(JSON.parse(storageValue));
    }
  }, [storageValue, setFavorites]);

  const fetchRandomJokes = async () => {
    try {
      const response = await fetchChuckNorrisJokes(10);
      if (response.type === 'success') {
        setJokes(response?.value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setFavoriteJoke = (id: number, action: 'add' | 'remove') => {
    if (action === 'add') {
      const favoriteJokeToAdd = jokes.find(joke => joke.id === id);
      const isAlreadyInFavorites = Boolean(favorites.find(joke => joke.id === id));
      if (!isAlreadyInFavorites) {
        setFavorites(favoriteJokes => {
          setStorageValue(JSON.stringify([...favoriteJokes, favoriteJokeToAdd]));
          return [...favoriteJokes, favoriteJokeToAdd];
        });
      }
    }
    if (action === 'remove') {
      return setFavorites(favoriteJokes => {
        setStorageValue(JSON.stringify(favoriteJokes.filter(joke => joke.id !== id)));
        return favoriteJokes.filter(joke => joke.id !== id);
      });
    }
  };

  const addRandomJokes = async () => {
    for (let i = favorites.length; i < 10; i++) {
      await delayAPICall(5000);
      fetchChuckNorrisJokes(1).then(({ value }) => {
        setFavorites(favoriteJokes => [...favoriteJokes, value[0]]);
      });
    }
  };

  return (
    <Container>
      Nuck Chorris
      <button onClick={fetchRandomJokes}>Fetch some jokes</button>
      <button onClick={addRandomJokes}>Randomize jokes</button>
      <JokesList jokes={jokes} setFavoriteJoke={setFavoriteJoke} favoriteJokes={favorites} />
    </Container>
  );
};

export default ChuckNorris;
