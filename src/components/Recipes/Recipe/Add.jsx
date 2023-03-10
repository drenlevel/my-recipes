import {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { AuthContext } from '#components/AuthProvider/AuthProvider';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '#utils/firebase';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddSchema } from '#schemas/AddRecipe.validator';
import ImageUpload from '#components/ImageUpload/ImageUpload';
import { camelCase } from 'change-case';
import * as translate from '#utils/translate';

const ADDITIONAL_FIELDS = [
  'CUISINES',
  'TYPE',
  'COOKING_TIME',
  'INGREDIENTS',
  'INSTRUCTIONS',
  'SERVINGS',
].map(key => [camelCase(key), translate.recipe(key)]);

const CommonRecipeField = forwardRef((props, ref) => (
  <TextField
    ref={ref}
    fullWidth
    id="name"
    margin="dense"
    size="small"
    variant="standard"
    {...props}
  />
));
CommonRecipeField.displayName = 'CommonRecipeField';

export const AddRecipeModal = forwardRef((_, ref) => {
  const { currentUser } = useContext(AuthContext);
  const [shown, setShown] = useState(false);
  const formRef = useRef({});

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AddSchema) });

  const onSubmit = async data => {
    await addDoc(collection(db, 'recipes'), {
      title: data.title,
      description: data.description,
      user: currentUser.uid,
      timeStamp: serverTimestamp(),
    });
    setShown(false);
  };

  useImperativeHandle(
    ref,
    () => ({ toggleShown: isOpen => setShown(state => isOpen ?? !state) }),
    [],
  );

  return (
    <Dialog open={shown} onClose={setShown.bind(null, false)}>
      <Box ref={formRef} component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add new recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write title and description of your recipe
          </DialogContentText>
          <CommonRecipeField
            helperText={errors?.title?.message}
            error={!!errors?.title}
            {...register('title')}
          />
          <CommonRecipeField
            multiline
            rows={5}
            label="Description"
            helperText={errors?.description?.message}
            error={!!errors?.description}
            {...register('description')}
          />
          <ImageUpload
            helperText={errors?.description?.image}
            error={!!errors?.image}
            inputProps={{ readOnly: true, tabIndex: -1 }}
            {...register('image')}
          />
          <CommonRecipeField
            multiline
            rows={5}
            label="Description"
            helperText={errors?.description?.message}
            error={!!errors?.description}
            {...register('description')}
          />
          {ADDITIONAL_FIELDS.map(([key, label]) => (
            <CommonRecipeField
              key={key}
              label={label}
              helperText={errors?.[key]?.message}
              error={!!errors?.[key]}
              {...register(key)}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={setShown.bind(null, false)}>Cancel</Button>
          <Button type="submit">Add recipe</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
});
AddRecipeModal.displayName = 'AddRecipeModal';
