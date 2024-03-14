import React, {useState, useEffect} from "react"
import io from 'socket.io-client';
import Sensor from "./Sensor";
const Sensor1 = ({id})=>{
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
           
            setData(parseData);
      
        });
    
        return () => {
          socket.off(`${id}`);
        };
      }, []);

    return (
        < Sensor data= {data} />
    )
}

export default Sensor1