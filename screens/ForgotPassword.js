import auth from '@react-native-firebase/auth';
import Axios from 'axios';
import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import * as yup from 'yup';
import { SolidButton } from '../components/button';
import { baseURL, colors } from '../constants';
import { globalStyles } from '../styles/globalStyles';

const otpSchema = yup.object({
  mobile: yup.string().required('* Mobile no. is a required field'),
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

const formik = ({ navigation }) => {
  const [confirm, setConfirm] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [processing, setProcessing] = useState(false);
  const phoneInput = useRef(null);
  const [visible, setVisible] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');
  const [showPassChange, setShowPassChange] = useState(false);

  const api = Axios.create({
    baseURL: baseURL,
  });

  const handleSubmit = async (values) => {
    if (!isOTPSent) {
      verifyPhoneNumber(values.mobile);
    } else {
      confirmCode(values);
    }
    if (isOTPSent && showPassChange) {
      resetPassword(values);
    }
  };

  const verifyPhoneNumber = async (phoneNumber) => {
    try {
      setProcessing(true);
      console.log('start verify');
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      console.log('await');
      setConfirm(confirmation);
      setIsOTPSent(true);
      setProcessing(false);
      setVisible(true);
      // setSnackMsg('Otp sent');
    } catch (error) {
      setProcessing(false);
      console.log(error);
    }
  };

  const confirmCode = async (values) => {
    try {
      setProcessing(true);
      await confirm.confirm(values.otp);
      setShowPassChange(true);
      // setSnackMsg('Otp verified!');
      // createUser(values);
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
        Mobile: values.mobile,
      });
      console.log(res.data);
      if (res.data.code == '400') {
        setSignupError('User does not exist! Register?');
        return;
      }
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
              mobile: '',
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
                      Confirm your Mobile No. to reset password
                    </Text>
                    <PhoneInput
                      ref={phoneInput}
                      defaultValue={values.mobile}
                      defaultCode="IN"
                      onChangeFormattedText={(text) => {
                        values.mobile = text;
                      }}
                      withDarkTheme
                      withShadow
                    />
                    {touched.mobile && errors.mobile && (
                      <Text style={globalStyles.error}>{errors.mobile}</Text>
                    )}
                    {!isOTPSent && (
                      <SolidButton
                        text="Verify Mobile No."
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
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default formik;
