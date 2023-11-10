import { createStore, applyMiddleware, combineReducers} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import authStatusReducer from './reducer/Authreducer'; 

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authStatus'],
};

const rootReducer = combineReducers({
  authStatus: authStatusReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer ,
  applyMiddleware(thunk)
);
const persistor = persistStore(store);

export { store, persistor };
