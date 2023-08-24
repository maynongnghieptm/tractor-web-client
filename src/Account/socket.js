import io from 'socket.io-client';

const socketUrl = 'http://tractorserver.myddns.me:8000'; // Update with your URL

export const connectSocket = (token, onDataReceived) => {
  const socket = io(socketUrl, {
    extraHeaders: {
      token: token || '',
    },
  });

  socket.on('clientLogs', (data) => {
    const parsedData = JSON.parse(data);
    onDataReceived(parsedData);
  });

  return socket;
};

export const disconnectSocket = (socket) => {
  if (socket) {
    socket.disconnect();
  }
};
