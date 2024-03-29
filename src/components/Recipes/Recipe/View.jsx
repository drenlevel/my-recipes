import { forwardRef, useCallback, useEffect, useMemo } from 'react';

// Components
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from '@mui/material';
import { List as IngredientsList } from '#components/Ingredient';
import { RecipeImage } from '#components/RecipeImage/RecipeImage';

// Helpers
import { useRecipeDialog } from '#utils/hooks';
import * as translate from '#utils/translate';

// Constants
import * as FIELDS from '#constants/fields';
import { useNavigate } from 'react-router-dom';

const terms = translate.recipe.getAll();
const visibleFields = Object.entries(terms).filter(
  x => !/(image|title|id)/i.test(x),
);

const FieldInfo = ({ label, field, value: fieldValue }) => {
  const content = useMemo(() => {
    // Handle ingredients info
    const hasNoValue =
      (Array.isArray(fieldValue) && !fieldValue.length) ||
      fieldValue === undefined ||
      fieldValue === null;

    if (hasNoValue) return;

    switch (field) {
      case FIELDS.CUISINES:
        if (!fieldValue.length) return;

        return fieldValue.map(({ label }) => (
          <Chip key={label} label={label} color="secondary" />
        ));
      case FIELDS.INGREDIENTS:
        if (!fieldValue.length) return;

        return <IngredientsList data={fieldValue} />;
      case FIELDS.TYPE:
        return <Chip label={fieldValue.label} color="info" />;
      case FIELDS.TITLE:
      case FIELDS.DESCRIPTION:
      case FIELDS.IMAGE:
      case FIELDS.COOKING_TIME:
      case FIELDS.INSTRUCTIONS:
      case FIELDS.SERVINGS:
      default:
        if (fieldValue?.constructor === Object) {
          return fieldValue.label;
        } else if (Array.isArray(fieldValue)) {
          return fieldValue.join(', ').trim();
        }

        return fieldValue;
    }
  }, [field, fieldValue]);

  return (
    <div data-field-container>
      <Divider textAlign="left">
        <Chip label={label} color="primary" variant="outlined" />
      </Divider>
      <div data-field-value data-no-value={!content ? 'N/A' : undefined}>
        {content}
      </div>
    </div>
  );
};

export const ViewRecipeModal = forwardRef((_, ref) => {
  // State
  const [recipe, shown] = useRecipeDialog(ref);
  const navigate = useNavigate();

  // Callbacks
  const handleClose = useCallback(() => {
    ref.current.hide();
    navigate('/home');
  }, [ref, navigate]);

  useEffect(() => {
    document.title = `My recipes${shown ? ' - ' + recipe?.title : ''}`;
  }, [recipe?.title, shown]);

  return (
    <Dialog open={shown} onClose={handleClose} sx={{ maxHeight: '95%' }}>
      <Box component="div" sx={{ padding: '10px' }}>
        <DialogTitle
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            placeItems: 'center',
          }}
        >
          <RecipeImage
            noTransition
            imageRef={recipe?.image}
            style={{ objectFit: 'cover', aspectRatio: 16 / 9, width: '100%' }}
          />
          <span style={{ fontWeight: 900, fontStyle: 'italic' }}>
            {recipe?.title}
          </span>
        </DialogTitle>
        <DialogContent
          sx={{
            border: '1px solid grey',
            borderRadius: '3px',
            padding: '8px !important',
          }}
        >
          {visibleFields.map(([field, label]) => (
            <FieldInfo
              key={field}
              label={label}
              field={field}
              value={recipe?.[field]}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
});
ViewRecipeModal.displayName = 'ViewRecipeModal';
