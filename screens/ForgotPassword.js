import Axios from 'axios';
import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import {
  Keyboard,
  Text,
  TextInput,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import * as yup from 'yup';
import { SolidButton } from '../components/button';
import { baseURL, colors } from '../constants';
import { globalStyles } from '../styles/globalStyles';

const otpSchema = yup.object({
  email: yup
    .string()
    .required('* Email is a required field')
    .email('* Invalid email'),
  otp: yup.string(),
});

const forgotPasswordSchema = yup.object({
  password: yup
    .string()
    .required('* Password is a required field')
    .min(8, '* Password must be at least 8 characters')
    .max(32, '* Password must be at most 32 characters'),
  confirmPassword: yup
    .string()
    .required('* Confirm password is a required field')
    .oneOf(
      [yup.ref('password'), null],
      '* Password and Confirm password must match',
    ),
});

const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    return null;
  }
  return null;
};

const formik = ({ navigation }) => {
  const [confirm, setConfirm] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [processing, setProcessing] = useState(false);
  const phoneInput = useRef(null);
  const [visible, setVisible] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');
  const [showPassChange, setShowPassChange] = useState(false);
  const [visibleToast, setvisibleToast] = useState(false);
  const [userToken, setUserToken] = useState('');

  const api = Axios.create({
    baseURL: baseURL,
  });

  const handleSubmit = async (values) => {
    if (!isOTPSent) {
      verifyEmail(values.email);
    } else {
      confirmCode(values);
    }
    if (isOTPSent && showPassChange) {
      resetPassword(values);
    }
  };

  const verifyEmail = async (email) => {
    setProcessing(true);
    console.log('start verify');
    try {
      let res = await api.post('/RequestOtp', {
        To: email,
        isRegister: false,
      });
      console.log(res.data);
      if (!res.data.code == '200') {
        setVisible(true);
        setSnackMsg(res.data.data);
        return;
      }
      setUserToken(res.data.data);
      setIsOTPSent(true);
      setProcessing(false);
      setVisible(true);
      setSnackMsg('Otp sent to Email');
    } catch (error) {
      setProcessing(false);
      setVisible(true);
      setSnackMsg('Failed to send OTP');
    }
  };

  const confirmCode = async (values) => {
    setProcessing(true);
    console.log(userToken);
    try {
      let res = await api.post(
        '/VerifyOTP',
        {
          OTP: values.otp,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        },
      );
      console.log(res.data);
      if (!res.data.code == '200') {
        setVisible(true);
        setSnackMsg(res.data.data);
        return;
      }
      setShowPassChange(true);
      setProcessing(false);
    } catch (error) {
      console.log(error.toString());
      setProcessing(false);
      setVisible(true);
      setSnackMsg(error.toString());
    }
  };

  const resetPassword = async (values) => {
    setSignupError(null);
    console.log('reset clicked');
    console.log(values);
    try {
      let res = await api.post('/updatepassword', {
        Password: values.password,
        Mobile: values.email,
      });
      console.log(res.data);
      if (!res.data.code == '200') {
        setSignupError('User does not exist! Register?');
        return;
      }
      setvisibleToast(true);
      setShowPassChange(false);
      navigation.push('Login');
    } catch (e) {
      setSignupError('Failed to update password');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <View style={globalStyles.container}>
          <Formik
            initialValues={{
              email: '',
              otp: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={showPassChange ? forgotPasswordSchema : otpSchema}
            onSubmit={(values) => {
              if (!processing) {
                handleSubmit(values);
              }
            }}>
            {({
              values,
              errors,
              handleBlur,
              handleChange,
              touched,
              handleSubmit,
            }) => (
              <>
                {!showPassChange && (
                  <>
                    <Text style={globalStyles.label}>
                      Confirm your Email address to reset password
                    </Text>
                    <View style={globalStyles.inputContainer}>
                      <TextInput
                        autoCapitalize="none"
                        onChangeText={handleChange('email')}
                        value={values.email}
                        onBlur={handleBlur('email')}
                        style={[globalStyles.textWhite, globalStyles.input]}
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        placeholder="Email"
                        placeholderTextColor={colors.secondaryColor}
                      />
                    </View>
                    {touched.email && errors.email && (
                      <Text style={globalStyles.error}>{errors.email}</Text>
                    )}
                    {!isOTPSent && (
                      <SolidButton
                        text="Verify Email"
                        onPress={handleSubmit}
                        isLoading={processing}
                      />
                    )}
                    {isOTPSent && (
                      <>
                        <Text style={globalStyles.label}>OTP</Text>
                        <View style={globalStyles.inputContainer}>
                          <TextInput
                            style={[globalStyles.textWhite, globalStyles.input]}
                            keyboardType="numeric"
                            placeholder="* * * * * *"
                            placeholderTextColor={colors.secondaryColor}
                            onChangeText={handleChange('otp')}
                            value={values.otp}
                          />
                        </View>
                        <SolidButton
                          text="Proceed"
                          onPress={handleSubmit}
                          isLoading={processing}
                        />
                      </>
                    )}
                  </>
                )}
                {showPassChange && (
                  <>
                    <Text style={globalStyles.label}>New Password</Text>
                    <View style={globalStyles.inputContainer}>
                      <TextInput
                        onChangeText={handleChange('password')}
                        value={values.password}
                        secureTextEntry={true}
                        onBlur={handleBlur('password')}
                        style={[globalStyles.textWhite, globalStyles.input]}
                        textContentType="password"
                        placeholder="Password (8-32 characters)"
                        placeholderTextColor={colors.secondaryColor}
                      />
                    </View>
                    {touched.password && errors.password && (
                      <Text style={globalStyles.error}>{errors.password}</Text>
                    )}
                    <Text style={globalStyles.label}>
                      Re-enter new Password
                    </Text>
                    <View style={globalStyles.inputContainer}>
                      <TextInput
                        onChangeText={handleChange('confirmPassword')}
                        value={values.confirmPassword}
                        secureTextEntry={true}
                        onBlur={handleBlur('confirmPassword')}
                        style={[globalStyles.textWhite, globalStyles.input]}
                        textContentType="password"
                        placeholder="Confirm Password"
                        placeholderTextColor={colors.secondaryColor}
                      />
                    </View>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Text style={globalStyles.error}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                    <SolidButton
                      text="Reset Password"
                      onPress={handleSubmit}
                      isLoading={processing}
                    />
                  </>
                )}
              </>
            )}
          </Formik>
          {signupError && <Text style={globalStyles.error}>{signupError}</Text>}
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Snackbar
            style={{
              backgroundColor: colors.secondaryColor,
              margin: 20,
            }}
            visible={visible}
            duration={3000}
            onDismiss={() => setVisible(false)}>
            {snackMsg}
          </Snackbar>
          <Toast
            visible={visibleToast}
            message="Password updated successfully!. Login with new password to continue"
          />
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default formik;
