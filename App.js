import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './routes/AppNavigator';
import AuthContextProvider from './contexts/AuthContext';
import CSVDataContextProvider from './contexts/CSVDataContext';
import FilterContextProvider from './contexts/FilterContext';
import { SafeAreaView } from 'react-native';
import { colors } from './constants';

const App = () => {
  console.log('react native');
  return (
    <>
      {/* <StatusBar barStyle="light-content" backgroundColor="black" /> */}
      <SafeAreaView style={{flex:1, backgroundColor: colors.darkColor}}>
      <AuthContextProvider>
        <CSVDataContextProvider>
          <FilterContextProvider>
            <AppNavigator />
          </FilterContextProvider>
        </CSVDataContextProvider>
      </AuthContextProvider>
      </SafeAreaView>
    </>
  );
};

export default App;
