// Libraries
import { forwardRef } from 'react';

// Components
import { TextField } from '@mui/material';
import ImageUpload from '#components/ImageUpload/ImageUpload';

// Helpers
import * as translate from '#utils/translate';

const terms = translate.recipe.getAll();

const makeField = (staticProps, displayName) => {
  const RecipeField = forwardRef((props, ref) => {
    if (/^image$/i.test(displayName)) {
      return <ImageUpload {...props} />;
    }
    // Select condition
    else if (/^select$/i.test(displayName)) {
      // do something
    }

    return (
      <TextField
        ref={ref}
        fullWidth
        id="name"
        margin="dense"
        size="medium"
        variant="standard"
        {...staticProps}
        {...props}
      />
    );
  });
  RecipeField.displayName = displayName ?? 'RecipeField';

  return RecipeField;
};

export const Title = makeField({ label: terms.title, required: true }, 'Title');
export const Type = makeField({ label: terms.type, required: true }, 'Type');
export const Description = makeField(
  { label: terms.description },
  'Description',
);
export const Image = makeField({ label: terms.image, required: true }, 'Image');
export const CookingTime = makeField(
  { label: terms.cookingTime, required: true },
  'CookingTime',
);
export const Ingredients = makeField(
  { label: terms.ingredients, required: true },
  'Ingredients',
);
export const Instructions = makeField(
  { label: terms.instructions, required: true },
  'Instructions',
);
export const Cuisines = makeField({ label: terms.cuisines }, 'Cuisines');
export const Servings = makeField({ label: terms.servings }, 'Servings');
