import React from 'react';

export const useLocalStorage = (key: string): [string | null, (value: string) => void] => {
  const [storageValue, setStorageValue] = React.useState<string | null>(localStorage.getItem(key));
  return [
    storageValue,
    value => {
      localStorage.setItem(key, value);
      setStorageValue(value);
    },
  ];
};
