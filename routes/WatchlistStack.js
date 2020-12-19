import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import Watchlist from '../screens/Watchlist';
import SymbolDetails from '../screens/SymbolDetails';

const WatchlistStack = createStackNavigator();
const WatchlistStackScreen = () => (
  <WatchlistStack.Navigator
    headerMode="none"
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS,
    }}>
    <WatchlistStack.Screen name="Watchlist" component={Watchlist} />
    <WatchlistStack.Screen name="SymbolDetails" component={SymbolDetails} />
  </WatchlistStack.Navigator>
);

export default WatchlistStackScreen;
