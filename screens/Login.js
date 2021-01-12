import Axios from 'axios';
import { Formik } from 'formik';
import React, { useContext, useState, useRef } from 'react';
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SolidButton } from '../components/button';
import { baseURL, colors } from '../constants';
import { AuthContext } from '../contexts/AuthContext';
import { globalStyles } from '../styles/globalStyles';
import { LoginSchema } from '../utils/LoginSchema';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneInput from 'react-native-phone-number-input';

const Login = ({ navigation }) => {
  const { loginDispatch } = useContext(AuthContext);
  const [loginError, setLoginError] = useState(null);
  const [value, setValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);
  const api = Axios.create({
    baseURL: baseURL,
  });

  // const signIn = async (userToken) => {
  //   try {
  //     await AsyncStorage.setItem('userToken', userToken);
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   loginDispatch({ type: 'LOGIN', token: userToken });
  // };
  const signIn = async (userToken, mobile, password) => {
    try {
      await AsyncStorage.setItem('mobile', mobile);
      await AsyncStorage.setItem('password', password);
    } catch (e) {
      console.log(e);
    }
    loginDispatch({ type: 'LOGIN', token: userToken });
  };

  const saveUserData = async (userData) => {
    try {
      await AsyncStorage.setItem('userData', userData);
    } catch (e) {
      console.log(e);
    }
    loginDispatch({ type: 'SAVE_USER', id: userData });
  };

  const loginUser = async (values) => {
    setLoginError(null);
    console.log('login clicked');
    console.log(values);
    try {
      let res = await api.post('/Login', {
        Mobile: values.mobile,
        Password: values.password,
      });
      console.log(res.data);
      if (res.data.code == '400') {
        setLoginError(
          'Login failed! Either Mobile No or password is incorrect',
        );
        return;
      }
      if (res.data.code == '200') {
        let token = res.data.data;
        let res2 = await api.get('/GetDetails', {
          headers: { Authorization: `Bearer ${token}` },
        });
        let currentUser = res2.data.data[0];
        loginDispatch({ type: 'SAVE_USER', id: currentUser });
        signIn(token, values.mobile, values.password);
      }
    } catch (e) {
      setLoginError('Login failed');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <Formik
          initialValues={{
            mobile: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(values, actions) => {
            // actions.resetForm();
            loginUser(values);
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
              <Text style={globalStyles.label}>Mobile No</Text>
              {/* <View style={globalStyles.inputContainer}>
                <TextInput
                  style={[globalStyles.textWhite, globalStyles.input]}
                  onBlur={handleBlur('mobile')}
                  onChangeText={handleChange('mobile')}
                  value={values.mobile}
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                  placeholder="Mobile No"
                  placeholderTextColor={colors.secondaryColor}
                />
              </View> */}
              <PhoneInput
                ref={phoneInput}
                defaultValue={values.mobile}
                defaultCode="IN"
                onChangeFormattedText={(text) => {
                  values.mobile = text;
                }}
                // onChangeText={handleChange('mobile')}
                //value={values.mobile}
                withDarkTheme
                withShadow
                autoFocus
              />
              {touched.mobile && errors.mobile && (
                <Text style={globalStyles.error}>{errors.mobile}</Text>
              )}
              <Text style={globalStyles.label}>Password</Text>
              <View style={globalStyles.inputContainer}>
                <TextInput
                  style={[globalStyles.textWhite, globalStyles.input]}
                  secureTextEntry={true}
                  selectionColor="white"
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  placeholder=" Password"
                  placeholderTextColor={colors.secondaryColor}
                />
              </View>
              {touched.password && errors.password && (
                <Text style={globalStyles.error}>{errors.password}</Text>
              )}
              <Text
                style={globalStyles.forgotPassword}
                onPress={() => navigation.navigate('ForgotPassword')}>
                Forgot Password?
              </Text>
              <SolidButton text="login" onPress={handleSubmit} />
              <Text style={globalStyles.textCenter}>
                <Text style={globalStyles.textWhite}>
                  Don't have an account?{' '}
                </Text>
                <Text
                  style={globalStyles.textPrimary}
                  onPress={() => navigation.navigate('Signup')}>
                  Sign Up
                </Text>
              </Text>
            </View>
          )}
        </Formik>
        {loginError && <Text style={globalStyles.error}>{loginError}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
