import { createStore } from 'redux';
// Khởi tạo state ban đầu
const initialState = {
  socketData: [], // Dữ liệu từ socket
};

const MAX_DATA_COUNT = 1; // Giới hạn số lượng dữ liệu

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
// Khởi tạo Redux store với rootReducer
const store = createStore(rootReducer);

export default store;
