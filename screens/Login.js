import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { SolidButton } from '../components/button';
import { baseURL, colors } from '../constants';
import { AuthContext } from '../contexts/AuthContext';
import { globalStyles } from '../styles/globalStyles';
import { LoginSchema } from '../utils/LoginSchema';

const Login = ({ navigation }) => {
  const { loginDispatch } = useContext(AuthContext);
  const [loginError, setLoginError] = useState(null);
  const api = Axios.create({
    baseURL: baseURL,
  });

  const signIn = async (userToken, email, password) => {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
    } catch (e) {
      console.log(e);
    }
    loginDispatch({ type: 'LOGIN', token: userToken });
  };

  const loginUser = async (values) => {
    setLoginError(null);
    console.log('login clicked');
    console.log(values);
    try {
      let res = await api.post('/Login', {
        Mobile: values.email,
        Password: values.password,
      });
      console.log(res.data);
      if (res.data.code == '400') {
        setLoginError(
          'Login failed! Either Email or password is incorrect',
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
        signIn(token, values.email, values.password);
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
            email: '',
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
