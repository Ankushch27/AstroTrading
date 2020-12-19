import React, { createContext, useReducer } from 'react';
import { authReducer } from '../reducers/authReducer';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const initialLoginState = {
    isLoading: true,
    userToken: null,
    userData: null,
  };

  const [loginState, dispatch] = useReducer(authReducer, initialLoginState);

  return (
    <AuthContext.Provider value={{ loginState, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
