import { createStore, applyMiddleware, combineReducers} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
//import rootReducer from './reducer/rootReducer';
import thunk from 'redux-thunk';
import authStatusReducer from './reducer/Authreducer'; 

const initialState = {
  socketData: [],
 
};
const MAX_DATA_COUNT = 1; // Giới hạn số lượng dữ liệu
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authStatus'], // Lưu trữ bạn đã chọn
};

const rootReducer = combineReducers({
  
  authStatus: authStatusReducer, // Add authStatusReducer here
  socketData: (state = initialState.socketData, action) => {
    switch (action.type) {
      case 'UPDATE_SOCKET_DATA':
        const newSocketData = action.payload || [];
        if (Array.isArray(state) && state.length > 0) {
          newSocketData.unshift(...state.slice(0, MAX_DATA_COUNT - 1));
        } else {
          // Xử lý hoặc gán giá trị mặc định tùy thuộc vào trường hợp cụ thể của bạn.
        }
        return newSocketData;
      // ...
      default:
        return state;
    }
  },
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer ,
  applyMiddleware(thunk)
);
const persistor = persistStore(store);

export { store, persistor };
