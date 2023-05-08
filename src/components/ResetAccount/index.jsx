import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '#utils/firebase';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResetAccountSchema } from '#schemas/ResetAccount.validator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ResetAccount() {
  const navigate = useNavigate();

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ResetAccountSchema) });

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
      className="standard-form"
      onSubmit={handleSubmit(onSubmit)}
      borderRadius={2}
      boxShadow={3}
      p={3}
      my="10%"
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography textAlign="left">
          Provide the email associated to your account
        </Typography>
        <TextField
          label="Email"
          placeholder="Account to reset password"
          size="small"
          variant="outlined"
          helperText={errors?.email?.message}
          error={!!errors.email}
          {...register('email')}
        />
        <Button type="submit" variant="contained" color="success">
          Reset
        </Button>
      </Box>
    </Box>
  );
}
