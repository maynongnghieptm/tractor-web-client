import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import { useParams } from "react-router-dom";
import Layoutgrid from "../../Account/LiveData/Layout";
const Chart = (props) => {
  //const { tractorId } = props.match.params;
  const [data, setData] = useState(null);
  const {tractorId}=useParams()
  console.log(tractorId)
  let previousVer1 = 0
 // const [previousVer1, setPreviousVer1] = useState(null);
  const token = localStorage.getItem("accessToken");
  const uid = localStorage.getItem("userId");
  useEffect(() => {
    const socket = io('http://tractorserver.myddns.me:8000', {
      extraHeaders: {
        // tractorid: '64e2241bf3ea921e3f7855bb',
        token: token,
      },
    });

    socket.on(`${tractorId}`, (log) => {
     // console.log(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + ","+count);
      const parseData = JSON.parse(log.logs);
      
      //
    
        console.log(parseData)

        setData(parseData);
  
    });

    return () => {
      socket.off(`${tractorId}`);
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#040D12" }}>
      <Layoutgrid data={data} />
    </div>
  );
};

export default Chart;
