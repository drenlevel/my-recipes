import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { db } from '#utils/firebase';
import { AddSchema } from '#schemas/AddRecipe.validator';
import { useAuthContext } from '#utils/hooks';
import { secureGetDoc } from '#utils/firebase/helpers';

export const UpdateRecipe = ({ open, setOpen, id }) => {
  const { currentUser } = useAuthContext();
  const [recipe, setRecipe] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddSchema),
  });

  // Memoized
  const recipeRef = useMemo(() => doc(db, 'recipes', id), [id]);

  // Effects
  useEffect(() => {
    secureGetDoc(recipeRef).then(setRecipe);
  }, [recipeRef]);

  // Callbacks
  const handleClose = () => setOpen(false);
  const onSubmit = async data => {
    await updateDoc(recipeRef, {
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
        <DialogTitle>Update recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update title and description of your recipe
          </DialogContentText>

          <TextField
            autoFocus
            size="small"
            margin="dense"
            defaultValue={recipe?.title}
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
            defaultValue={recipe?.description}
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
          <Button type="submit">Update recipe</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
