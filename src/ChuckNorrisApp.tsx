import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from './hooks/useLocalStorage';
import { FAVORITES_STORAGE_KEY, MAX_JOKE_COUNT } from './app-constants';
import { MainHeading, Button, ButtonGroup } from './components/styles';
import JokesList from './components/JokesList';
import { fetchChuckNorrisJokes, sleep } from './api';

const Container = styled.div`
  height: inherit;
  margin: 0 auto;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  h3 {
    text-align: center;
  }
`;

const AppContainer = styled.div`
  height: 100%;
`;

const ListToggleButton = styled<{ active: boolean }>(Button)`
  color: black;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  ${({ active }) =>
    active
      ? `color: #fff;
  background-color: #1890ff;`
      : ` background-color: #fff;
  border-color: #d9d9d9;`}
`;

const ChuckNorrisApp = () => {
  const [randomJokes, setRandomJokes] = React.useState<ChuckNorrisJoke[]>([]);
  const [jokeFetchTimer, setJokeFetchTimer] = useState(false);
  const [favorites, setFavorites] = React.useState<ChuckNorrisJoke[]>([]);
  const [storageValue, setStorageValue] = useLocalStorage(FAVORITES_STORAGE_KEY);
  const [currentTabIndex, setCurrentTabIndex] = useState(1);
  const [loadingState, setLoadingState] = useState<{ loading: boolean; message: string }>({ loading: false, message: '' });

  useEffect(() => {
    if (Boolean(storageValue)) {
      setFavorites(JSON.parse(storageValue));
    }
  }, [storageValue]);

  useEffect(() => {
    let id;
    if (jokeFetchTimer) {
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
      }, 5000);
    }
    return () => {
      clearInterval(id);
    };
  }, [jokeFetchTimer]);

  const fetch10RandomJokes = async () => {
    setLoadingState({ loading: true, message: 'Fetching 10 random jokes...' });
    try {
      // mimic a slower network so the loading state can be shown a bit longer
      await sleep(350);
      const response = await fetchChuckNorrisJokes(10);
      if (response.type === 'success') {
        setRandomJokes(response.value);
      }
      setLoadingState({ loading: false, message: '' });
    } catch (error) {
      setLoadingState({ loading: false, message: '' });
      // captureException(e) -- example of using sentry.io
      throw error; // Throw the error, in case you have error boundaries that will catch errors
    }
  };

  const setFavoriteJoke = (id: number, action: 'add' | 'remove') => {
    const favoriteJokeToAdd = randomJokes.find(joke => joke.id === id);
    const isAlreadyInFavorites = Boolean(favorites.find(joke => joke.id === id));
    if (action === 'add') {
      if (!isAlreadyInFavorites) {
        setStorageValue(JSON.stringify([...favorites, favoriteJokeToAdd]));
      }
    }
    if (action === 'remove') {
      setStorageValue(JSON.stringify(favorites.filter(joke => joke.id !== id)));
    }
  };
  return (
    <AppContainer>
      <Container>
        <MainHeading>Chuck Norris App</MainHeading>
        <h3>Toggle between the joke lists</h3>
        <ButtonGroup>
          <ListToggleButton active={currentTabIndex === 0} onClick={() => setCurrentTabIndex(0)}>
            Random jokes
          </ListToggleButton>
          <ListToggleButton active={currentTabIndex === 1} onClick={() => setCurrentTabIndex(1)}>
            Favorite jokes
          </ListToggleButton>
        </ButtonGroup>
        <JokesList
          loadingState={loadingState}
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
