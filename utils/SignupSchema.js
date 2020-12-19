import * as yup from 'yup';

export const SignupSchema = yup.object({
  name: yup
    .string()
    .required('* Name is a required field')
    .min(3, '* Name must be at least 3 characters'),
  email: yup
    .string()
    .required('* Email is a required field')
    .email('* Invalid email'),
  mobile: yup.string().required('* Mobile no. is a required field'),
  otp: yup.string(),
  password: yup
    .string()
    .required('* Password is a required field')
    .min(8, '* Password must be at least 8 characters')
    .max(32, '* Password must be at most 32 characters'),
  confirmPassword: yup
    .string()
    .required('* Confirm password is a required field')
    .oneOf([yup.ref('password'), null], '* Password and Confirm password must match'),
});
