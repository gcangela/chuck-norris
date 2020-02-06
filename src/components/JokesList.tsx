import React, { useState } from 'react';
import { SubHeading, List, ListItem, Button } from './styles';
import { MAX_JOKE_COUNT } from '../app-constants';
import styled from 'styled-components';

const ListWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface JokesListProps {
  jokes: ReadonlyArray<ChuckNorrisJoke>;
  favoriteJokes: ReadonlyArray<ChuckNorrisJoke>;
  setFavoriteJoke: (id: number, action: 'add' | 'remove') => void;
  setJokeFetchTimer: (shouldFetch: boolean) => void;
  fetch10RandomJokes: () => void;
  currentTabIndex: number;
}

const JokeList: React.FC<JokesListProps> = ({
  jokes,
  setFavoriteJoke,
  favoriteJokes,
  setJokeFetchTimer,
  currentTabIndex,
  fetch10RandomJokes,
}) => {
  return (
    <div>
      {currentTabIndex === 0 ? (
        <ListWrapper>
          <SubHeading>Random jokes</SubHeading>
          <Button onClick={() => fetch10RandomJokes()}>Fetch 10 random jokes</Button>
          <List>
            {jokes.length > 0 &&
              jokes.map(({ categories, id, joke }) => (
                <ListItem
                  key={id}
                  onClick={() => {
                    if (favoriteJokes.length === MAX_JOKE_COUNT) {
                      alert(`Cannot add more than ${MAX_JOKE_COUNT} jokes to the list`);
                      return;
                    }
                    setFavoriteJoke(id, 'add');
                  }}
                >
                  <span>
                    {joke} {'😂😂😂'}
                  </span>
                  <Button onClick={() => setFavoriteJoke(id, 'add')}>Add to favorites</Button>
                </ListItem>
              ))}
          </List>
        </ListWrapper>
      ) : (
        <ListWrapper>
          <SubHeading>Favorite jokes</SubHeading>
          <div>
            {/* <Button onClick={() => setJokeFetchTimer(true)}>Randomize jokes</Button>
            <Button onClick={() => setJokeFetchTimer(false)}>Stop Randomize jokes</Button> */}
          </div>
          <List>
            {favoriteJokes.length > 0 &&
              favoriteJokes.map(({ categories, id, joke }) => (
                <ListItem key={id}>
                  <span>
                    {joke}
                    {'😂😂😂'}
                  </span>{' '}
                  <Button onClick={() => setFavoriteJoke(id, 'remove')}>Remove</Button>
                </ListItem>
              ))}
          </List>
        </ListWrapper>
      )}
    </div>
  );
};
{
}
export default JokeList;
