import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import Profile from '../screens/Profile';
import Coupon from '../screens/Coupon';

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    headerMode="none"
    initialRouteName="Profile"
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS,
    }}>
    <ProfileStack.Screen name="Profile" component={Profile} />
    <ProfileStack.Screen name="Coupon" component={Coupon} />
  </ProfileStack.Navigator>
);

export default ProfileStackScreen;
