import React, { useState, useEffect, useRef } from 'react';

import { START_INDEX, LIMIT_INDEX } from '../../constants';
import PhotosList from '../PhotosList/PhotosList';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState(START_INDEX);
  const loadingRef = useRef(null);

  const fetchPhotos = async (start) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${LIMIT_INDEX}`
      );

      if (!response.ok) {
        throw Error('Error fetching the response', response.status);
      }

      const data = await response.json();

      if (data && data.length > 0)
        setPhotos((prevPhotos) => [...prevPhotos, ...data]);
    } catch (error) {
      console.log('Error fetching photos', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos(start);
  }, [start]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStart((prevStart) => prevStart + LIMIT_INDEX);

          observer.disconnect();
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return <PhotosList photos={photos} ref={loadingRef} isLoading={isLoading} />;
};

export default Photos;
