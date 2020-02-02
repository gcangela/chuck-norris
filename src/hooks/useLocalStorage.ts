import React from 'react';

export const useLocalStorage = (key): [string | null, (value: string) => void] => {
  const [storageValue, setStorageValue] = React.useState(localStorage.getItem(key));
  return [
    storageValue,
    value => {
      localStorage.setItem(key, value);
      setStorageValue(value);
    },
  ];
};
