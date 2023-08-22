import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Profile = () => {
  const [data, setData] = useState([]);
  const [xAxisDomain, setXAxisDomain] = useState([0, 10]); // Giới hạn hiển thị cho trục X

  useEffect(() => {
    let interval;
    let dataCounter = 0;

    const addDataPoint = () => {
      const newDataPoint = {
        time: new Date().toLocaleTimeString(),
        value: Math.random() * 100, // Generate a random value for demonstration
      };

      setData(prevData => {
        const newData = [...prevData, newDataPoint];
        dataCounter++;

        if (dataCounter > 10) {
          newData.shift();
        }

        setXAxisDomain(prevDomain => [prevDomain[0] + 1, prevDomain[1] + 1]); // Di chuyển giới hạn trục X về phía sau
        return newData;
      });
    };

    // Simulate live data updates
    interval = setInterval(addDataPoint, 1000); // Update data every 1 second

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div>
      <h2>Live Chart Example</h2>
      <LineChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" domain={xAxisDomain} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default Profile;
