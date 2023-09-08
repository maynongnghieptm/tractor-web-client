// redux/reducer.js

const initialState = {
    chartDataFuel: [], // Example initial data
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_DATA_FROM_REDUX':
        return {
          ...state,
          chartDataFuel: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
