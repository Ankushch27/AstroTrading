import React, { createContext, useReducer } from 'react';
import { CSVDataReducer } from '../reducers/CSVDataReducer';

export const CSVDataContext = createContext()

const CSVDataContextProvider = (props) => {
  const initialData = ''

  const [dataState, dispatch] = useReducer(CSVDataReducer, initialData)
  return (
    <CSVDataContext.Provider value={{dataState, dispatch}}>
      {props.children}
    </CSVDataContext.Provider>
  )
}

export default CSVDataContextProvider
