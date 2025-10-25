import { useState, useEffect } from 'react';
import { whopService } from '../services/whop';

export const useWhop = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      whopService.init();
      const currentUser = await whopService.getCurrentUser();
      setUser(currentUser);
      setIsInitialized(true);
    };

    initialize();
  }, []);

  return {
    isInitialized,
    user,
  };
};
