// redux/reducer.js

const initialState = {
    socketData: [],
     // Example initial data
  };
  
  const Socketreducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_DATA_FROM_REDUX':
        return {
          ...state,
          socketData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default Socketreducer;
