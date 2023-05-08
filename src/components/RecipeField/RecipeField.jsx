// Libraries
import { forwardRef } from 'react';

// Components
import ImageUpload from '#components/ImageUpload/ImageUpload';
import MultiSelect from '#components/MultiSelect/MultiSelect';
import TextField from '@mui/material/TextField';

// Helpers
import * as translate from '#utils/translate';
import { constantCase, pascalCase } from 'change-case';
import * as FIELDS from '#constants/fields';

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
  const fieldName = FIELDS[constantCase(displayName)];
  const Component = component ?? TextField;
  const RecipeField = forwardRef(({ onChange, ...props }, ref) => (
    <Component
      {...staticProps}
      {...props}
      ref={ref}
      onChange={onChange.bind(null, fieldName)}
    />
  ));
  RecipeField.displayName = displayName ?? 'RecipeField';

  return RecipeField;
};

export const Title = makeField({
  ...defaultStaticProps,
  label: terms.title,
  required: false,
});
export const Type = makeField({
  label: terms.type,
  AutoCompleteProps: { limitTags: 2, multiple: false },
  TextFieldProps: { ...defaultStaticProps, required: false, label: terms.type },
  component: MultiSelect,
});
export const Description = makeField({
  ...defaultStaticProps,
  label: terms.description,
  multiline: true,
  rows: 2,
});
export const Image = makeField({
  component: ImageUpload,
  label: terms.image,
  required: false,
});
export const CookingTime = makeField({
  ...defaultStaticProps,
  label: terms.cookingTime,
  required: false,
});
export const Instructions = makeField({
  ...defaultStaticProps,
  label: terms.instructions,
  multiline: true,
  required: false,
  placeholder: 'Separate steps, by making a new line starting with "-"',
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
  placeholder: 'How many portions',
});
export { Group as Ingredients } from '#components/Ingredient';
