// Components
import { FormControl, InputAdornment, TextField } from '@mui/material';
import {
  AddToPhotosOutlined,
  Filter1Outlined,
  BackspaceOutlined,
} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
// import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
// import Filter1Icon from '@mui/icons-material/Filter1';

// Helpers

// Styles
import styles from './styles.module.css';
import { forwardRef, useRef, useState } from 'react';
import ImageDragAndDrop from './ImageDragAndDrop';

const ImageUpload = forwardRef(({ inputProps, ...props }, ref) => {
  const [imageFileName, setImageFileName] = useState('');
  const fileUploadRef = useRef({});
  const dragAndDropContainerRef = useRef({});

  return (
    <FormControl fullWidth>
      <TextField
        {...props}
        required
        margin="dense"
        size="large"
        variant="standard"
        ref={ref}
        label="Image"
        InputProps={{
          readOnly: true,
          tabIndex: -1,
          endAdornment: (
            <InputAdornment position="end">
              {imageFileName && (
                <IconButton
                  aria-label="upload image"
                  edge="end"
                  sx={{ width: 'fit-content' }}
                  onClick={() => {
                    const { setImage } = dragAndDropContainerRef.current ?? {};
                    fileUploadRef.current.value = '';

                    setImage?.('');
                    setImageFileName('');
                  }}
                >
                  <BackspaceOutlined
                    color="secondary"
                    fontSize="medium"
                    sx={{ marginRight: '5px' }}
                  />
                </IconButton>
              )}
              <IconButton
                aria-label="upload image"
                edge="end"
                sx={{ width: 'fit-content' }}
                onClick={() => fileUploadRef.current.click()}
              >
                <AddToPhotosOutlined
                  color="primary"
                  fontSize="medium"
                  sx={{ marginRight: '10px' }}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ shrink: !!imageFileName }}
        value={imageFileName}
      />
      <input
        {...inputProps}
        ref={fileUploadRef}
        name="imgUpload"
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={({ target }) => {
          const [file] = target.files;
          const { setImage } = dragAndDropContainerRef.current ?? {};

          setImage?.(file);
          setImageFileName(file.name);
        }}
      />
      <ImageDragAndDrop
        ref={dragAndDropContainerRef}
        onDragSuccess={file => {
          debugger;
          setImageFileName(file.name);
        }}
      />
    </FormControl>
  );
});
ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;
