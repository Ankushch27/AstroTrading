import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './routes/AppNavigator';
import AuthContextProvider from './contexts/AuthContext';
import CSVDataContextProvider from './contexts/CSVDataContext';
import FilterContextProvider from './contexts/FilterContext';

const App = () => {
  console.log('react native');
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <AuthContextProvider>
        <CSVDataContextProvider>
          <FilterContextProvider>
            <AppNavigator />
          </FilterContextProvider>
        </CSVDataContextProvider>
      </AuthContextProvider>
    </>
  );
};

export default App;
