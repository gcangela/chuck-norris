import React from 'react';
import { SubHeading, List, ListItem, Button } from './styles';

interface JokesListProps {
  jokes: ReadonlyArray<ChuckNorrisJoke>;
  favoriteJokes: ReadonlyArray<ChuckNorrisJoke>;
  setFavoriteJoke: (id: number, action: 'add' | 'remove') => void;
}

const JokesList: React.FC<JokesListProps> = ({ jokes, setFavoriteJoke, favoriteJokes }) => {
  return (
    <div style={{ width: '100%' }}>
      <SubHeading>Random jokes</SubHeading>
      <List>
        {jokes.length > 0 &&
          jokes.map(({ categories, id, joke }) => (
            <ListItem
              key={id}
              onClick={() => {
                if (favoriteJokes.length === 10) {
                  alert('Cannot add more than 10 jokes to the list');
                  return;
                }
                setFavoriteJoke(id, 'add');
              }}
            >
              {joke}
            </ListItem>
          ))}
      </List>
      <SubHeading>Favorite jokes</SubHeading>
      <List>
        {favoriteJokes.length > 0 &&
          favoriteJokes.map(({ categories, id, joke }) => (
            <ListItem key={id}>
              {joke} <Button onClick={() => setFavoriteJoke(id, 'remove')}></Button>
            </ListItem>
          ))}
      </List>
    </div>
  );
};
{
}
export default JokesList;
