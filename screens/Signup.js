import auth from '@react-native-firebase/auth';
import axios from 'axios';
import React, { useState } from 'react';
import {
  Alert,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { SolidButton, TextButton } from '../components/button';
import { colors, baseURL } from '../constants';
import { globalStyles } from '../styles/globalStyles';
import { Formik } from 'formik';
import { SignupSchema } from '../utils/SignupSchema';

const Signup = ({ navigation }) => {
  const [confirm, setConfirm] = useState(null);
  const [isOTPSent, setIsOTPSent] = useState(false);

  const api = axios.create({
    baseURL: baseURL,
  });

  let signupInitialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    otp: '',
  };

  const handleSubmit = async (values) => {
    if(!isOTPSent) {
      signInWithPhoneNumber(values.mobile)
    } else {
      confirmCode(values)
    }
  }

  const signInWithPhoneNumber = async (phoneNumber) => {
    try {
      console.log('start signup');
      console.log('phone', phoneNumber);
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      console.log('confirmation', confirmation);
      console.log('await');
      setConfirm(confirmation);
      setIsOTPSent(true)
      Alert.alert('Otp sent');
    } catch (error) {
      console.log(error);
    }
  };

  const confirmCode = async (values) => {
    try {
      await confirm.confirm(values.otp);
      Alert.alert('Otp verified!');
      // createUser()
      // navigation.push('Login');
    } catch (error) {
      Alert.alert('Invalid code.');
    }
  };

  // const createUser = async () => {
  //   console.log('signup clicked');
  //   // otp check
  //   let res = await api.post('/RegisterUser', {
  //     Username: username,
  //     Password: password,
  //     Email: email,
  //     Mobile: mobile,
  //     Module: 1,
  //     NumberOfLicenses: 1,
  //     update: false,
  //   });
  //   console.log(res);
  // };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <ScrollView style={{ flex: 1, marginVertical: 24 }}>
          <Formik
            initialValues={signupInitialValues}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <Text style={globalStyles.label}>Name</Text>
                <View style={globalStyles.inputContainer}>
                  <TextInput
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    style={[globalStyles.textWhite, globalStyles.input]}
                    placeholder="Name"
                    placeholderTextColor={colors.secondaryColor}
                  />
                </View>
                {touched.name && errors.name && (
                  <Text style={globalStyles.error}>{errors.name}</Text>
                )}
                <Text style={globalStyles.label}>Email</Text>
                <View style={globalStyles.inputContainer}>
                  <TextInput
                    value={values.email}
                    onChangeText={handleChange('email')}
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
                <Text style={globalStyles.label}>Password</Text>
                <View style={globalStyles.inputContainer}>
                  <TextInput
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    style={[globalStyles.textWhite, globalStyles.input]}
                    textContentType="password"
                    placeholder="Password"
                    placeholderTextColor={colors.secondaryColor}
                    secureTextEntry={true}
                  />
                </View>
                {touched.password && errors.password && (
                  <Text style={globalStyles.error}>{errors.password}</Text>
                )}
                <Text style={globalStyles.label}>Confirm Password</Text>
                <View style={globalStyles.inputContainer}>
                  <TextInput
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    style={[globalStyles.textWhite, globalStyles.input]}
                    textContentType="password"
                    placeholder="Password (8-32 characters)"
                    placeholderTextColor={colors.secondaryColor}
                    secureTextEntry={true}
                  />
                </View>
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={globalStyles.error}>
                    {errors.confirmPassword}
                  </Text>
                )}
                <Text style={globalStyles.label}>Mobile No</Text>
                <View style={globalStyles.inputContainer}>
                  <TextInput
                    value={values.mobile}
                    onChangeText={handleChange('mobile')}
                    onBlur={handleBlur('mobile')}
                    style={[globalStyles.textWhite, globalStyles.input]}
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    placeholder="Mobile No"
                    placeholderTextColor={colors.secondaryColor}
                  />
                </View>
                {touched.mobile && errors.mobile && (
                  <Text style={globalStyles.error}>{errors.mobile}</Text>
                )}
                {!isOTPSent && (
                  <SolidButton text="send otp" onPress={handleSubmit} />
                )}
                {isOTPSent && (
                  <>
                    <Text style={globalStyles.label}>OTP</Text>
                    <View style={globalStyles.inputContainer}>
                      <TextInput
                        value={values.otp}
                        onChangeText={handleChange('otp')}
                        style={[globalStyles.textWhite, globalStyles.input]}
                        keyboardType="numeric"
                        placeholder="* * * * * *"
                        placeholderTextColor={colors.secondaryColor}
                      />
                    </View>
                    <SolidButton text="sign up" onPress={handleSubmit} />
                  </>
                )}
                <Text style={globalStyles.textCenter}>
                  <Text style={globalStyles.textWhite}>
                    Already have an account?{' '}
                  </Text>
                  <Text style={globalStyles.textPrimary}>Login</Text>
                </Text>
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Signup;
