import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const url = `https://restcountries.com/v2/name/${name}?fullText=true`;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      if (name) {
        try {
          const result = await axios.get(url)
          if (result.data[0].message !== 'Not Found') {
            console.log('this is the result', result)
            const data = result.data[0];
            const found = true;
            setCountry({ data, found })
          }
        } catch(error) {
          console.log('This is the error', error)
          const data = null;
          const found = false
          setCountry({ data, found })
        }
      }

      setIsLoading(false);
    };

    fetchData();
  }, [name, url]);

  return { country, isLoading };
};