import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from './hooks/useLocalStorage';
import { FAVORITES_STORAGE_KEY, MAX_JOKE_COUNT, mockData } from './app-constants';
import { ButtonGroup, MainHeading, Button } from './components/styles';
import JokesList from './components/JokesList';
import { fetchChuckNorrisJokes } from './api';

const Container = styled.div`
  height: inherit;
  margin: 0 auto;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
`;

const AppContainer = styled.div`
  height: 100vh;
`;

/**
 * TODO:
 * Handle empty states
 * Refactor JokesList
 * Create a tab to toggle between faves and random jokes
 */

const ChuckNorrisApp = () => {
  const [randomJokes, setRandomJokes] = React.useState<ChuckNorrisJoke[]>([]);
  const [fetchRandom, setFetchRandom] = useState(false);
  const [favorites, setFavorites] = React.useState([]);
  const [storageValue, setStorageValue] = useLocalStorage(FAVORITES_STORAGE_KEY);

  useEffect(() => {
    if (Boolean(storageValue)) {
      setFavorites(JSON.parse(storageValue));
    }
  }, [storageValue, setFavorites]);

  useEffect(() => {
    let id;
    if (fetchRandom) {
      id = setInterval(() => {
        (async () => {
          try {
            const { value } = await fetchChuckNorrisJokes(1);
            const newJoke = value[0];
            setFavorites(favoriteJokes => {
              if (favoriteJokes.length < MAX_JOKE_COUNT) {
                setStorageValue(JSON.stringify([...favoriteJokes, newJoke]));
                return [...favoriteJokes, newJoke];
              } else {
                setFetchRandom(false);
                clearInterval(id);
                return favoriteJokes;
              }
            });
          } catch (error) {
            setFetchRandom(false);
            // captureException(e) -- example of using sentry.io
            throw error; // Throw the error, in case you have error boundaries that will catch errors
          }
        })();
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
      // captureException(e) -- example of using sentry.io
      throw error; // Throw the error, in case you have error boundaries that will catch errors
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
    <AppContainer>
      <Container>
        <MainHeading>Chuck Norris App</MainHeading>
        <ButtonGroup>
          <Button onClick={fetchRandomJokes}>Fetch some jokes</Button>
          <Button onClick={() => setFetchRandom(true)}>Randomize jokes</Button>
          <Button onClick={() => setFetchRandom(false)}>Stop Randomize jokes</Button>
        </ButtonGroup>
        <JokesList jokes={mockData} setFavoriteJoke={setFavoriteJoke} favoriteJokes={favorites} />
      </Container>
    </AppContainer>
  );
};

export default ChuckNorrisApp;
