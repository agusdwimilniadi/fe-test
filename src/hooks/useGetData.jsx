import { useState, useCallback } from 'react';
import { instance } from '../utils/instance';

const useGetData = () => {
  const [isLoading, setIsLoading] = useState(false);

  const data = useCallback(async (endpoint) => {
    setIsLoading(true);
    try {
      const res = await instance.get(endpoint);
      setIsLoading(false);
      return res.data;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      return null;
    }
  }, []);

  return { data, isLoading };
};

export default useGetData;
