import * as yup from 'yup';

export const LoginSchema = yup.object({
  mobile: yup.string().required('* Mobile no. is a required field'),
  password: yup.string().required('* Password is a required field'),
});
