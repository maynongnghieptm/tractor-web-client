// src/store/actions/authActions.js

export const setIsAdmin = (isAdmin) => {
    return {
      type: 'SET_IS_ADMIN',
      payload: isAdmin,
    };
  };
  