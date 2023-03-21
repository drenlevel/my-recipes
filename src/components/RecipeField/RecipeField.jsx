// Libraries
import { forwardRef } from 'react';

// Components
import ImageUpload from '#components/ImageUpload/ImageUpload';
import MultiSelect from '#components/MultiSelect/MultiSelect';
import TextField from '@mui/material/TextField';

// Helpers
import * as translate from '#utils/translate';
import { pascalCase } from 'change-case';

const terms = translate.recipe.getAll();
const defaultStaticProps = {
  fullWidth: true,
  id: 'name',
  margin: 'dense',
  size: 'medium',
  variant: 'standard',
};

const makeField = ({ component, ...staticProps }) => {
  const displayName = pascalCase(staticProps.label);
  const Component = component ?? TextField;
  const RecipeField = forwardRef((props, ref) => {
    return <Component ref={ref} {...staticProps} {...props} />;
  });
  RecipeField.displayName = displayName ?? 'RecipeField';

  return RecipeField;
};

export const Title = makeField({
  ...defaultStaticProps,
  label: terms.title,
  required: true,
});
export const Type = makeField({
  label: terms.type,
  AutoCompleteProps: { limitTags: 2, multiple: false },
  TextFieldProps: { ...defaultStaticProps, required: true, label: terms.type },
  component: MultiSelect,
});
export const Description = makeField({
  ...defaultStaticProps,
  label: terms.description,
});
export const Image = makeField({
  component: ImageUpload,
  label: terms.image,
  required: true,
});
export const CookingTime = makeField({
  ...defaultStaticProps,
  label: terms.cookingTime,
  required: true,
});

export const Instructions = makeField({
  ...defaultStaticProps,
  label: terms.instructions,
  required: true,
});
export const Cuisines = makeField({
  label: terms.cuisines,
  AutoCompleteProps: { limitTags: 2 },
  TextFieldProps: { ...defaultStaticProps, label: terms.cuisines },
  component: MultiSelect,
});
export const Servings = makeField({
  ...defaultStaticProps,
  label: terms.servings,
});

export { Group as Ingredients } from '#components/Ingredient';
