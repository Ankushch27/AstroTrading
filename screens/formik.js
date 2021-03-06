import auth from '@react-native-firebase/auth';
import Axios from 'axios';
import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import {
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import { SolidButton } from '../components/button';
import { baseURL, colors } from '../constants';
import { globalStyles } from '../styles/globalStyles';
import { SignupSchema } from '../utils/SignupSchema';

const formik = ({ navigation }) => {
  const [confirm, setConfirm] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [processing, setProcessing] = useState(false);
  const phoneInput = useRef(null);
  const [visible, setVisible] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');
  const [userToken, setUserToken] = useState('');

  const api = Axios.create({
    baseURL: baseURL,
  });

  const handleSubmit = async (values) => {
    if (!isOTPSent) {
      sendEmailOTP(values.email);
    } else {
      confirmCode(values);
    }
  };

  const sendEmailOTP = async (email) => {
    setProcessing(true);
    console.log('start signup');
    try {
      let res = await api.post('/RequestOtp', {
        To: email,
        isRegister: true,
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
      createUser(values);
      setProcessing(false);
    } catch (error) {
      console.log(error.toString());
      setProcessing(false);
      setVisible(true);
      setSnackMsg(error.toString());
    }
  };

  const createUser = async (values) => {
    setSignupError(null);
    console.log('signup clicked');
    console.log(values);
    try {
      let res = await api.post('/RegisterUser', {
        Username: values.name,
        Password: values.password,
        Email: values.email,
        Mobile: values.mobile,
        Module: 1,
        NumberOfLicenses: 1,
        Lic_update: false,
        Update: false,
      });
      console.log(res.data);
      if (res.data.code == '400') {
        setVisible(true);
        setSnackMsg('User already registered! Login instead?');
        return;
      }
      navigation.push('Login');
    } catch (e) {
      setVisible(true);
      setSnackMsg('Failed to register user');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <ScrollView style={{ flex: 1, marginVertical: 24 }}>
          <Formik
            initialValues={{
              name: '',
              email: '',
              mobile: '',
              otp: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, actions) => {
              // actions.resetForm();
              // console.log(values);
              // createUser(values)
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
              <View>
                <Text style={globalStyles.label}>Name</Text>
                <View style={globalStyles.inputContainer}>
                  <TextInput
                    onChangeText={handleChange('name')}
                    value={values.name}
                    onBlur={handleBlur('name')}
                    style={[globalStyles.textWhite, globalStyles.input]}
                    placeholder="Name"
                    placeholderTextColor={colors.secondaryColor}
                  />
                </View>
                {touched.name && errors.name && (
                  <Text style={globalStyles.error}>{errors.name}</Text>
                )}
                <Text style={globalStyles.label}>Mobile No</Text>
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
                <Text style={globalStyles.label}>Password</Text>
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
                <Text style={globalStyles.label}>Confirm Password</Text>
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
                <Text style={globalStyles.label}>Email</Text>
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
                    text="send otp"
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
                      text="sign up"
                      onPress={handleSubmit}
                      isLoading={processing}
                    />
                  </>
                )}
                <Text style={globalStyles.textCenter}>
                  <Text style={globalStyles.textWhite}>
                    Already have an account?{' '}
                  </Text>
                  <Text
                    style={globalStyles.textPrimary}
                    onPress={() => navigation.navigate('Login')}>
                    Login
                  </Text>
                </Text>
              </View>
            )}
          </Formik>
          {signupError && <Text style={globalStyles.error}>{signupError}</Text>}
        </ScrollView>
        <View style={{ justifyContent: 'center' }}>
          <Snackbar
            style={{
              backgroundColor: colors.secondaryColor,
            }}
            visible={visible}
            duration={10000}
            onDismiss={() => setVisible(false)}>
            {snackMsg}
          </Snackbar>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default formik;
