import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from './hooks/useLocalStorage';
import { FAVORITES_STORAGE_KEY, MAX_JOKE_COUNT, mockData } from './app-constants';
import { MainHeading, Button } from './components/styles';
import JokesList from './components/JokesList';
import { fetchChuckNorrisJokes } from './api';

const Container = styled.div`
  height: inherit;
  margin: 0 auto;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;

const AppContainer = styled.div`
  height: 100%;
`;

const ListToggleButton = styled(Button)`
  background-color: #ff4040;
`;

/**
 * TODO:
 * Handle empty states
 */

const ChuckNorrisApp = () => {
  const [randomJokes, setRandomJokes] = React.useState<ChuckNorrisJoke[]>([]);
  const [jokeFetchTimer, setJokeFetchTimer] = useState(false);
  const [favorites, setFavorites] = React.useState([]);
  const [storageValue, setStorageValue] = useLocalStorage(FAVORITES_STORAGE_KEY);
  const [currentTabIndex, setCurrentTabIndex] = useState(1);

  useEffect(() => {
    if (Boolean(storageValue)) {
      setFavorites(JSON.parse(storageValue));
    }
  }, [storageValue, setFavorites]);

  useEffect(() => {
    let id;
    if (setJokeFetchTimer) {
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
                setJokeFetchTimer(false);
                clearInterval(id);
                return favoriteJokes;
              }
            });
          } catch (error) {
            setJokeFetchTimer(false);
            // captureException(e) -- example of using sentry.io
            throw error; // Throw the error, in case you have error boundaries that will catch errors
          }
        })();
      }, 1000);
    }
    return () => {
      clearInterval(id);
    };
  }, [jokeFetchTimer]);

  const fetch10RandomJokes = async () => {
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
        <h3>Toggle between the joke lists</h3>
        <div>
          <Button onClick={() => setJokeFetchTimer(true)}>Randomize jokes</Button>
          <Button onClick={() => setJokeFetchTimer(false)}>Stop Randomize jokes</Button>
          <ListToggleButton onClick={() => setCurrentTabIndex(0)}>Random jokes</ListToggleButton>
          <ListToggleButton onClick={() => setCurrentTabIndex(1)}>Favorite jokes</ListToggleButton>
        </div>
        <JokesList
          jokes={randomJokes}
          setFavoriteJoke={setFavoriteJoke}
          favoriteJokes={favorites}
          setJokeFetchTimer={setJokeFetchTimer}
          fetch10RandomJokes={fetch10RandomJokes}
          currentTabIndex={currentTabIndex}
        />
      </Container>
    </AppContainer>
  );
};

export default ChuckNorrisApp;
