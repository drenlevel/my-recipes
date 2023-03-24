// Libraries
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { forwardRef, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { storage } from '#utils/firebase';
import { Grow } from '@mui/material';

const imageCache = {};

export const RecipeImage = forwardRef(
  ({ imageRef: _imageRef, idx = 0, noTransition, ...props }, ref) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
      if (!_imageRef) return;
      else if (_imageRef in imageCache) {
        return setImageSrc(imageCache[_imageRef]);
      }

      const imageRef = storageRef(storage, _imageRef);

      getDownloadURL(imageRef)
        .then(url => {
          // Use the URL to display the image
          imageCache[_imageRef] = url;
          setImageSrc(url);
        })
        .catch(error => {
          // Handle any errors
          toast.error(
            `Failed to fetch image!\n\nSource: ${imageRef}.\nReason: ${error.message}`,
          );
          console.error(error);
        });
    }, [_imageRef]);

    if (noTransition) return <img {...props} ref={ref} src={imageSrc} />;

    return (
      <Grow in={!!imageSrc} timeout={(idx + 1) * 1000}>
        <img {...props} ref={ref} src={imageSrc} />
      </Grow>
    );
  },
);
RecipeImage.displayName = 'RecipeImage';
