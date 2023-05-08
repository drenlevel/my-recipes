import React, { forwardRef, useCallback } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRecipeDialog } from '#utils/hooks';
import { secureDeleteDoc } from '#utils/firebase/helpers';
import { toast } from 'react-hot-toast';

export const DeleteRecipeModal = forwardRef((_, ref) => {
  // State
  const [recipe, shown] = useRecipeDialog(ref, {});

  // Callbacks
  const handleClose = useCallback(() => ref.current.hide(), [ref]);
  const onDeletionConfirmed = useCallback(() => {
    secureDeleteDoc('recipes', recipe?.id).then(({ error }) => {
      if (!error) {
        toast.success(`Recipe deleted successfully!`);
        handleClose();
      }
    });
  }, [handleClose, recipe?.id]);

  return (
    <Dialog
      open={shown}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Recipe</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete <b>{recipe?.title}</b> recipe?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={onDeletionConfirmed} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
});
DeleteRecipeModal.displayName = 'DeleteRecipeModal';
