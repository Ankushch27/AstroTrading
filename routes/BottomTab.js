import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../constants';
import HomeStackScreen from './HomeStack';
import ProfileStackScreen from './ProfileStack';

const Tab = createMaterialBottomTabNavigator();

const BottomTabScreen = () => {
  return (
    <Tab.Navigator
      // labeled={false}
      activeColor = {colors.primaryColor}
      inactiveColor = {colors.primaryLightColor}
      barStyle={{ backgroundColor: colors.darkColor, padding: 4 }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon
              name="account-circle-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabScreen;
