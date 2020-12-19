import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import Entry from '../screens/Entry';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import formik from '../screens/formik';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator
    headerMode="none"
    screenOptions={{
      ...TransitionPresets.RevealFromBottomAndroid,
    }}>
    <AuthStack.Screen name="Entry" component={Entry} />
    <AuthStack.Screen name="Login" component={Login} />
    {/* <AuthStack.Screen name="Signup" component={Signup} /> */}
    <AuthStack.Screen name="Signup" component={formik} />
  </AuthStack.Navigator>
);

export default AuthStackScreen;
