import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { auth, db } from '#utils/firebase';
import { RegisterFormSchema } from '#schemas/Register.validator';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

export const SignUp = () => {
  //local state
  const [showPassword, setShowPassword] = useState(false);

  //hooks
  const navigate = useNavigate();

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RegisterFormSchema) });

  // handlers
  const onSubmit = async data => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await setDoc(doc(db, 'users', res.user.uid), {
        ...data,
        name: data.name,
      });
      toast.success('Successfully created your account!');
      navigate('/login');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use')
        toast.error('This user is already taken');
    }
  };

  const handleClickShowPassword = () => setShowPassword(show => !show);

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
        <Typography textAlign="center">Create an account</Typography>
        <TextField
          id="outlined-basic"
          label="Name"
          size="small"
          variant="outlined"
          helperText={errors?.name?.message}
          error={!!errors.name}
          {...register('name')}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          size="small"
          variant="outlined"
          helperText={errors?.email?.message}
          error={!!errors.email}
          {...register('email')}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText={errors?.password?.message}
          error={!!errors.password}
          {...register('password')}
        />
        <Button type="submit" variant="contained">
          Register
        </Button>
      </Box>
      <Typography mt={2} textAlign="center" fontSize={12}>
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </Box>
  );
};
