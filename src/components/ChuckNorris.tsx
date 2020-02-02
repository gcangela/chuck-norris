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
 * Add to favorites
 * Should also remove these from list as well
 * Store data in localstorage
 */

const ChuckNorris = () => {
  const [jokes, setJokes] = React.useState<ChuckNorrisJoke[]>([]);
  const [favorites, setFavorites] = React.useState([]);
  const [value, setValue] = useLocalStorage(FAVORITES_STORAGE_KEY);

  const handleClick = async () => {
    try {
      const response = await fetch10ChuckNorrisJokes();
      if (response.type === 'success') {
        setJokes(response?.value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      Nuck Chorris
      <JokesList jokes={jokes} />
      <button onClick={handleClick}>Get some jokes</button>
    </Container>
  );
};

export default ChuckNorris;
