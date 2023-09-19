// redux/rootReducer.js

import { combineReducers } from 'redux';
import Socketreducer from './Socketreducer'; // Import reducer của bạn
import authReducer from './Authreducer'; // Import reducer cho isAdmin

const rootReducer = combineReducers({
  chartDataFuel: Socketreducer,
  auth: authReducer, // Thêm reducer cho isAdmin vào rootReducer
});

export default rootReducer;
