import { forwardRef, useCallback, useRef } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAuthContext, useDataContext, useRecipeDialog } from '#utils/hooks';
import { AddSchema } from '#schemas/AddRecipe.validator';
import * as RecipeField from '#components/RecipeField/RecipeField';
import {
  reportCommonError,
  secureAddDoc,
  secureUpdateDoc,
} from '#utils/firebase/helpers';

export const AddRecipeModal = forwardRef((_, ref) => {
  // State
  const formRef = useRef({});
  const { uid = '' } = useAuthContext()?.currentUser ?? {};
  const [recipe, shown] = useRecipeDialog(ref);
  const { register, handleSubmit, formState } = useForm(AddSchema);
  const { errors } = formState;
  const { recipeTypes, cuisines, ingredients } = useDataContext();

  // Callbacks
  const handleClose = useCallback(() => ref.current.hide(), [ref]);
  const onRecipeSubmit = useCallback(
    async data => {
      try {
        debugger;
        const action = recipe?.id ? secureUpdateDoc : secureAddDoc;
        await action({ ...data, user: uid }, 'recipes', recipe?.id);
        debugger;
        handleClose();
      } catch (error) {
        reportCommonError(error);
      }
    },
    [handleClose, recipe?.id, uid],
  );

  const generateProps = key => ({
    ...register(key),
    error: errors?.[key],
    helperText: errors?.[key]?.message,
  });

  return (
    <Dialog open={shown} onClose={handleClose}>
      <Box
        ref={formRef}
        component="form"
        onSubmit={handleSubmit(onRecipeSubmit)}
      >
        <DialogTitle>Add recipe</DialogTitle>
        <DialogContent>
          <RecipeField.Title {...generateProps('title')} />
          <RecipeField.Type {...generateProps('type')} options={recipeTypes} />
          <RecipeField.Description {...generateProps('description')} />
          <RecipeField.Image {...generateProps('image')} />
          <RecipeField.CookingTime {...generateProps('cookingTime')} />
          <RecipeField.Ingredients
            {...generateProps('ingredients')}
            data={ingredients}
          />
          <RecipeField.Instructions {...generateProps('instructions')} />
          <RecipeField.Cuisines
            {...generateProps('cuisines')}
            options={cuisines}
          />
          <RecipeField.Servings {...generateProps('servings')} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit">{recipe?.id ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
});
AddRecipeModal.displayName = 'AddRecipeModal';
