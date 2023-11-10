import React, {useState, useEffect} from "react";
import io from 'socket.io-client';
import Layoutgrid from "../../Account/LiveData/Layout";

const Chart = (props)=>{
    const { tractorId } = props.match.params;
    const [data,setData] = useState(null)
    const token = localStorage.getItem("accessToken")
    
      // Gọi hàm lắng nghe sự kiện từ socket
      useEffect(()=>{
        const socket = io('http://tractorserver.myddns.me:8000',  {
            extraHeaders: {
             // tractorid: '64e2241bf3ea921e3f7855bb',
              token: token,
            }
          });
          socket.on(`${tractorId}`, (log) => {
            // Cập nhật dữ liệu từ socket vào Redux 
           // console.log(log)
          //
         //   const payload = JSON.parse(data.logs);
          //  console.log(payload)
           // updateSocketData(payload);
           const parseData = JSON.parse(log.logs)
           //console.log(parseData)
           setData(parseData)
           return () => {
            // Hủy lắng nghe khi component bị unmount
            //console.log('aaaaaaaa')
            socket.off(`${tractorId}`);
          };
          });
      },[tractorId])
     
     
   return(
    <div style={{backgroundColor:"#040D12"}}> <Layoutgrid data={data}/></div>
   
   )
}
export default Chart