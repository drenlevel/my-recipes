// Libraries
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

// Components
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
import IngredientsList from './List';

// Helpers
import { useMutableMap } from '#utils/hooks';
import { recipe as translateRecipe } from '#utils/translate';

// Constants
import { MAX_INPUT_VALUE } from '#constants/values';
import { INGREDIENTS as fieldName } from '#constants/fields';

const INGREDIENTS_LABEL = translateRecipe('INGREDIENTS');

const Ingredients = forwardRef(({ data, onChange }, ref) => {
  // State
  const inputDefaultStyling = { fontStyle: 'italic', fontWeight: 700 };
  const [selectedIngredient, setSelectedIngredient] = useState();
  const [ingredientValue, setIngredientValue] = useState(0);
  const ingredientsListRef = useRef({ values: [] });
  const addIconRef = useRef({});
  const valueInputRef = useRef({});
  const searchInputRef = useRef({});
  const inputsRef = useRef({});

  // Callbacks
  const handleIngredientSelect = useCallback((_, option) => {
    setSelectedIngredient(option);
  }, []);
  const handleIngredientValue = useCallback(({ target }) => {
    setIngredientValue(target.valueAsNumber || 0);
  }, []);
  const handleIngredientRegister = useCallback(() => {
    const { id } = selectedIngredient ?? {};
    const ingredientsData = { ...selectedIngredient, value: ingredientValue };

    ingredientsListRef.current.set(id, ingredientsData);
    onChange?.(fieldName, ingredientsListRef.current.values);
    inputsRef.current.search.clear();
    inputsRef.current.search.open();
  }, [selectedIngredient, ingredientValue, onChange]);
  const handleIngredientReadjust = useCallback(
    (action = 'set', id, value) => {
      const item = ingredientsListRef.current.get(id);

      ingredientsListRef.current[action]?.(id, { ...item, value });
      onChange?.(fieldName, ingredientsListRef.current.values);
    },
    [onChange],
  );
  const handleValueKeydown = useCallback(function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      event.target.value = '';

      addIconRef.current?.click?.();
    }
  }, []);
  const handleAutoFocusOnExpand = useCallback((_, expanded) => {
    expanded && setTimeout(() => inputsRef.current.search.open(), 100);
  }, []);

  // Effects
  useMutableMap(ingredientsListRef);
  useEffect(() => {
    const search = searchInputRef.current.querySelector('input[role=combobox]');
    const value = valueInputRef.current.querySelector('input[type=number]');

    if (search instanceof HTMLInputElement) {
      search.clear = () => {
        search.nextElementSibling
          .querySelector('button[aria-label="Clear"]')
          ?.click();
      };
      search.open = () => {
        search.nextElementSibling
          .querySelector('button[aria-label="Open"]')
          ?.click();
      };
    }

    inputsRef.current = { search, value };
  }, []);

  return (
    <Accordion
      className="ingredientsAccordion"
      onChange={handleAutoFocusOnExpand}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{INGREDIENTS_LABEL} *</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="ingredientsAddContainer">
          <Autocomplete
            handleHomeEndKeys
            disableCloseOnSelect
            clearOnEscape
            selectOnFocus
            openOnFocus
            clearOnBlur={false}
            ref={ref}
            className="ingredientsAutocomplete"
            margin="dense"
            size="medium"
            variant="standard"
            options={data}
            onChange={handleIngredientSelect}
            getOptionDisabled={({ id }) => !!ingredientsListRef.current.get(id)}
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
                ref={searchInputRef}
                variant="standard"
                InputProps={{ ...InputProps, sx: inputDefaultStyling }}
                onKeyDown={event => {
                  event.key === 'Enter' && inputsRef.current.value?.focus();
                }}
              />
            )}
          />
          <Input
            ref={valueInputRef}
            disabled={!selectedIngredient}
            placeholder="value"
            type="number"
            inputProps={{ min: 0, max: MAX_INPUT_VALUE }}
            sx={inputDefaultStyling}
            onKeyDown={handleValueKeydown}
            onChange={handleIngredientValue}
            startAdornment={
              <span className="unitLabel" disabled={!selectedIngredient}>
                {selectedIngredient?.unit ?? 'g'}{' '}
              </span>
            }
            endAdornment={
              <IconButton
                ref={addIconRef}
                disabled={!selectedIngredient}
                onClick={handleIngredientRegister}
              >
                <AddIcon />
              </IconButton>
            }
          />
        </div>
        <div className="ingredientsRegisteredContainer">
          <IngredientsList
            editableValue
            data={ingredientsListRef.current.values}
            onEdit={handleIngredientReadjust.bind(null, 'set')}
            onRemove={handleIngredientReadjust.bind(null, 'delete')}
          />
        </div>
      </AccordionDetails>
    </Accordion>
  );
});
Ingredients.displayName = 'Ingredients';

export default Ingredients;
