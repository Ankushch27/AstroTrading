import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import Profile from '../screens/Profile';

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    headerMode="none"
    initialRouteName="Profile"
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS,
    }}>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

export default ProfileStackScreen;
