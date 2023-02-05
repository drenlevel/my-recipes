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
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { db } from '../../../firebase';
import { AddRecipeFormSchema } from '../../../schemas/AddRecipe.validator';
import { AuthContext } from '../../AuthProvider/AuthProvider';

export const UpdateRecipe = ({ open, setOpen, id }) => {
  const recipeRef = doc(db, 'recipes', id);
  const { currentUser } = useContext(AuthContext);
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    // LISTEN (REALTIME)
    (async () => {
      let recipe = {};
      const recipes = await getDoc(recipeRef);
      if (recipes.exists()) {
        recipe = recipes.data();
        setRecipe(recipe);
      } else {
        console.log('No such document!');
      }
    })();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddRecipeFormSchema),
  });

  const onSubmit = async (data) => {
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
