// authActions.js
export const setIsAdmin = (isAdmin) => {
  return {
    type: 'SET_ADMIN',
    isAdmin,
  };
};

export const setIsLoggedIn = (isLoggedIn) => {
  return {
    type: 'SET_LOGGED_IN',
    isLoggedIn,
  };
};
