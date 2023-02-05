import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useContext } from 'react';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddRecipeFormSchema } from '../../../schemas/AddRecipe.validator';

export const AddRecipeModal = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const { currentUser } = useContext(AuthContext);

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddRecipeFormSchema),
  });

  const onSubmit = async (data) => {
    await addDoc(collection(db, 'recipes'), {
      title: data.title,
      description: data.description,
      user: currentUser.uid,
      timeStamp: serverTimestamp(),
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add new recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write title and description of your recipe
          </DialogContentText>

          <TextField
            autoFocus
            size="small"
            margin="dense"
            id="name"
            label="Title"
            fullWidth
            variant="standard"
            helperText={errors?.title?.message}
            error={!!errors?.title}
            {...register('title')}
          />
          <TextField
            multiline
            size="small"
            rows={5}
            margin="dense"
            id="name"
            label="Description"
            fullWidth
            variant="standard"
            helperText={errors?.description?.message}
            error={!!errors?.description}
            {...register('description')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add recipe</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
