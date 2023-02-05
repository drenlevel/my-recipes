import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';

export const DeleteRecipe = ({ open, setOpen, id }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const onAgree = async () => {
    await deleteDoc(doc(db, 'recipes', id));
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">DELETE RECIPE</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this recipe?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={onAgree} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
