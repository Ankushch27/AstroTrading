import React, { createContext, useReducer } from 'react';
import { authReducer } from '../reducers/authReducer';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const initialLoginState = {
    isLoading: true,
    userToken: null,
    userData: null,
  };

  const [loginState, loginDispatch] = useReducer(authReducer, initialLoginState);

  return (
    <AuthContext.Provider value={{ loginState, loginDispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
