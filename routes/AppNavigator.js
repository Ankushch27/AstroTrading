import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from '../screens/Loading';
import RootStackScreen from './RootStack';
import Axios from 'axios';
import { baseURL } from '../constants';

const AppNavigator = () => {
  const { loginState, loginDispatch } = useContext(AuthContext);

  // const fetchToken = async () => {
  //   let asyncToken = null;
  //   try {
  //     asyncToken = await AsyncStorage.getItem('userToken');
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   loginDispatch({ type: 'RETRIEVE_TOKEN', token: asyncToken });
  // };

  // useEffect(() => {
  //   fetchToken();
  // }, []);

  const api = Axios.create({
    baseURL: baseURL,
  });
  
  const autoLogin = async () => {
    let email = null;
    let password = null;
    try {
      email = await AsyncStorage.getItem('email');
      password = await AsyncStorage.getItem('password');
    } catch (e) {
      console.log(e);
    }
    // loginDispatch({ type: 'LOGIN_CREDENTIALS', loginCredentials: {email: email, password: password} });
    console.log(email, password)
    try {
      let res = await api.post('/Login', {
        Mobile: email,
        Password: password,
      });
      console.log(res.data);
      if (res.data.code == '400') {
        console.log(
          'Login failed! Either Email or password is incorrect',
        );
        loginDispatch({ type: 'STOP_LOADING' });
        return;
      }
      if (res.data.code == '200') {
        let userToken = res.data.data;
        let res2 = await api.get('/GetDetails', {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        let currentUser = res2.data.data[0];
        loginDispatch({ type: 'SAVE_USER', id: currentUser });
        loginDispatch({ type: 'LOGIN', token: userToken });
      }
    } catch (e) {
      loginDispatch({ type: 'STOP_LOADING' });
      console.log('Login failed');
    }
  };

  useEffect(() => {
    autoLogin();
  }, []);

  return (
    <NavigationContainer>
      {loginState.isLoading ? (
        <Loading />
      ) : (
        <RootStackScreen token={loginState.userToken} />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
