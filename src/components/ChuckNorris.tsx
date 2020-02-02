import React from 'react';
import styled from 'styled-components';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { FAVORITES_STORAGE_KEY } from '../app-constants';
import JokesList from './JokesList';
import { fetch10ChuckNorrisJokes } from '../api';

const Container = styled.div`
  height: inherit;
  margin: 0 auto;
  max-width: 700px;
`;

/**
 * TODO:
 * Prevent saving duplicates
 * Handle api errors
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

  const fetchJokes = async () => {
    try {
      const response = await fetch10ChuckNorrisJokes();
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
      return setFavorites(favoriteJokes => {
        setStorageValue(JSON.stringify([...favoriteJokes, favoriteJokeToAdd]));
        return [...favoriteJokes, favoriteJokeToAdd];
      });
    }
    if (action === 'remove') {
      return setFavorites(favoriteJokes => {
        setStorageValue(JSON.stringify(favoriteJokes.filter(joke => joke.id !== id)));
        return favoriteJokes.filter(joke => joke.id !== id);
      });
    }
  };

  return (
    <Container>
      Nuck Chorris
      <button onClick={fetchJokes}>Fetch some jokes</button>
      <JokesList jokes={jokes} setFavoriteJoke={setFavoriteJoke} favoriteJokes={favorites} />
    </Container>
  );
};

export default ChuckNorris;
