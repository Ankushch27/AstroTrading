import * as yup from 'yup';

export const LoginSchema = yup.object({
  email: yup
    .string()
    .required('* Email is a required field')
    .email('* Invalid email'),
  password: yup.string().required('* Password is a required field'),
});
