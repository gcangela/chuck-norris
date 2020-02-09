import { useState, useEffect } from 'react';

interface NotificationState {
  visible: boolean;
  message: string;
}

export const useNotification = (): [NotificationState, (message: string) => void] => {
  const [jokeNotification, setJokeNotification] = useState<NotificationState>({ visible: false, message: '' });
  useEffect(() => {
    const timeout = setTimeout(() => {
      setJokeNotification({ message: '', visible: false });
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [jokeNotification.visible]);
  const handleJokeNotification = (message: string) => {
    setJokeNotification({ message, visible: true });
  };
  return [jokeNotification, handleJokeNotification];
};
