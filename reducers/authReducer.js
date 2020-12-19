export const authReducer = (prevState, action) => {
  switch (action.type) {
    case 'STOP_LOADING':
      return {
        ...prevState,
        isLoading: false,
      };
    case 'LOGIN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...prevState,
        userData: null,
        userToken: null,
        isLoading: false,
      };
    case 'SAVE_USER':
      return {
        ...prevState,
        userData: action.id,
      };
    default:
      break;
  }
};
