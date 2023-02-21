import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { auth } from '#utils/firebase';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { LoginFormSchema } from '#schemas/Login.validator';

import styles from './styles.module.css';

export const Login = () => {
  //local state
  const [showPassword, setShowPassword] = useState(false);

  //hooks
  const navigate = useNavigate();

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginFormSchema) });

  // handlers
  const onSubmit = data => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => navigate('/home'))
      .catch(err => {
        if (
          err.code === 'auth/user-not-found' ||
          err.code === 'auth/wrong-password'
        )
          toast.error('Wrong credentials');
      });
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
        <Typography textAlign="center">Login to your account</Typography>
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
          size="small"
          variant="outlined"
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
          Login
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        mt={2}
      >
        <Typography
          textAlign="center"
          fontSize={12}
          className={styles.noAccountCreateOne}
        >
          {`Don't have an account?`}
          <Link to="/signup">Create</Link>
        </Typography>
        <Typography
          textAlign="center"
          fontSize={12}
          className={styles.noAccountCreateOne}
        >
          Forgot Password?
          <Link to="/forgot-password" style={{ fontSize: 12 }}>
            Reset
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
