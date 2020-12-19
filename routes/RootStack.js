import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';
import BottomTabScreen from './BottomTab';
import AuthStackScreen from './AuthStack';

const RootStack = createStackNavigator();
const RootStackScreen = ({ token }) => {
  return(
  <RootStack.Navigator
    headerMode="none"
    initialRouteName="Auth"
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS,
    }}>
    {token ? (
      <RootStack.Screen name="Home" component={BottomTabScreen} />
    ) : (
      <RootStack.Screen name="Auth" component={AuthStackScreen} />
    )}
  </RootStack.Navigator>
)};

export default RootStackScreen;
