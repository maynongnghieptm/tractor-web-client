import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateSocketData } from './action'; // Định nghĩa action
import io from 'socket.io-client';
const SocketComponent = ({ socketData, updateSocketData }) => {
  useEffect(() => {
    // Gọi hàm lắng nghe sự kiện từ socket
  const socket = io('http://tractorserver.myddns.me:8000', {
        extraHeaders: {
          //tractorid: '64d9cdfac48bca2dd296ad1d',
          token: localStorage.getItem('accessToken'),
        },
      });
    socket.on('clientLogs', (data) => {
      // Cập nhật dữ liệu từ socket vào Redux 
    //  console.log(typeof(data))
      const parsedData = JSON.parse(data);
     const payload = JSON.parse(parsedData.logs)
     
      updateSocketData(payload);
    });

    return () => {
      // Hủy lắng nghe khi component bị unmount
      socket.off('clientLogs');
    };
  }, [updateSocketData]);

  return (
    <div>

    </div>
  );
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
});

const mapDispatchToProps = {
  updateSocketData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SocketComponent);
