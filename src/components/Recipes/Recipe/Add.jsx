import {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { AuthContext } from '#components/AuthProvider/AuthProvider';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '#utils/firebase';
import { AddSchema } from '#schemas/AddRecipe.validator';
import * as RecipeField from '#components/RecipeField/RecipeField';
import { toast } from 'react-hot-toast';

export const AddRecipeModal = forwardRef((_, ref) => {
  // State
  const formRef = useRef({});
  const { currentUser } = useContext(AuthContext);
  const [shown, setShown] = useState(false);
  const { register, handleSubmit, formState } = useForm(AddSchema);
  const { errors } = formState;

  // Callbacks
  const onSubmit = async data => {
    try {
      await addDoc(collection(db, 'recipes'), {
        ...data,
        user: currentUser.uid,
        timeStamp: serverTimestamp(),
      });
      setShown(false);
    } catch (error) {
      toast.error(error);
    }
  };

  // Hooks
  useImperativeHandle(
    ref,
    () => ({ toggleShown: isOpen => setShown(state => isOpen ?? !state) }),
    [],
  );

  return (
    <Dialog open={shown} onClose={setShown.bind(null, false)}>
      <Box ref={formRef} component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add new recipe</DialogTitle>
        <DialogContent>
          <RecipeField.Title
            {...register('title')}
            error={errors?.title}
            helperText={errors?.title?.message}
          />
          <RecipeField.Type
            {...register('type')}
            error={errors?.type}
            helperText={errors?.type?.message}
          />
          <RecipeField.Description
            {...register('description')}
            error={errors?.description}
            helperText={errors?.description?.message}
          />
          <RecipeField.Image
            {...register('image')}
            error={errors?.image}
            helperText={errors?.image?.message}
          />
          <RecipeField.CookingTime
            {...register('cookingTime')}
            error={errors?.cookingTime}
            helperText={errors?.cookingTime?.message}
          />
          <RecipeField.Ingredients
            {...register('ingredients')}
            error={errors?.ingredients}
            helperText={errors?.ingredients?.message}
          />
          <RecipeField.Instructions
            {...register('instructions')}
            error={errors?.instructions}
            helperText={errors?.instructions?.message}
          />
          <RecipeField.Cuisines
            {...register('cuisines')}
            error={errors?.cuisines}
            helperText={errors?.cuisines?.message}
          />
          <RecipeField.Servings
            {...register('servings')}
            error={errors?.servings}
            helperText={errors?.servings?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={setShown.bind(null, false)}>Cancel</Button>
          <Button type="submit">Add recipe</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
});
AddRecipeModal.displayName = 'AddRecipeModal';
