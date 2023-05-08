import { forwardRef, useCallback, useRef } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useAuthContext, useDataContext, useRecipeDialog } from '#utils/hooks';
import * as RecipeField from '#components/RecipeField/RecipeField';
import {
  secureAddDoc,
  secureGetDoc,
  secureUpdateDoc,
  uploadImage,
} from '#utils/firebase/helpers';

const isNotEmpty = x => ![undefined, null].some(y => y === x);

export const AddRecipeModal = forwardRef((_, ref) => {
  // State
  const formRef = useRef({});
  const { uid = '' } = useAuthContext()?.currentUser ?? {};
  const [recipe, shown] = useRecipeDialog(ref);
  const { recipeTypes, cuisines, ingredients } = useDataContext();

  const recipeStateRef = useRef({});

  // Callbacks
  const handleClose = useCallback(() => ref.current.hide(), [ref]);
  const onRecipeStateChange = useCallback((key, data) => {
    if (data?.target) {
      data = data.target.value;
    } else if (data?.ref) {
      data = data.ref;
    } else if (Array.isArray(data)) {
      data = data.map(({ ref, value } = {}) => ({
        ref,
        ...(isNotEmpty(value) && { value }),
      }));
    }

    recipeStateRef.current[key] = data;
  }, []);

  const onRecipeSubmit = useCallback(async () => {
    const allData = recipeStateRef.current;
    const action = recipe?.id ? secureUpdateDoc : secureAddDoc;
    const currImageTitle = allData.image.name;

    if (
      (!!recipe?.image && recipe?.image !== currImageTitle) ||
      !!currImageTitle
    ) {
      //
    }

    const image = uploadImage(allData.image);
    const data = { ...allData, image, ownerId: uid };
    const { path } = await action(data, 'recipes', recipe?.id);
    // eslint-disable-next-line no-unused-vars
    const docResult = await secureGetDoc(path);

    handleClose();
  }, [handleClose, recipe?.id, recipe?.image, uid]);

  return (
    <Dialog open={shown} onClose={handleClose}>
      <Box ref={formRef} onSubmit={onRecipeSubmit}>
        <DialogTitle>{recipe?.id ? 'Update' : 'Add'} recipe</DialogTitle>
        <DialogContent>
          <RecipeField.Title onChange={onRecipeStateChange} />
          <RecipeField.Type
            options={recipeTypes}
            onChange={onRecipeStateChange}
          />
          <RecipeField.Description onChange={onRecipeStateChange} />
          <RecipeField.Image onChange={onRecipeStateChange} />
          <RecipeField.CookingTime onChange={onRecipeStateChange} />
          <RecipeField.Ingredients
            data={ingredients}
            onChange={onRecipeStateChange}
          />
          <RecipeField.Instructions onChange={onRecipeStateChange} />
          <RecipeField.Cuisines
            options={cuisines}
            onChange={onRecipeStateChange}
          />
          <RecipeField.Servings onChange={onRecipeStateChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={onRecipeSubmit}>
            {recipe?.id ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
});
AddRecipeModal.displayName = 'AddRecipeModal';
