// Libraries
import { forwardRef, useImperativeHandle, useState } from 'react';

// Components
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

// Helpers
import { fileToDataUrl } from '#utils/object';

// Constants
import * as TRANSLATIONS from '#constants/translations';

// Styles
import styles from './styles.module.css';

const handleCommonEventSteps = callback => event => {
  event.preventDefault();
  event.stopPropagation();
  callback?.(event);
};

const ImageDragAndDrop = forwardRef(({ onDragSuccess }, ref) => {
  // State
  const [image, setImage] = useState();
  const [imageTitle, setImageTitle] = useState('');
  const [dragging, setDragging] = useState(false);

  // Callbacks
  const handleDragEnter = handleCommonEventSteps(setDragging.bind(null, true));
  const handleDragLeave = handleCommonEventSteps(setDragging.bind(null, false));
  const handleDragOver = handleCommonEventSteps(setDragging.bind(null, true));
  const handleDrop = handleCommonEventSteps(({ dataTransfer }) => {
    setDragging(false);

    const [file] = dataTransfer.files;
    fileToDataUrl(file).then(fileAsDataURI => {
      setImage(fileAsDataURI);
      setImageTitle(file.name);
      onDragSuccess(file);
    });
  });

  // Hooks
  useImperativeHandle(
    ref,
    () => ({
      setImage: file => {
        if (!(file instanceof File)) {
          setImage();
          setImageTitle('');
        } else {
          fileToDataUrl(file).then(fileAsDataURI => {
            setImage(fileAsDataURI);
            setImageTitle(file.name);
          });
        }
      },
    }),
    [],
  );

  return (
    <div
      data-is-dragging={dragging}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      title={TRANSLATIONS.ACTIONS.DRAG_AND_DROP_IMAGE}
    >
      <AddPhotoAlternateOutlinedIcon color="info" fontSize="large" />
      <div className={styles.container}>
        {image && <img src={image} alt="dropped" title={imageTitle} />}
      </div>
    </div>
  );
});
ImageDragAndDrop.displayName = 'ImageDragAndDrop';

export default ImageDragAndDrop;
