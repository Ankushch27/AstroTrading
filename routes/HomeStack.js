import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import ToolsTabScreen from './ToolsTab';
import SymbolDetails from '../screens/SymbolDetails';

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator
    headerMode="none"
    initialRouteName="Tools"
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS,
    }}>
    <HomeStack.Screen name="Tools" component={ToolsTabScreen} />
    <HomeStack.Screen name="SymbolDetails" component={SymbolDetails} />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
