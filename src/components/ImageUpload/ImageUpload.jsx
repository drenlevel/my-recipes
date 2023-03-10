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

const ImageUpload = forwardRef(({ inputProps, ...props }, ref) => {
  const [imageFileName, setImageFileName] = useState('');
  const fileUploadRef = useRef({});

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
                    setImageFileName('');
                    fileUploadRef.current.value = '';
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

          setImageFileName(file.name);
        }}
      />
      {/*  <IconButton
        aria-label="upload"
        color="inherit"
        sx={{ width: 'fit-content' }}
        onClick={() => fileUploadRef.current.click()}
      >
        <AddToPhotosOutlined fontSize="large" />
      </IconButton> */}
    </FormControl>
  );
});
ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;
