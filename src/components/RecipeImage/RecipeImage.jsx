// Libraries
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { forwardRef, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { storage } from '#utils/firebase';

export const RecipeImage = forwardRef(
  ({ imageRef: _imageRef, ...props }, ref) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
      const imageRef = storageRef(storage, `images/${_imageRef}`);

      getDownloadURL(imageRef)
        .then(url => {
          // Use the URL to display the image
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

    return <img {...props} ref={ref} src={imageSrc} />;
  },
);
RecipeImage.displayName = 'RecipeImage';
