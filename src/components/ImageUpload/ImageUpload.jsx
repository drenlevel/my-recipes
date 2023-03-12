// Components
import { AddToPhotosOutlined, BackspaceOutlined } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';

// Styles
import { forwardRef, useRef, useState } from 'react';
import ImageDragAndDrop from './ImageDragAndDrop';
import './styles.module.css';

const ImageUpload = forwardRef(({ inputProps, ...props }, ref) => {
  const [imageFile, setImageFile] = useState('');
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
              {imageFile && (
                <IconButton
                  aria-label="upload image"
                  edge="end"
                  sx={{ width: 'fit-content' }}
                  onClick={() => {
                    const { setImage } = dragAndDropContainerRef.current ?? {};
                    fileUploadRef.current.value = '';

                    setImage?.('');
                    setImageFile('');
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
        InputLabelProps={{ shrink: !!imageFile }}
        value={imageFile?.name}
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
          setImageFile(file.name);
        }}
      />
      <ImageDragAndDrop
        ref={dragAndDropContainerRef}
        onDragSuccess={file => setImageFile(file.name)}
      />
    </FormControl>
  );
});
ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;
