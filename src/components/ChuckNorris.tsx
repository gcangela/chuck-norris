import React, { useState } from 'react';
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
  const [randomJokes, setRandomJokes] = React.useState<ChuckNorrisJoke[]>([]);
  const [fetchRandom, setFetchRandom] = useState(false);
  const [favorites, setFavorites] = React.useState([]);
  const [storageValue, setStorageValue] = useLocalStorage(FAVORITES_STORAGE_KEY);

  React.useEffect(() => {
    if (Boolean(storageValue)) {
      setFavorites(JSON.parse(storageValue));
    }
  }, [storageValue, setFavorites]);

  React.useEffect(() => {
    let id;
    if (fetchRandom) {
      id = setInterval(() => {
        fetchChuckNorrisJokes(1).then(({ value }) => {
          const newJoke = value[0];
          setFavorites(favoriteJokes => {
            if (favoriteJokes.length < 10) {
              setStorageValue(JSON.stringify([...favoriteJokes, newJoke]));
              return [...favoriteJokes, newJoke];
            } else {
              setFetchRandom(false);
              clearInterval(id);
              return favoriteJokes;
            }
          });
        });
      }, 5000);
    }
    return () => {
      clearInterval(id);
    };
  }, [fetchRandom]);

  const fetchRandomJokes = async () => {
    try {
      const response = await fetchChuckNorrisJokes(10);
      if (response.type === 'success') {
        setRandomJokes(response?.value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setFavoriteJoke = (id: number, action: 'add' | 'remove') => {
    if (action === 'add') {
      const favoriteJokeToAdd = randomJokes.find(joke => joke.id === id);
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

  return (
    <Container>
      Nuck Chorris
      <button onClick={fetchRandomJokes}>Fetch some jokes</button>
      <button onClick={() => setFetchRandom(true)}>Randomize jokes</button>
      <button onClick={() => setFetchRandom(false)}>Stop Randomize jokes</button>
      <JokesList jokes={randomJokes} setFavoriteJoke={setFavoriteJoke} favoriteJokes={favorites} />
    </Container>
  );
};

export default ChuckNorris;
