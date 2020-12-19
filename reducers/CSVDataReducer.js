export const CSVDataReducer = (state, action) => {
  switch (action.type) {
    case 'SAVE_CSV_DATA':
      return {
        ...state,
        data: action.data
      }
    case 'CLEANUP_CSV_DATA':
      return {
        ...state,
        data: action.data
      }
    default:
      return state;
  }
}