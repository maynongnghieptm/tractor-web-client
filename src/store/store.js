import { createStore, applyMiddleware, combineReducers} from 'redux';

//import rootReducer from './reducer/rootReducer';
import thunk from 'redux-thunk';
import authReducer from './reducer/Authreducer'; 
const initialState = {
  socketData: [],
  auth: {
    isAdmin: false,
  },
};
const MAX_DATA_COUNT = 1; // Giới hạn số lượng dữ liệu

const rootReducer = combineReducers({
  auth: authReducer, // Add authReducer here
  socketData: (state = initialState.socketData, action) => {
    switch (action.type) {
      case 'UPDATE_SOCKET_DATA':
        const newSocketData = action.payload || [];
        if (Array.isArray(state) && state.length > 0) {
          newSocketData.unshift(...state.slice(0, MAX_DATA_COUNT - 1));
        } else {
          // Xử lý hoặc gán giá trị mặc định tùy thuộc vào trường hợp cụ thể của bạn.
        }
        return  newSocketData
      // ...
   
        
        default:
          return state;
    }
  },
});
/*
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SOCKET_DATA':
      const newSocketData = action.payload || [];
      if (Array.isArray(state.socketData) && state.socketData.length > 0) {
        newSocketData.unshift(...state.socketData.slice(0, MAX_DATA_COUNT - 1));
      } else {
        // Xử lý hoặc gán giá trị mặc định tùy thuộc vào trường hợp cụ thể của bạn.
      }

      return {
        ...state,
        socketData: newSocketData,
      };
    // ...
    default:
      return state;
  }
};
*/
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
