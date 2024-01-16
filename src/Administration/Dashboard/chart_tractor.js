import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import Layoutgrid from "../../Account/LiveData/Layout";
const Chart = (props) => {
  const { tractorId } = props.match.params;
  const [data, setData] = useState(null);
  let previousVer1 = 0
 // const [previousVer1, setPreviousVer1] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const socket = io('http://tractorserver.myddns.me:8000', {
      extraHeaders: {
        // tractorid: '64e2241bf3ea921e3f7855bb',
        token: token,
      },
    });

    socket.on('64d9cdfac48bca2dd296ad1d-64f94f8423ada2e16c8be820', (log) => {
     // console.log(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + ","+count);
      const parseData = JSON.parse(log.logs);
      
      //console.log(count)
      if (parseData.ver && parseData.ver[1] !== previousVer1) {
        previousVer1=parseData.ver[1]


        setData(parseData);
        //setPreviousVer1(parseData.ver[1]);
      }
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
