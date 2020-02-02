import React from 'react';

interface JokesListProps {
  jokes: ReadonlyArray<{
    id: number;
    joke: string;
    categories: string[];
  }>;
}

const JokesList: React.FC<JokesListProps> = ({ jokes }) => {
  return (
    <div>
      <ul>
        {jokes.length > 0 &&
          jokes.map(({ categories, id, joke }) => {
            return <li key={id}>{joke}</li>;
          })}
      </ul>
    </div>
  );
};

export default JokesList;
