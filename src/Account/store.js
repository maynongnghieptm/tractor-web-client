// src/Account/store.js

import { configureStore } from '@reduxjs/toolkit';
import socketDataReducer from './socketDataSlice';
import io from 'socket.io-client';
import { addSocketData } from './socketDataSlice';
const store = configureStore({
  reducer: {
    socketData: socketDataReducer,
  },
});

// Handle socketData here



const socketUrl = 'http://tractorserver.myddns.me:8000'; // Update with your URL

const handleSocketData = (token, dispatch) => {
    
  const socket = io(socketUrl, {
    extraHeaders: {
      token: localStorage.getItem('accessToken'),
    },
  });

  socket.on('clientLogs', (data) => {
    const parsedData = JSON.parse(data);
    dispatch(addSocketData(parsedData));
  });

  return () => {
    socket.disconnect(); // Disconnect the socket when the component unmounts
  };
};

export const setupSocketDataListener = (token, dispatch) => {
  return handleSocketData(token, dispatch);
};

export default store;
