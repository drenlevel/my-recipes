import * as yup from 'yup';

export const ForgotPasswordSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
});
