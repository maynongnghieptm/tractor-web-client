// redux/authReducer.js

const initialState = {
    isAdmin: false,
  }
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_IS_ADMIN':
        return {
          ...state,
          isAdmin: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  