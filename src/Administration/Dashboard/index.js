import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import MapContainer1 from './Dashboard_realtime'; 

const ParentComponent = ()=> {
  const [socketData, setSocketData] = useState([]);
  const token = localStorage.getItem('accessToken')
  useEffect(() => {
    const socket = io('http://tractorserver.myddns.me:8000',  {
      extraHeaders: {
       // tractorid: '64e2241bf3ea921e3f7855bb',
        token: token,
      }
    });

    socket.on('logs', (newData) => {
      
    // console.log(newData)
     
      setSocketData(newData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
   
      <MapContainer1  data= {socketData} /> 
   
  );
}

export default ParentComponent;
