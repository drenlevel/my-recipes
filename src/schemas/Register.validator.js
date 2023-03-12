import * as yup from 'yup';

export const RegisterFormSchema = yup.object({
  fullName: yup.string().required('Full name is required!'),
  email: yup.string().email('Invalid email').required('Email is required!'),
  password: yup.string().required('Password is required!'),
});
