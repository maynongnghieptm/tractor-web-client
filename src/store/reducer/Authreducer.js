const authStatusReducer = (state = { isAdmin: false, isLoggedIn: false }, action) => {
  switch (action.type) {
    case 'SET_ADMIN':
      return { ...state, isAdmin: action.isAdmin };
    case 'SET_LOGGED_IN':
      return { ...state, isLoggedIn: action.isLoggedIn };
    default:
      return state;
  }
};
export default authStatusReducer