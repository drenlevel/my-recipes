// Libraries
import { forwardRef, useCallback, useState } from 'react';

// Components
import ImageUpload from '#components/ImageUpload/ImageUpload';
import MultiSelect from '#components/MultiSelect/MultiSelect';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  IconButton,
  Input,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';

// Helpers
import * as translate from '#utils/translate';
import { pascalCase } from 'change-case';

// Stylesheet(s)
import './styles.css';

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

export const Ingredients = forwardRef(({ data }, ref) => {
  const inputDefaultStyling = { fontStyle: 'italic', fontWeight: 700 };
  const [selectedIngredient, setSelectedIngredient] = useState();

  const handleIngredientSelect = useCallback((_, option) => {
    console.log('Ingredient option selected!', option);
    setSelectedIngredient(option);
  }, []);
  const handleIngredientValue = useCallback((...args) => {
    console.log('Ingredient value change!', ...args);
  }, []);

  return (
    <Accordion ref={ref} className="ingredientsAccordion">
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{terms.ingredients} *</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="ingredientsAddContainer">
          <Autocomplete
            handleHomeEndKeys
            className="ingredientsAutocomplete"
            margin="dense"
            size="medium"
            variant="standard"
            options={data}
            onChange={handleIngredientSelect}
            getOptionLabel={option => option.label}
            groupBy={option => option.category}
            renderGroup={params => (
              <li key={params.key}>
                <div
                  className="ingredientsGroupHeader"
                  data-category={params.group}
                >
                  {params.group}
                </div>
                <ul style={{ padding: 0 }}>{params.children}</ul>
              </li>
            )}
            renderOption={(optionProps, option) => (
              <li {...optionProps} key={option.id} data-ingredient-option>
                <span>{option.label}</span>
                <span>{option.unit}</span>
              </li>
            )}
            renderInput={({ InputProps, ...textProps }) => (
              <TextField
                {...textProps}
                variant="standard"
                InputProps={{ ...InputProps, sx: inputDefaultStyling }}
              />
            )}
          />
          <Input
            placeholder="value"
            type="number"
            inputProps={{ min: 0, max: 5000 }}
            sx={inputDefaultStyling}
            onChange={handleIngredientValue}
            startAdornment={
              <span className="unitLabel">
                {selectedIngredient?.unit ?? 'g'}{' '}
              </span>
            }
            endAdornment={
              <IconButton>
                <AddIcon />
              </IconButton>
            }
          />
        </div>
      </AccordionDetails>
    </Accordion>
  );
});
Ingredients.displayName = 'Ingredients';
