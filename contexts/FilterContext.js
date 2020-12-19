import React, { createContext, useReducer } from 'react';
import { FilterReducer } from '../reducers/FilterReducer';

export const FilterContext = createContext()

const FilterContextProvider = (props) => {
  const initialFilter = {
    // category: {name:'All', key: ''},
    // segment: {name: null, key: ''}
    filter: {name: 'All', key: '-1',parent:''},
    strategy: {name: '5 Min', key: 'WLF'},
    openStrategyModal: false,
    openFilterModal: false,
  }

  const [filterState, filterDispatch] = useReducer(FilterReducer, initialFilter)
  return (
    <FilterContext.Provider value={{filterState, filterDispatch}}>
      {props.children}
    </FilterContext.Provider>
  )
}

export default FilterContextProvider
