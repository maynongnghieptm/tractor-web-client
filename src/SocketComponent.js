import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { updateSocketData } from './store/actions/Socketaction'; // Định nghĩa action
import io from 'socket.io-client';
const SocketComponent = ({ socketData, updateSocketData }) => {
  useEffect(() => {
    // Gọi hàm lắng nghe sự kiện từ socket
    const socket = io('http://tractorserver.myddns.me:8000',  {
      extraHeaders: {
       // tractorid: '64e2241bf3ea921e3f7855bb',
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGRhZmRkMDAxM2U4OWU1YmYzNjk1OWIiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2OTU2MDg5MDEsImV4cCI6MTY5NTc4MTcwMX0.bPF8z_gewp2NxRK45Tbql1Jcpjsn-LOgwn6Jr8YM-GY"
      }
    });
  
    socket.on('clientLogs', (data) => {
      // Cập nhật dữ liệu từ socket vào Redux 
    //console.log(1111111111111111111111111111)
      const payload = JSON.parse(data.logs);
     // console.log(parsedData)
    
     
      updateSocketData(payload);
    });

    return () => {
      // Hủy lắng nghe khi component bị unmount
      //console.log('aaaaaaaa')
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
