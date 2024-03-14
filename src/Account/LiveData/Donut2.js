import React, {useState, useEffect} from "react"
import io from 'socket.io-client';
import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer } from 'recharts'; 

const Donut2 = ({id})=>{
    const token = localStorage.getItem("accessToken");
    const [data, setData] = useState()
    const [data1, setData1] = useState([])
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
      useEffect(()=>{
        if (data && data.sum && data.sum.length >= 2) {
            const sum = data.sum;
            const total = sum[0] + sum[1];
            const percentageA = Math.floor((sum[0] / total) * 100);
            const percentageB = 100 - percentageA;
            setData1([
                { name: 'Nhiên liệu còn lại', value: percentageB },
          { name: 'Nhiên liệu đã dùng', value: percentageA },
              ])
             
          }
      },[data])
    return (
        <ResponsiveContainer >
        <PieChart >
          <Pie
            data={data1}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            fill="#8884d8"
            isAnimationActive={false}
            startAngle={90} // Bắt đầu từ vị trí 90 độ
            endAngle={450} // Kết thúc tại vị trí 450 độ (90 + 360)
          >
            {data1.map(( index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? '#FF5733' : '#34A853'} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    )
}

export default Donut2