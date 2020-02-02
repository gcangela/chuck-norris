import React from 'react';

interface JokesListProps {
  jokes: ReadonlyArray<{
    id: number;
    joke: string;
    categories: string[];
  }>;
  favoriteJokes: ReadonlyArray<{
    id: number;
    joke: string;
    categories: string[];
  }>;
  setFavoriteJoke: (id: number, action: 'add' | 'remove') => void;
}

const JokesList: React.FC<JokesListProps> = ({ jokes, setFavoriteJoke, favoriteJokes }) => {
  const [showFavorites, setShowFavorites] = React.useState(false);
  return (
    <div>
      <button onClick={() => setShowFavorites(false)}>Show all</button>
      <button onClick={() => setShowFavorites(true)}>Show favorites</button>
      {showFavorites ? (
        <ul>
          {favoriteJokes.length > 0 &&
            favoriteJokes.map(({ id, joke }) => (
              <li key={id}>
                {joke}
                <button onClick={() => setFavoriteJoke(id, 'remove')}>remove from favorites</button>
              </li>
            ))}
        </ul>
      ) : (
        <ul>
          {jokes.length > 0 &&
            jokes.map(({ id, joke }) => (
              <li key={id}>
                {joke}
                <button
                  onClick={() => {
                    if (favoriteJokes.length === 10) {
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
      )}
    </div>
  );
};
{
}
export default JokesList;
