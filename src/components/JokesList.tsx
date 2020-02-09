import React from 'react';
import { SubHeading, List, ListItem, Button, ButtonGroup } from './styles';
import { MAX_JOKE_COUNT } from '../app-constants';
import styled from 'styled-components';
import { useNotification } from '../hooks/useNotification';

const ListWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;
`;

const Category = styled.em`
  font-size: 12px;
  padding: 4px;
  border: 1px solid #1890ff;
`;

const JokeNotification = styled.div`
  position: fixed;
  background: #1890ff;
  color: #fff;
  right: 20px;
  top: 20px;
  padding: 8px;
`;

interface JokesListProps {
  jokes: ReadonlyArray<ChuckNorrisJoke>;
  favoriteJokes: ReadonlyArray<ChuckNorrisJoke>;
  setFavoriteJoke: (id: number, action: 'add' | 'remove') => void;
  setJokeFetchTimer: (shouldFetch: boolean) => void;
  fetch10RandomJokes: () => void;
  currentTabIndex: number;
  loadingState: {
    loading: boolean;
    message: string;
  };
}

const JokeList: React.FC<JokesListProps> = ({
  jokes,
  setFavoriteJoke,
  favoriteJokes,
  setJokeFetchTimer,
  currentTabIndex,
  fetch10RandomJokes,
  loadingState,
}) => {
  const [notification, setNotification] = useNotification();

  if (loadingState.loading) {
    return <LoadingContainer>{loadingState.message}</LoadingContainer>;
  }
  return (
    <div>
      {notification.visible && <JokeNotification>{notification.message}</JokeNotification>}
      {currentTabIndex === 0 ? (
        <ListWrapper>
          <SubHeading>Random jokes</SubHeading>
          <Button onClick={() => fetch10RandomJokes()}>Fetch 10 random jokes</Button>
          <List>
            {jokes.length > 0 ? (
              jokes.map(({ categories, id, joke }) => (
                <ListItem key={id}>
                  <span>
                    {joke} {'😂😂😂'} {categories.length > 0 && categories.map(category => <Category key={category}>{category}</Category>)}
                  </span>

                  <Button
                    onClick={() => {
                      if (favoriteJokes.length === MAX_JOKE_COUNT) {
                        return setNotification(`Cannot add more than ${MAX_JOKE_COUNT} jokes to the list`);
                      }
                      setNotification('Joke added to favorites');
                      setFavoriteJoke(id, 'add');
                    }}
                  >
                    Add to favorites
                  </Button>
                </ListItem>
              ))
            ) : (
              <li>Click the button to fetch 10 random jokes</li>
            )}
          </List>
        </ListWrapper>
      ) : (
        <ListWrapper>
          <SubHeading>Favorite jokes</SubHeading>
          <ButtonGroup>
            <Button onClick={() => setJokeFetchTimer(true)}>Start randomize jokes</Button>
            <Button onClick={() => setJokeFetchTimer(false)}>Stop randomize jokes</Button>
          </ButtonGroup>
          <List>
            {favoriteJokes.length > 0 ? (
              favoriteJokes.map(({ categories, id, joke }) => (
                <ListItem key={id}>
                  <span>
                    {joke}
                    {'😂😂😂'} {categories.length > 0 && categories.map(category => <Category key={category}>{category}</Category>)}
                  </span>{' '}
                  <Button
                    onClick={() => {
                      setFavoriteJoke(id, 'remove');
                      setNotification('Removed joke from list');
                    }}
                  >
                    Remove
                  </Button>
                </ListItem>
              ))
            ) : (
              <li>You have 0 favorite jokes</li>
            )}
          </List>
        </ListWrapper>
      )}
    </div>
  );
};
{
}
export default JokeList;
