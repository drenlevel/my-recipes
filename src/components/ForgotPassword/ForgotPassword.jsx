import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '#utils/firebase';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotPasswordSchema } from '#schemas/ForgotPassword.validator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
  const navigate = useNavigate();

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ForgotPasswordSchema) });

  // handlers
  const onSubmit = data => {
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        toast.success('Email to reset password sent!');
        navigate('/login');
      })
      .catch(err => {
        if (err.code === 'auth/user-not-found') toast.error('User not found');
      });
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      borderRadius={2}
      boxShadow={3}
      p={3}
      mx="30%"
      my="10%"
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography textAlign="center">Write your email</Typography>
        <TextField
          label="Email"
          size="small"
          variant="outlined"
          helperText={errors?.email?.message}
          error={!!errors.email}
          {...register('email')}
        />
        <Button type="submit" variant="contained">
          Send email
        </Button>
      </Box>
    </Box>
  );
};
