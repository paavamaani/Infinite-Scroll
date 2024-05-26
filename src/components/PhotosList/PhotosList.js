import React, { forwardRef } from 'react';
import LazyLoad from 'react-lazyload';

import './PhotosList.css';

const PhotosList = forwardRef((props, ref) => {
  const { photos, isLoading } = props;

  return (
    <>
      <div className='photos-list'>
        {photos.map((photo) => {
          return (
            <div className='photo-wrapper' key={photo.id}>
              <LazyLoad
                height={350}
                placeholder={<img src={photo.thumbnailUrl} />}
                once
              >
                <img className='photo' src={photo.url} alt='Photo' />
              </LazyLoad>
              <p className='title'> {photo.title} </p>
            </div>
          );
        })}
      </div>
      <div ref={ref}>{isLoading ? 'Loading...' : ''}</div>
    </>
  );
});

export default PhotosList;
