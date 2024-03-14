import React, {useState, useEffect} from "react"
import io from 'socket.io-client';
import {
    YAxis,
    XAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area, AreaChart
  } from 'recharts';
const DualYAxChart = ({id})=>{
    const token = localStorage.getItem("accessToken");
    const [data, setData] = useState([])
    useEffect(() => {
        const socket = io('http://tractorserver.myddns.me:3001', {
          extraHeaders: {
            // tractorid: '64e2241bf3ea921e3f7855bb',
            token: token,
          },
        });
       // console.log(`${id}`)
        socket.on(`${id}`, (log) => {
         // console.log(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + ","+count);
          const parseData = JSON.parse(log.logs);
          
          //
        
            //console.log(parseData)
           
            setData((prevData)=>limitData(prevData,parseData));
      
        });
    
        return () => {
          socket.off(`${id}`);
        };
      }, []);
    
    return (
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart width={730} height={250} data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis domain={[-20,20]} />
          <Tooltip />
          <Area isAnimationActive={false} type="monotone" dataKey="Độ nghiêng dàn xới mong muốn" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" strokeWidth={4}/>
          <Area  isAnimationActive={false} type="monotone" dataKey="Độ nghiêng dàn xới thực tế" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" strokeWidth={4}/>
          <Legend />
        </AreaChart>


      </ResponsiveContainer>
    )
}
function  limitData(currentData, newData) {
    if (currentData.length >= 100) {
      currentData.shift(); 
    }

    if (newData.ctr_fed && newData.ctr_fed.length >= 10) {
      const time = new Date(
        newData.time[2],
        newData.time[1],
        newData.time[0],
        newData.time[3],
        newData.time[4],
        Math.floor(newData.time[5]),
        (newData.time[5] - Math.floor(newData.time[5])) * 1000
      );

      return [
        ...currentData,
        {
          date: time.toLocaleString(),
          'Độ nghiêng dàn xới mong muốn': newData.ctr_fed[12],
          'Độ nghiêng dàn xới thực tế': newData.ctr_fed[13],
        },
      ];
    } else {
      return currentData;
    }
  }
export default DualYAxChart