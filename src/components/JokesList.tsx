import React from 'react';

interface JokesListProps {
  jokes: ReadonlyArray<ChuckNorrisJoke>;
  favoriteJokes: ReadonlyArray<ChuckNorrisJoke>;
  setFavoriteJoke: (id: number, action: 'add' | 'remove') => void;
}

const JokesList: React.FC<JokesListProps> = ({ jokes, setFavoriteJoke, favoriteJokes }) => {
  return (
    <div>
      <h1>Random jokes</h1>
      <ul>
        {jokes.length > 0 &&
          jokes.map(({ categories, id, joke }) => (
            <li key={id}>
              {joke}
              <button
                onClick={() => {
                  if (favoriteJokes.length === 10) {
                    alert('Cannot add more than 10 jokes to the list');
                    return;
                  }
                  setFavoriteJoke(id, 'add');
                }}
              >
                add to favorites
              </button>
            </li>
          ))}
      </ul>
      <h1>Favorite jokes</h1>
      <ul>
        {favoriteJokes.length > 0 &&
          favoriteJokes.map(({ categories, id, joke }) => (
            <li key={id}>
              {joke}
              <button onClick={() => setFavoriteJoke(id, 'remove')}>remove from favorites</button>
            </li>
          ))}
      </ul>
    </div>
  );
};
{
}
export default JokesList;
