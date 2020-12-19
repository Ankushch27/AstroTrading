export const FilterReducer = (state, action) => {
  switch (action.type) {
    // case 'FILTER_CATEGORY':
    //   return {
    //     ...state,
    //     category: action.category
    //   }
    // case 'FILTER_SEGMENT':
    //   return {
    //     ...state,
    //     segment: action.segment
    //   }
    case 'FILTER':
      return {
        ...state,
        filter: action.filter
      }
    case 'STRATEGY':
      return {
        ...state,
        strategy: action.strategy
      }
    case 'OPEN_STRATEGY_MODAL':
      return {
        ...state,
        openStrategyModal: action.openStrategyModal
      }
    case 'OPEN_FILTER_MODAL':
      return {
        ...state,
        openFilterModal: action.openFilterModal
      }
    default:
      return state;
  }
}