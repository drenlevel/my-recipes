import { forwardRef, useCallback } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

// Helpers
import { useRecipeDialog } from '#utils/hooks';
import * as translate from '#utils/translate';
import { RecipeImage } from '#components/RecipeImage/RecipeImage';

const terms = translate.recipe.getAll();
const visibleFields = Object.entries(terms).filter(
  x => !/(image|title|id)/i.test(x),
);

const getValue = item => {
  if (item?.constructor === Object) return item.label;
  else if (Array.isArray(item)) return item.map(getValue).join(', ').trim();

  return item;
};

export const ViewRecipeModal = forwardRef((_, ref) => {
  // State
  const [recipe, shown] = useRecipeDialog(ref);

  // Callbacks
  const handleClose = useCallback(() => ref.current.hide(), [ref]);

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
          sx={{ border: '1px solid grey', borderRadius: '3px', padding: '3px' }}
        >
          {visibleFields.map(([key, term]) => {
            return (
              <div key={key}>
                <label>
                  <b>{term}</b>
                </label>
                <p>
                  {getValue(recipe?.[key]) ?? (
                    <i style={{ color: 'grey' }}>N/A</i>
                  )}
                </p>
              </div>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
});
ViewRecipeModal.displayName = 'ViewRecipeModal';
