import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import MapContainer1 from '../../Administration/Dashboard/Dashboard_realtime'; // Import the MapContainer component

const UserTracking = ()=> {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('accessToken')
    const list = localStorage.getItem("tractor-List")
  const arr = list.split(",")
  useEffect(() => {
    // Gọi hàm lắng nghe sự kiện từ socket
    const socket = io('http://tractorserver.myddns.me:8000',  {
      extraHeaders: {
       // tractorid: '64e2241bf3ea921e3f7855bb',
        token: token,
      }
    });
    socket.emit(`${localStorage.getItem("userId")}-get-logs`,arr)
    socket.on(`${localStorage.getItem("userId")}-logs`, (data) => {
      // Cập nhật dữ liệu từ socket vào Redux 
    //console.log(data)
    setData(data)
     //const payload = JSON.parse(data.logs);
    // console.log(payload)
      //updateSocketData(payload);
    });
    return () => {
      // Hủy lắng nghe khi component bị unmount
      //console.log('aaaaaaaa')
      socket.disconnect();
    };
  }, []);

  return (
   
      <MapContainer1  data= {data} /> 
   
  );
}

export default UserTracking;
