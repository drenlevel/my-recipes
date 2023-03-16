// Libs
import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { LoginFormSchema } from '#schemas/Login.validator';
import { auth } from '#utils/firebase';

import styles from './styles.module.css';

const AUTH_ERROR_CODES = {
  CANCELLED_POPUP_REQ: 'auth/cancelled-popup-request',
  BLOCKED_POPUP_REQ: 'auth/popup-blocked',
  USER_NOT_FOUND: 'auth/user-not-found',
  WRONG_PASSWORD: 'auth/wrong-password',
};

const GOOGLE_PROVIDER = new GoogleAuthProvider();

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
  const onSubmit = (data, withGoogle = false) => {
    const onError = err => {
      if (
        err.code === AUTH_ERROR_CODES.USER_NOT_FOUND ||
        err.code === AUTH_ERROR_CODES.WRONG_PASSWORD
      ) {
        toast.error('Wrong credentials!');
      } else if (
        err.code === AUTH_ERROR_CODES.CANCELLED_POPUP_REQ ||
        err.code === AUTH_ERROR_CODES.BLOCKED_POPUP_REQ
      ) {
        toast.error('Provider popup closed or login procedure cancelled!');
      }

      console.error(err);
    };

    if (data && !withGoogle) {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then(() => navigate('/home'))
        .catch(onError);
    } else if (withGoogle) {
      signInWithPopup(auth, GOOGLE_PROVIDER)
        .then(() => navigate('/home'))
        .catch(onError);
    }
  };

  const handleClickShowPassword = () => setShowPassword(show => !show);

  return (
    <>
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
        <Divider textAlign="left" sx={{ margin: '15px 0' }}>
          Providers
        </Divider>
        <button
          className={styles.googleSignInButton}
          onClick={onSubmit.bind(null, undefined, true)}
        >
          <FcGoogle />
          Sign in with Google
        </button>
      </Box>
    </>
  );
};
